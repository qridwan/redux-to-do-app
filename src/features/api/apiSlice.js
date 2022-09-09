import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rid1todo.herokuapp.com",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ status, color } = {}, other) => {
        console.log("arg: ", other);
        let url;
        if ((!status || status === "all") && !color) {
          url = "/todos";
        } else if ((status || status !== "all") && !color) {
          url = `/todos?completed=${status}`;
        } else if ((!status || status === "all") && color) {
          url = `/todos?color=${color}`;
        } else if ((status || status !== "all") && color) {
          url = `/todos?completed=${status}&color=${color}`;
        }
        console.log({ url });
        return { url: url, method: "GET" };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: {
            text: data,
            completed: false,
            color: "green",
          },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { text: data },
      }),
      invalidatesTags: ["Todos"],
    }),
    toggleStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/todos/${id}`,
          method: "PATCH",
          body: { completed: data },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    changeColor: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/todos/${id}`,
          method: "PATCH",
          body: { color: data },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    clearCompleted: builder.mutation({
      query: (id) => {
        return {
          url: `/todos/${id}`,
          method: "PATCH",
          body: { completed: false },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    completeAllTask: builder.mutation({
      query: (id) => {
        return {
          url: `/todos/${id}`,
          method: "PATCH",
          body: { completed: true },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditVideoMutation,
  useDeleteTodoMutation,
  useToggleStatusMutation,
  useChangeColorMutation,
  useClearCompletedMutation,
  useCompleteAllTaskMutation,
} = apiSlice;
