import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Cart from "../screens/Cart";
import ProductPage from "../screens/ProductPage";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/slices/cartSlice";
import BottomTabStack from "./BottomTabStack";
import { setCustomerCartId, setToken } from "../store/slices/loginSlice";
import CartBottomTabStack from "./CartBottomTabStack";
import BottomSearchStack from "./BottomSearchStack";
import ReviewsList from "../components/ReviewsList/ReviewsList";
import SearchCategory from "../screens/SearchCategory";
import EditProfile from "../screens/EditProfile";
import PaymentGateWay from "../screens/PaymentGateWay";
import MyAccountBottomTab from "../screens/MyAccountBottomTab";
import BottomAccountStack from "./BottomAccountStack";

const BottomTab = createBottomTabNavigator();
const Container = styled(View)`
  position: absolute;
  background-color: #d9534f;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: -5px;
  left: 15px;
`;

const Count = styled(Text)`
  color: white;
  font-weight: bold;
`;
const BorderThin = styled(View)`
  height: 2px;
  background-color: ${(props) => props.color};
`;
export default function BottomTabNavigator() {
  const dispatch = useDispatch({});
  const navigation = useNavigation();
  const { cart } = useSelector((state) => state.cart);
  const { token, customerCartId, guestCartId } = useSelector(
    (state) => state.login
  );
  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchCart());
      if (fetchCart.rejected.match(resultAction)) {
        {
          if (token !== null && customerCartId !== null)
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          dispatch(setToken(null));
          dispatch(setCustomerCartId(null));
        }
      }
    };
    fetchData();
  }, []);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#0a874c",
        style: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={BottomTabStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Cart"
        component={CartBottomTabStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              {cart.length > 0 && (
                <Container>
                  <Count>{cart?.length}</Count>
                </Container>
              )}
              <AntDesign name="shoppingcart" size={24} color={color} />
              {/* <MaterialCommunityIcons name="cart" size={24} color={color} /> */}
              {/* <BorderThin color={color} /> */}
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name="Category"
        component={BottomSearchStack}
        options={{
          tabBarIcon: ({ color }) => (
            // <MaterialIcons name="search" size={24} color={color} />

            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Account"
        component={BottomAccountStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={30} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
