import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProductListing from "../screens/ProductListing";
import ProductView from "../screens/ProductView";
import ProductPage from "../screens/ProductPage";
import SubCategoryScreen from "../screens/SubCategoryScreen";
import ShippingAddress from "../screens/ShippingAddress";
import ShippingMethod from "../screens/ShippingMethod";
import HomePage from "../screens/HomePage";
import CartInsideCheckout from "../screens/CartInsideCheckout";
import Checkout from "../screens/Checkout";
import PaymentMethod from "../screens/PaymentMethod";
import OrderConfirmed from "../screens/OrderConfirmed";
import OrderNotConfirmed from "../screens/OrderNotConfirmed";
import SignUp from "../screens/SignUp";
import MyOrders from "../screens/MyOrders";
import MyAccount from "../screens/MyAccount";
import EditProfile from "../screens/EditProfile";
import EditAddress from "../screens/EditAddress";
import SearchPage from "../screens/SearchPage";

const Stack = createStackNavigator<RootStackParamList>();
function BottomTabStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Tabs" component={BottomTabNavigator} /> */}
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="ProductListing" component={ProductListing} />
      <Stack.Screen name="ProductView" component={ProductView} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
      <Stack.Screen name="ShippingMethod" component={ShippingMethod} />
      <Stack.Screen name="CartInsideCheckout" component={CartInsideCheckout} />
      <Stack.Screen name="CheckoutPage" component={Checkout} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
      <Stack.Screen name="OrderNotConfirmed" component={OrderNotConfirmed} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MyOrder" component={MyOrders} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

export default BottomTabStack;
