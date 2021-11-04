import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";
import customerSlice from "./customerSlice";
import loginSlice from "./loginSlice";
import CheckoutSlice from "./CheckoutSlice";
import ordersSlice from "./ordersSlice";
import reviewSlice from "./reviewSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  category: categorySlice,
  cart: cartSlice,
  customer: customerSlice,
  login: loginSlice,
  checkout: CheckoutSlice,
  orders: ordersSlice,
  reviews: reviewSlice,
});

export default rootReducer;
