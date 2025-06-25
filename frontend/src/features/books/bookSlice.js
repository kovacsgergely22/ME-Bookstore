import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
    books: [],
    book: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create a new book
export const createBook = createAsyncThunk(
    "books/create",
    async (bookData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await bookService.createBook(bookData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user books
export const getBooks = createAsyncThunk(
    "books/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await bookService.getBooks(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        // reset: (state) => initialState,
        reset: (state) => {
            state.books = [];
            state.book = {};
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBook.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createBook.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.books = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;