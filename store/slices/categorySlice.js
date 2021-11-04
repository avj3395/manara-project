import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../apis/apis";

const initialState = {
  category: [],
  subCategory: [],
  status: "idle",
  error: null,
  message: null,
};

export const fetchCategoryList = createAsyncThunk(
  "category/fetchCategoryList",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.get("/categories", { params });
      //console.log("&&&& data", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubCategoryList = createAsyncThunk(
  "category/fetchSubCategoryList",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.get("/categories", { params });
      //console.log("&&&& data", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryLink = createAsyncThunk(
  "category/fetchCategoryLink",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();

    try {
      const response = await api.get(
        "/categories/" + params?.category_id + "/products",
        { params }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategoryList.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
    },
    [fetchCategoryList.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.category = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [fetchCategoryList.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
    [fetchSubCategoryList.pending]: (state, action) => {
      state.status = "loading";
      state.message = null;
      state.subCategory = [];
    },
    [fetchSubCategoryList.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.subCategory = action?.payload?.data;
      state.message = action?.payload?.message;
    },
    [fetchSubCategoryList.rejected]: (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    },
  },
});

export default categorySlice.reducer;
export const selectAllCategory = (state) => state.category;
