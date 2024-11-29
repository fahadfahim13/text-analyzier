export const useParams = jest.fn(() => ({ textId: '123' }));
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
}));