import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import api from "../../apis/apis";
import { getAxiosInstance } from "../../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as _ from "lodash";

//import { cartId } from "../../apis/apis";

const initialState = {
  cart: [],
  addCart: [],
  cartStatus: "idle",
  cartResStatus: "",
  cartDelete: null,
  status: "",
  error: null,
  message: null,
};

export const editCart = createAsyncThunk(
  "cart/editCart",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
      const cartId = await AsyncStorage.getItem("GUEST_CART_ID");
      let URL = "";
      if (token) {
        URL = "/carts/mine/items/";
      } else {
        URL = "/guest-carts/" + cartId + "/items/";
      }
      const response = await api.put(URL + params?.itemId, params?.data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
      const cartId = await AsyncStorage.getItem("GUEST_CART_ID");
      let URL = "";
      if (token) {
        URL = "/carts/mine/items/";
      } else {
        URL = "/guest-carts/" + cartId + "/items/";
      }
      const response = await api.delete(URL + params?.itemId, { params });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    // console.log("params", params);
    try {
      const token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
      const cartId = await AsyncStorage.getItem("GUEST_CART_ID");

      let URL = "";
      if (token) {
        URL = "/carts/mine/items";
      } else {
        // console.log("cart", cartId);
        URL = "/guest-carts/" + cartId + "/items";
      }
      const response = await api.post(URL, params?.data);
      // console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (params, { dispatch, rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
      const cartId = await AsyncStorage.getItem("GUEST_CART_ID");
      let URL = "";
      if (token) {
        URL = "/carts/mine/items";
      } else {
        URL = "/guest-carts/" + cartId + "/items";
      }
      const response = await api.get(URL, {
        params,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGuestCartId = createAsyncThunk(
  "cart/getGuestCartId",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.post("/guest-carts", {
        params,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const putGuestCartToCustomerCart = createAsyncThunk(
  "cart/putGuestCartToCustomerCart",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const cartId = await AsyncStorage.getItem("GUEST_CART_ID");
      const response = await api.put("/guest-carts/" + cartId, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const storeGuestCartId = async (cartId) => {
  try {
    await AsyncStorage.removeItem("GUEST_CART_ID");
    await AsyncStorage.setItem("GUEST_CART_ID", cartId);
  } catch (error) {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartEmpty: (state, action) => {
      state.cart = [];
    },
  },

  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.cartStatus = "loading";
      state.message = null;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.cartStatus = "succeeded";
      state.addCart = action?.payload?.data;
      state.cartResStatus = action?.payload?.status;
      state.message = action?.payload?.message;
    },
    [addToCart.rejected]: (state, action) => {
      state.cartStatus = "failed";
      state.message = action?.payload?.message;
    },
    [fetchCart.pending]: (state, action) => {
      state.cartStatus = "loading";
      state.message = null;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cartStatus = "succeeded";
      //state.cartResStatus = action?.payload?.status;
      state.cart = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [fetchCart.rejected]: (state, action) => {
      state.cartStatus = "failed";
      state.cart = [];
      state.message = action?.payload?.message;
    },
    [deleteCart.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      // state.cart = [];
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.cartDelete = action?.payload?.data;
      state.message = action?.payload?.message;
      state.cart = _.remove(state.cart, function (item) {
        return item?.item_id != action?.meta?.arg?.itemId;
      });
    },
    [deleteCart.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [editCart.pending]: (state, action) => {
      state.cartStatus = "loading";
      state.message = null;
    },
    [editCart.fulfilled]: (state, action) => {
      state.cartStatus = "succeeded";
      state.cartResStatus = action?.payload?.status;
      state.message = action?.payload?.message;
    },
    [editCart.rejected]: (state, action) => {
      state.cartStatus = "failed";
      state.message = action?.payload?.message;
    },
    [getGuestCartId.pending]: (state, action) => {
      state.cartStatus = "loading";
      state.message = null;
    },
    [getGuestCartId.fulfilled]: (state, action) => {
      state.cartStatus = "succeeded";
      state.message = action?.payload?.message;
      storeGuestCartId(action?.payload?.data);
    },
    [getGuestCartId.rejected]: (state, action) => {
      state.cartStatus = "failed";
      state.message = action?.payload?.message;
    },
    [putGuestCartToCustomerCart.pending]: (state, action) => {
      state.cartStatus = "loading";
      state.message = null;
    },
    [putGuestCartToCustomerCart.fulfilled]: (state, action) => {
      state.cartStatus = "succeeded";
      state.message = action?.payload?.message;
    },
    [putGuestCartToCustomerCart.rejected]: (state, action) => {
      state.cartStatus = "failed";
      state.message = action?.payload?.message;
    },
  },
});
export const { setCartEmpty } = cartSlice.actions;
export default cartSlice.reducer;
export const selectAllCart = (state) => state.cart;
