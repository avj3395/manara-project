import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminAxiosInstance } from "../../apis/apis";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
  message: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params, { rejectWithValue }) => {
    const api = await getAdminAxiosInstance();
    try {
      const response = await api.get("/orders", { params });
      //console.log("&&&& data", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orders = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});

export default ordersSlice.reducer;
export const selectAllOrders = (state) => state.orders;
