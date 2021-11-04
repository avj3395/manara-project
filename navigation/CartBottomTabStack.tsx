import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import NotFoundScreen from "../screens/NotFoundScreen";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import ProductView from "../screens/ProductView";
import ShippingAddress from "../screens/ShippingAddress";
import ShippingMethod from "../screens/ShippingMethod";
import PaymentMethod from "../screens/PaymentMethod";
import OrderConfirmed from "../screens/OrderConfirmed";
import OrderNotConfirmed from "../screens/OrderNotConfirmed";
import PaymentGateWay from "../screens/PaymentGateWay";

const Stack = createStackNavigator<RootStackParamList>();
function CartBottomTabStack() {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="CheckoutPage" component={Checkout} />
      <Stack.Screen name="ProductView" component={ProductView} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
      <Stack.Screen name="ShippingMethod" component={ShippingMethod} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
      <Stack.Screen name="OrderNotConfirmed" component={OrderNotConfirmed} />
      <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

export default CartBottomTabStack;
