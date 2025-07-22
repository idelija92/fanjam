const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
};

const axiosMock = {
    create: jest.fn(() => mockAxiosInstance),
    ...mockAxiosInstance
};

export default axiosMock;