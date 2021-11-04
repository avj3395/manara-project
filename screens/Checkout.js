import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as _ from "lodash";

import {
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";
import CheckoutContent from "../components/CheckoutContent/CheckoutContent";
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit";
import { useFocusEffect } from "@react-navigation/native";
import { fetchCustomer } from "../store/slices/customerSlice";
import {
  fetchCart,
  getGuestCartId,
  setCartEmpty,
} from "../store/slices/cartSlice";
import { placeOrder, paymentOrder } from "../store/slices/CheckoutSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import {
  getCustomerCartId,
  setCustomerCartId,
} from "../store/slices/loginSlice";

const Container = styled(View)`
  flex: 1;
  padding: 50px 0px 0px 0px;
  background-color: #fff;
`;
function Checkout({ route }) {
  const Address = route?.params?.customerAddress;
  const dispatch = useDispatch({});
  const navigation = useNavigation();
  // const { orderId, paymentURL } = useSelector((state) => state.checkout);
  const { customer } = useSelector((state) => state.customer);
  const { status } = useSelector((state) => state.checkout);

  let billAddress = "";
  const [shipAddress, setShipAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(
    route?.params?.shippingMethod ? route?.params?.shippingMethod : "Flat Rate"
  );
  const [paymentMethod, setPaymentMethod] = useState("Debit / Credit Card");
  const [method, setMethod] = useState("creditcard");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCustomer());
      await dispatch(fetchCart());
    };
    fetchData();
  }, []);

  useEffect(() => {
    setShipAddress(null);
    if (route && route?.params?.customerAddress) {
      // console.log("address****", route?.params?.customerAddress);
      setShipAddress(route?.params?.customerAddress);
    } else {
      // console.log("address nooooooo****");
      billAddress = _.find(customer?.addresses, {
        default_shipping: true,
      });
      setShipAddress(billAddress);
    }

    if (route && route?.params?.checkPaymentMethod) {
      setPaymentMethod(
        route?.params?.checkPaymentMethod == "creditcard"
          ? "Debit / Credit Card"
          : "Cash On Delivery"
      );
      setMethod(route?.params?.checkPaymentMethod);
    }
  }, [route]);

  const newCustomerCartId = async () => {
    const resultAction = await dispatch(getCustomerCartId());
    if (getCustomerCartId.fulfilled.match(resultAction))
      dispatch(setCustomerCartId(resultAction?.payload?.data));
  };

  const paymentGateway = async (orderId) => {
    const resultAction = await dispatch(paymentOrder({ orderId: orderId }));
    if (paymentOrder.fulfilled.match(resultAction)) {
      navigation.navigate("PaymentGateWay");
    }
  };

  const placeYourOrder = async () => {
    const data = {
      data: {
        paymentMethod: {
          method: method,
        },
        billing_address: {
          email: customer?.email,
          region: shipAddress?.region?.region,
          country_id: "AE",
          street: [shipAddress?.street[0]],
          postcode: shipAddress?.postcode,
          city: shipAddress?.city,
          telephone: shipAddress?.telephone,
          firstname: shipAddress?.firstname,
          lastname: shipAddress?.lastname,
        },
      },
    };

    const resultAction = await dispatch(placeOrder(data));
    if (placeOrder.fulfilled.match(resultAction)) {
      unwrapResult(resultAction);

      if (method === "creditcard") {
        // console.log(resultAction);
        const orderId = resultAction?.payload?.data;
        paymentGateway(orderId);
      } else {
        dispatch(setCartEmpty());
        newCustomerCartId();
        navigation.navigate("OrderConfirmed");
      }
    } else {
      navigation.navigate("OrderNotConfirmed");
    }
  };

  // console.log("88888888888888", method, shipAddress);
  return (
    <Container>
      <ProductViewTitle titleLabel="Checkout" />
      <ScrollView style={{ backgroundColor: "#f2f2f2" }}>
        <CheckoutContent
          shippingMethod={shippingMethod}
          paymentMethod={paymentMethod}
        />
      </ScrollView>
      <ButtonSubmit
        label="Place Order"
        onPress={placeYourOrder}
        status={status}
      />
    </Container>
  );
}

export default Checkout;
