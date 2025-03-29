import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint
const API_URL = "http://localhost:8000/api/rooms/";

// Async thunk for fetching rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// Room slice
const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default roomSlice.reducer;
