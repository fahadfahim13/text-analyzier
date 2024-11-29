import '@testing-library/jest-dom';

// Mock next-auth
jest.mock('next-auth/react', () => {
  return {
    useSession: jest.fn(() => ({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } }
    })),
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => {
  return {
    useParams: jest.fn(() => ({ textId: '123' })),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    })),
  };
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn(),
  },
  writable: true,
});