import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export interface Announcement {
  _id: string;
  name: string;
  subject: string;
  avatar: string;
  message: string;
}

export interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
};

// Async actions

// Fetch all announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcement/fetchAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/announcements");
      return response.data.data; // Assuming response.data.data contains the announcements
    } catch (error: unknown) {
      return rejectWithValue("Error fetching announcements.");
    }
  }
);

// Add a new announcement
export const addAnnouncement = createAsyncThunk(
  "announcement/addAnnouncement",
  async (announcement: Omit<Announcement, "_id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/announcements",
        announcement
      );
      toast.success("Announcement added successfully...");
      return response.data.data; // Return the newly added announcement
    } catch (error: unknown) {
      return rejectWithValue("Error adding announcement.");
    }
  }
);

// Update an existing announcement
export const updateAnnouncement = createAsyncThunk(
  "announcement/updateAnnouncement",
  async (
    {
      id,
      updatedAnnouncement,
    }: { id: string; updatedAnnouncement: Omit<Announcement, "_id"> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/announcements/${id}`,
        updatedAnnouncement
      );
      toast.info("Announcement updated successfully...");
      return response.data.data; // Return the updated announcement
    } catch (error: unknown) {
      return rejectWithValue("Error updating announcement.");
    }
  }
);

// Delete an announcement
export const deleteAnnouncement = createAsyncThunk(
  "announcement/deleteAnnouncement",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      toast.error("Announcement deleted successfully...");
      return id; // Return the ID of the deleted announcement
    } catch (error: unknown) {
      return rejectWithValue("Error deleting announcement.");
    }
  }
);

// Slice
const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch announcements
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAnnouncements.fulfilled,
        (state, action: PayloadAction<Announcement[]>) => {
          state.announcements = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add an announcement
      .addCase(
        addAnnouncement.fulfilled,
        (state, action: PayloadAction<Announcement>) => {
          state.announcements.push(action.payload);
        }
      )
      // Update an announcement
      .addCase(
        updateAnnouncement.fulfilled,
        (state, action: PayloadAction<Announcement>) => {
          const index = state.announcements.findIndex(
            (a) => a._id === action.payload._id
          );
          if (index !== -1) {
            state.announcements[index] = action.payload;
          }
        }
      )
      // Delete an announcement
      .addCase(
        deleteAnnouncement.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.announcements = state.announcements.filter(
            (a) => a._id !== action.payload
          );
        }
      )
      // Handle rejected actions for all async thunks
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action: PayloadAction<unknown>) => {
          state.error = action.payload as string;
        }
      );
  },
});

export default announcementSlice.reducer;
