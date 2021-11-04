import React from "react";
import { View, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import styled, { css } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import {
  getCustomerCartId,
  setCustomerCartId,
} from "../store/slices/loginSlice";
import { setCartEmpty } from "../store/slices/cartSlice";

const Container = styled(View)`
  flex: 1;
  padding: 50px 0px 0px 0px;
  background-color: #fff;
`;

const PaymentGateWay = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch({});

  const { orderId, paymentURL } = useSelector((state) => state.checkout);
  // console.log("payment gate way", paymentURL, orderId);

  const newCustomerCartId = async () => {
    const resultAction = await dispatch(getCustomerCartId());
    if (getCustomerCartId.fulfilled.match(resultAction))
      dispatch(setCustomerCartId(resultAction?.payload?.data));
  };

  return (
    <Container>
      <ProductViewTitle titleLabel="Payment" searchFlag={false} />

      <WebView
        source={{
          uri: `${paymentURL}`,
        }}
        onMessage={(event) => {
          if (event.nativeEvent.data == "pay-fail") {
            navigation.navigate("OrderNotConfirmed");
          } else {
            try {
              const transactionDetails = JSON.parse(event.nativeEvent.data);
              dispatch(setCartEmpty());
              newCustomerCartId();
              navigation.navigate("OrderConfirmed", {
                transactionDetails: transactionDetails,
              });
              console.log("event", transactionDetails, orderId);
            } catch (error) {
              console.log("try cache error", error);
            }
          }
          // console.log("event", event.nativeEvent.data);
          // alert(event.nativeEvent.data);
        }}
        style={{ marginTop: 50 }}
      />
    </Container>
  );
};

export default PaymentGateWay;
