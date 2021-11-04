import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: null,
  status: "idle",
  error: null,
  message: null,
  guestCartId: null,
  customerCartId: null,
};

export const customerLogin = createAsyncThunk(
  "customer/login",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post("/integration/customer/token", params);
      // console.log("token", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const storeLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    //console.log("tocken not received");
  }
};

export const getCustomerCartId = createAsyncThunk(
  "customer/getCustomerCartId",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post("/carts/mine");
      // console.log("resp===", response);
      const cart_id = response?.data.toString();
      await AsyncStorage.setItem("CUSTOMER_CART_ID", cart_id);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setGuestCartId: (state, action) => {
      state.guestCartId = action?.payload;
      storeLocalStorage("GUEST_CART_ID", action?.payload);
    },
    setToken: (state, action) => {
      state.token = action?.payload;
      storeLocalStorage("CUSTOMER_TOKEN", action?.payload);
    },
    setCustomerCartId: (state, action) => {
      state.customerCartId = action?.payload;
      storeLocalStorage("CUSTOMER_CART_ID", JSON.stringify(action?.payload));
    },
  },
  extraReducers: {
    [customerLogin.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [customerLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action?.payload?.data;
      // console.log("@@@token", action);
      state.message = action?.payload?.message;
      storeLocalStorage("CUSTOMER_TOKEN", state.token);

      // console.log(state.token, "@@@@@");
    },
    [customerLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [getCustomerCartId.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [getCustomerCartId.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.message = action?.payload?.message;
      state.customerCartId = action?.payload?.data;

      storeLocalStorage(
        "CUSTOMER_CART_ID",
        JSON.stringify(action?.payload?.data)
      );
    },
    [getCustomerCartId.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});
export const { setGuestCartId, setToken, setCustomerCartId } =
  loginSlice.actions;

export default loginSlice.reducer;
