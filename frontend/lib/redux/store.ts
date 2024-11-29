import { configureStore } from "@reduxjs/toolkit";
import { aiResumeApi } from "./APIs/resume";
import ResumeReducer from "./Features/Resume/Slice";
import { userApi } from "./APIs/user";

export const store = configureStore({
  reducer: {
    resume: ResumeReducer,
    [aiResumeApi.reducerPath]: aiResumeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aiResumeApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
