import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Quiz } from "../../../modals/modals";

// Define the shape of the state
export interface QuizState {
    quizzes: Quiz[];
    loading: boolean;
    error: string | null;
}

// Initial state
export const initialState: QuizState = {
    quizzes: [],
    loading: false,
    error: null,
};

// Fetch all quizzes
export const fetchQuizzes = createAsyncThunk(
    "quiz/fetchQuizzes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/exams");
            return response.data.data;
        } catch (error: unknown) {
            return rejectWithValue("Error fetching quizzes.");
        }
    }
);

// Add a new quiz
export const addQuiz = createAsyncThunk(
    "quiz/addQuiz",
    async (quiz: Omit<Quiz, "_id" | "createdAt">, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/exam", quiz);
            toast.success("Quiz Added Successfully...");
            return response.data.data;
        } catch (error: unknown) {
            return rejectWithValue("Error adding quiz.");
        }
    }
);

// Update an existing quiz
export const updateQuiz = createAsyncThunk(
    "quiz/updateQuiz",
    async (
        {
            id,
            updatedQuiz,
        }: { id: string; updatedQuiz: Omit<Quiz, "_id" | "createdAt"> },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/exam/${id}`,
                updatedQuiz
            );
            toast.info("Quiz updated successfully...");
            return response.data.data;
        } catch (error: unknown) {
            return rejectWithValue("Error updating quiz.");
        }
    }
);

// Delete a quiz
export const deleteQuiz = createAsyncThunk(
    "quiz/deleteQuiz",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:5000/api/exam/${id}`);
            toast.error("Quiz deleted successfully...");
            return id;
        } catch (error: unknown) {
            return rejectWithValue("Error deleting quiz.");
        }
    }
);

// Slice
const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch quizzes
            .addCase(fetchQuizzes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchQuizzes.fulfilled,
                (state, action: PayloadAction<Quiz[]>) => {
                    state.quizzes = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add a quiz
            .addCase(addQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.quizzes.push(action.payload);
            })
            // Update a quiz
            .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.quizzes = state.quizzes.map((quiz) =>
                    quiz._id === action.payload._id ? action.payload : quiz
                );
            })
            // Delete a quiz
            .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<string>) => {
                state.quizzes = state.quizzes.filter(
                    (quiz) => quiz._id !== action.payload
                );
            })
            // Handle rejected actions for all async thunks
            .addMatcher(
                (action) => action.type.endsWith("rejected"),
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                }
            );
    },
});

export default quizSlice.reducer;
