export const useSession = jest.fn(() => ({
    status: 'authenticated',
    data: { user: { email: 'test@example.com' } }
  }));