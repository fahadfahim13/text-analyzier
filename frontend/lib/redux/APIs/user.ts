import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUserDto } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (input: CreateUserDto) => {
        return {
          url: `/users`,
          method: "POST",
          body: input,
        };
      },
    }),
    getUser: builder.mutation({
      query: (email: string) => {
        return {
          url: `/users/email`,
          method: "POST",
          body: {
            email: email,
          },
        };
      },
    }),
  }),
});

export const { useCreateUserMutation, useGetUserMutation } = userApi;
