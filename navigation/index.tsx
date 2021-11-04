import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ColorSchemeName } from "react-native";

import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import NavigationStack from "./NavigationStack";
import ProductListing from "../screens/ProductListing";
import ProductView from "../screens/ProductView";
import ProductPage from "../screens/ProductPage";
import SubCategoryScreen from "../screens/SubCategoryScreen";
import Cart from "../screens/Cart";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../screens/DrawerContent";
import SearchCategory from "../screens/SearchCategory";
import AddAddress from "../screens/AddAddress";
import ShippingAddress from "../screens/ShippingAddress";
import ShippingMethod from "../screens/ShippingMethod";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "../screens/SignIn";
import HomePage from "../screens/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { getGuestCartId } from "../store/slices/cartSlice";
import MyOrders from "../screens/MyOrders";
import {
  getCustomerCartId,
  setCustomerCartId,
  setGuestCartId,
  setToken,
} from "../store/slices/loginSlice";
import SignUp from "../screens/SignUp";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const dispatch = useDispatch({});

  const newCustomerCartId = async () => {
    const resultAction = await dispatch(getCustomerCartId());
    if (getCustomerCartId.fulfilled.match(resultAction))
      dispatch(setCustomerCartId(resultAction?.payload?.data));
  };
  useEffect(() => {
    const getGuestCart = async () => {
      let token = null;
      let cartId = null;
      let guestCartId = null;

      try {
        token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
      } catch (err) {
        token = null;
      }
      try {
        guestCartId = await AsyncStorage.getItem("GUEST_CART_ID");
      } catch (err) {
        guestCartId = null;
      }
      try {
        cartId = await AsyncStorage.getItem("CUSTOMER_CART_ID");
      } catch (err) {
        cartId = null;
      }
      if (token) {
        //logged in user
        dispatch(setToken(token));
        newCustomerCartId();
        dispatch(setGuestCartId(null));
      } else {
        //guest user -create new guest token
        if (guestCartId) {
          dispatch(setGuestCartId(guestCartId));
        } else {
          const resultAction = await dispatch(getGuestCartId());
          if (getGuestCartId.fulfilled.match(resultAction)) {
            if (resultAction?.payload?.data)
              dispatch(setGuestCartId(resultAction?.payload?.data));
          } else {
            dispatch(setGuestCartId(null));
          }
        }
        dispatch(setToken(null));
        dispatch(setCustomerCartId(null));
      }
    };
    getGuestCart();
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeDrawer" component={RootNavigator} />
        <Stack.Screen name="Login" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
