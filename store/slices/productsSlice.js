import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../apis/apis";

const initialState = {
  products: [],
  productItem: [],
  searchProducts: [],
  status: "idle",
  responseStatus: "",
  error: null,
  message: null,
  filterValue: "",
  tempFilter: "",
};

export const fetchProductsList = createAsyncThunk(
  "products/fetchProductsList",
  async (params, { rejectWithValue }) => {
    // console.log("===params", params);
    const api = await getAxiosInstance();
    try {
      const response = await api.get("/products", { params });

      return response;
    } catch (error) {
      // console.log("==errorr", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "products/getSearchProducts",
  async (params, { rejectWithValue }) => {
    // console.log("===params", params);
    const api = await getAxiosInstance();
    try {
      const response = await api.get("/products", { params });
      // console.log("===response", response);
      return response;
    } catch (error) {
      // console.log("==errorr", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchProductItem = createAsyncThunk(
  "products/fetchProductItem",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get("/products/" + params?.product_sku, {
        params,
      });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductGallery = createAsyncThunk(
  "products/fetchProductGallery",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get(
        "/products/" + params?.product_sku + "/media",
        {
          params,
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProductsList.pending]: (state, action) => {
      // console.log("===actionpending", action);
      state.status = "loading";
      state.message = null;
      // state.products = [];
      let filterValue =
        action?.meta?.arg["searchCriteria[filterGroups][0][filters][0][value]"];

      if (filterValue && filterValue != state.tempFilter) {
        state.products = [];
      }
    },
    [fetchProductsList.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.responseStatus = action?.payload?.status;
      state.tempFilter =
        action?.payload?.data?.search_criteria?.filter_groups[0]?.filters[0].value;
      if (action?.payload?.data?.search_criteria?.current_page == 1)
        state.products = action?.payload?.data?.items;
      else state.products = state.products.concat(action?.payload?.data?.items);
      state.message = action?.payload?.message;
    },
    [fetchProductsList.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [fetchProductItem.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      state.productItem = [];
    },
    [fetchProductItem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.productItem = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [fetchProductItem.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [getSearchProducts.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      state.searchProducts = [];
    },
    [getSearchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.searchProducts = action?.payload?.data?.items;
      state.message = action?.payload?.message;
    },
    [getSearchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products;
