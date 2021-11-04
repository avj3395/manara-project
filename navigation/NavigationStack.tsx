import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllScreens from "../screens/AllScreens";
import Landing from "../screens/Landing";
import HomePage from "../screens/HomePage";
import ProductPage from "../screens/ProductPage";
import ProductListing from "../screens/ProductListing";
import SearchCategory from "../screens/SearchCategory";
import ProductView from "../screens/ProductView";
import CartInsideCheckout from "../screens/CartInsideCheckout";
import Cart from "../screens/Cart";
import ShippingAddress from "../screens/ShippingAddress";
import ShippingMethod from "../screens/ShippingMethod";
import Checkout from "../screens/Checkout";

const Stack = createStackNavigator();

function NavigationStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="All Screens" component={AllScreens} />
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Home Page" component={HomePage} />
      <Stack.Screen name="Product Page" component={ProductPage} />
      <Stack.Screen name="Product Listing" component={ProductListing} />
      <Stack.Screen name="Search Category" component={SearchCategory} />
      <Stack.Screen name="Product View" component={ProductView} />
      <Stack.Screen
        name="Cart Inside Checkout"
        component={CartInsideCheckout}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Shipping Address" component={ShippingAddress} />
      <Stack.Screen name="Shipping Method" component={ShippingMethod} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}

export default NavigationStack;
