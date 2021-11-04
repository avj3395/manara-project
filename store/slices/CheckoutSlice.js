import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance, getPaymentAxiosInstance } from "../../apis/apis";
import { cartId } from "../../apis/apis";

const initialState = {
  address: [],
  checkout: [],
  shippingMethod: [],
  paymentMethod: [],
  orderId: "",
  status: "",
  error: null,
  message: null,
  paymentURL: "",
};

export const fetchBillingAddress = createAsyncThunk(
  "checkout/fetchShippingAddress",
  async (params, { rejectWithValue }) => {
    //console.log(" paramas", params);
    const api = await getAxiosInstance();

    try {
      const response = await api.get(
        "/guest-carts/" + cartId + "/billing-address",
        {
          params,
        }
      );
      //console.log("%%%%", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBillingAddress = createAsyncThunk(
  "checkout/addShippingAddress",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    // console.log(" paramas", params);
    try {
      const response = await api.post(
        "/guest-carts/" + cartId + "/billing-address",

        params?.data
      );
      // console.log("%%%%", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchShippingMethod = createAsyncThunk(
  "checkout/fetchShippingMethod",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    //console.log(" paramas", params);
    try {
      const response = await api.post(
        "/carts/mine/estimate-shipping-methods",
        params?.data
      );
      //console.log("%%%%", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPaymentMethod = createAsyncThunk(
  "checkout/fetchPaymentMethod",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    // console.log(" paramas", params);
    try {
      const response = await api.post(
        "/carts/mine/shipping-information",
        params?.data
      );
      //console.log("%%%%", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    // console.log(" paramas", params);
    try {
      const response = await api.post(
        "/carts/mine/payment-information",
        params?.data
      );
      // console.log("%%%%", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentOrder = createAsyncThunk(
  "checkout/paymentOrder",
  async (params, { rejectWithValue }) => {
    const api = await getPaymentAxiosInstance();

    // console.log(" paramas", params);
    try {
      const response = await api.post(
        `/paytabs/requestdata?orderId=${params?.orderId}`
      );
      // console.log("%%%%", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBillingAddress.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchBillingAddress.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.address = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [fetchBillingAddress.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [addBillingAddress.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [addBillingAddress.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.address = action?.payload?.data;
      state.message = action?.payload?.message;
      // console.log("%%%%", action);
    },
    [addBillingAddress.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },

    [fetchShippingMethod.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchShippingMethod.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.shippingMethod = action?.payload?.data;
      state.message = action?.payload?.message;
      //console.log("%%%%", action);
    },
    [fetchShippingMethod.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [fetchPaymentMethod.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchPaymentMethod.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.paymentMethod = action?.payload?.data;
      state.message = action?.payload?.message;
      // console.log("%%%%", action);
    },
    [fetchPaymentMethod.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [placeOrder.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      state.orderId = "";
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orderId = action?.payload?.data;
      state.message = action?.payload?.message;
      // console.log("%%%%", action);
    },
    [placeOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [paymentOrder.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      state.paymentURL = "";
    },
    [paymentOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.paymentURL = action?.payload?.data;
      state.message = action?.payload?.message;
      // console.log("%%%%", action);
    },
    [paymentOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});

export default checkoutSlice.reducer;
export const selectAllCart = (state) => state.checkout;
