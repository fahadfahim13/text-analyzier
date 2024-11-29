import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiResumeApi = createApi({
  reducerPath: "aiResumeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    generateText: builder.mutation({
      query: (input: {
        title: string;
        content: string;
        userEmail: string;
      }) => {
        return {
          url: `/texts/`,
          method: "POST",
          body: input,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllTexts: builder.mutation({
      query: (userEmail: string) => {
        return {
          url: `/texts?userEmail=${userEmail}`,
          method: "GET",
        };
      },
    }),
    getDetailsText: builder.mutation({
      query: (body: { id: string; userEmail: string }) => {
        return {
          url: `/texts/get-details`,
          method: "POST",
          body: body,
        };
      },
    }),
    generateDescription: builder.mutation({
      query: (body: { userInput: string; userEmail: string }) => {
        return {
          url: `/ai-resumes/generate-desc`,
          method: "POST",
          body: body,
        };
      },
    }),
    updateText: builder.mutation({
      query: (input: { id: string; userEmail: string; title: string; content: string }) => {
        return {
          url: `/texts`,
          method: "PUT",
          body: input,
        };
      },
    }),
    deleteText: builder.mutation({
      query: (body: { id: string; userEmail: string }) => {
        return {
          url: `/texts`,
          method: "DELETE",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGenerateTextMutation,
  useGetAllTextsMutation,
  useGetDetailsTextMutation,
  useUpdateTextMutation,
  useDeleteTextMutation,
  useGenerateDescriptionMutation,
} = aiResumeApi;
