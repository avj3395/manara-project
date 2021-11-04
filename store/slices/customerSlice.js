import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../apis/apis";

const initialState = {
  customer: [],
  billingAddress: [],
  shippingAddress: [],
  status: "idle",
  error: null,
  message: null,
};

export const addNewCustomer = createAsyncThunk(
  "customer/addNewCustomer",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.post("/customers", params);
      // console.log("add customer ", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomer = createAsyncThunk(
  "customer/fetchCustomer",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.get("/customers/me", { params });
      // console.log("111111111111", response);
      return response;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    // console.log("update params", params?.data);
    try {
      const response = await api.put("/customers/me", params?.data);
      // console.log("1 update", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomerBillingAddress = createAsyncThunk(
  "customer/fetchCustomerBillingAddress",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.get("/customers/me/billingAddress", {
        params,
      });
      // console.log("111111111111", response);
      return response;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomerShippingAddress = createAsyncThunk(
  "customer/fetchCustomerShippingAddress",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.get("/customers/me/shippingAddress", {
        params,
      });
      // console.log("111111111111", response);
      return response;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "customer/updatePassword",
  async (params, { rejectWithValue }) => {
    // console.log("params", params);
    const api = await getAxiosInstance();

    try {
      const response = await api.put("/customers/me/password", params);
      // console.log("111111111111", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: {
    [addNewCustomer.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [addNewCustomer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.customer = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [addNewCustomer.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },

    [fetchCustomer.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchCustomer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.customer = action?.payload?.data;
      state.message = action?.payload?.message;
      //console.log("777777777777", action);
    },
    [fetchCustomer.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [updateCustomer.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.customer = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [updateCustomer.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [fetchCustomerBillingAddress.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchCustomerBillingAddress.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.billingAddress = action?.payload?.data;
      state.message = action?.payload?.message;
      // console.log("777777777777", action);
    },
    [fetchCustomerBillingAddress.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [fetchCustomerShippingAddress.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchCustomerShippingAddress.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.shippingAddress = action?.payload?.data;
      state.message = action?.payload?.message;
      //console.log("777777777777", action);
    },
    [fetchCustomerShippingAddress.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [updatePassword.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.message = action?.payload?.message;
      //console.log("777777777777", action);
    },
    [updatePassword.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});

export default customerSlice.reducer;
