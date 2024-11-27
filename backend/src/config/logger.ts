import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.splat !== undefined ? `${info.splat}` : ''} ${info.error ? `\nStack: ${JSON.stringify(info.error) ?? ''}` : ''}`
  )
);

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join('logs', '%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
});

const logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      format: logFormat,
    }),
    dailyRotateFileTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join('logs', 'exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join('logs', 'rejections.log') })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: logFormat,
  }));
}

export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export const logError = (error: Error, context = '') => {
  logger.error(`${context}: ${error.message}`, { error });
};

export default logger;