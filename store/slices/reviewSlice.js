import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminAxiosInstance } from "../../apis/apis";

const initialState = {
  reviews: "",
  status: "",
  error: null,
  message: null,
};

export const addReviews = createAsyncThunk(
  "reviews/addReviews",
  async (params, { rejectWithValue }) => {
    const api = await getAdminAxiosInstance();

    try {
      const response = await api.post("/reviews", params?.data);
      // console.log("==== response", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async (params, { rejectWithValue }) => {
    const api = await getAdminAxiosInstance();

    try {
      const response = await api.get(
        "/products/" + params?.productId + "/reviews"
      );
      // console.log("==== response", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: {
    [addReviews.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [addReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.message = action?.payload?.message;
      // console.log("==review acion", action);
    },
    [addReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [getProductReviews.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      state.reviews = [];
    },
    [getProductReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reviews = action?.payload?.data;
      state.message = action?.payload?.message;
      // console.log("==review acion", action);
    },
    [getProductReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});

export default reviewSlice.reducer;
