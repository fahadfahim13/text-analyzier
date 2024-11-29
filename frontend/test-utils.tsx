import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { aiResumeApi } from '@/lib/redux/APIs/resume'


// Create mock APIs
const mockAiResumeApi = {
  reducerPath: 'aiResumeApi',
  reducer: (state = {}) => state,
  middleware: () => [],
};

const mockUserApi = {
  reducerPath: 'userApi',
  reducer: (state = {}) => state,
  middleware: () => [],
};

// Create a custom renderer that includes Redux provider
export function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        [aiResumeApi.reducerPath]: aiResumeApi.reducer
      } as any,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(aiResumeApi.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything
export * from '@testing-library/react'
