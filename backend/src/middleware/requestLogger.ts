import morgan from 'morgan';
import { stream } from '../config/logger';

morgan.token('body', (req: any) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const sanitizedBody = { ...req.body };

    if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
    return JSON.stringify(sanitizedBody);
  }
  return '';
});

const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms :body';

export const requestLogger = morgan(morganFormat, { stream });