import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Board, Column, Task } from '../types';

export const boardsApi = createApi({
    reducerPath: 'boardsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }), //json server (npm run server)
    tagTypes: ['Boards', 'Columns'],
    endpoints: (builder) => ({
        getBoard: builder.query<Board, string>({
            query: (boardId) => `boards/${boardId}/`,
            providesTags: ['Boards']
        }),
        addBoard: builder.mutation<Board, Board>({
            query: (board) => ({
                url: 'boards/',
                method: 'POST',
                body: board
            }),
            invalidatesTags: ['Boards']
        }),
        getColumnsByBoardId: builder.query<Column[], string>({
            query: (boardid) => `boards/${boardid}/columns/`,
            providesTags: ['Boards']
        }),
        getTaskListByColumnId: builder.query<Task[], { boardId: string, columnId: string }>({
            query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}/tickets`,
            providesTags: ['Boards']
        }),
        addColumn: builder.mutation<Column, { boardId: string, column: Column }>({
            query: ({ boardId, column }) => ({
                url: `boards/${boardId}/columns/`,
                method: 'POST',
                body: column
            }),
            invalidatesTags: ['Boards']
        }),

    }),
})

export const { useGetBoardQuery, useAddBoardMutation, useGetColumnsByBoardIdQuery, useGetTaskListByColumnIdQuery, useAddColumnMutation } = boardsApi;
