import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import NotFoundScreen from "../screens/NotFoundScreen";
import MyAccountBottomTab from "../screens/MyAccountBottomTab";
import Cart from "../screens/Cart";
import MyOrders from "../screens/MyOrders";

const Stack = createStackNavigator<RootStackParamList>();
function BottomAccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyProfile" component={MyAccountBottomTab} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="MyOrder" component={MyOrders} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

export default BottomAccountStack;
