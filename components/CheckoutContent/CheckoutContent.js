import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import ProductViewTitle from "../ProductViewTitle/ProductViewTitle";
import CheckOutCartItem from "../CheckOutCartItem/CheckOutCartItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ButtonSubmit from "../../components/ButtonSubmit/ButtonSubmit";
import * as _ from "lodash";

import { fetchCart } from "../../store/slices/cartSlice";
import { fetchCustomer } from "../../store/slices/customerSlice";

const Container = styled(View)`
  position: relative;
  width: 100%;
  padding: 15px 0;
  margin-bottom: 20px;
  background-color: #f2f2f2;
`;
const PageNav = styled(TouchableOpacity)`
  position: relative;
  background-color: #fff;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
`;
const PageNavItem = styled(View)`
  position: relative;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PageNavTitle = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 5px;
  font-weight: bold;
`;
const PageNavContent = styled(Text)`
  font-size: 13px;
  color: #a1a1a1;
  margin-bottom: 5px;
  font-weight: bold;
`;
const ButtonWrap = styled(View)``;
function CheckoutContent({ paymentMethod, shippingMethod }) {
  const dispatch = useDispatch({});
  const navigation = useNavigation();
  const { cart, cartStatus } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(fetchCustomer());
  //     await dispatch(fetchCart());
  //   };
  //   fetchData();
  // }, []);

  //console.log("77777777777777", shipAddress, billingAddress);

  return (
    <Container>
      <PageNav
        onPress={() => {
          navigation.navigate("ShippingAddress");
        }}
      >
        <PageNavItem>
          <View>
            <PageNavTitle>Shipping Address</PageNavTitle>
            <PageNavContent>Add new shipping address</PageNavContent>
          </View>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </PageNavItem>
      </PageNav>
      <PageNav
        onPress={() => {
          navigation.navigate("ShippingMethod");
        }}
      >
        <PageNavItem>
          <View>
            <PageNavTitle>Shipping Method</PageNavTitle>
            <PageNavContent>shipping method :{shippingMethod} </PageNavContent>
          </View>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </PageNavItem>
      </PageNav>
      <PageNav
        onPress={() => {
          navigation.navigate("PaymentMethod");
        }}
      >
        <PageNavItem>
          <View>
            <PageNavTitle>Payment Method</PageNavTitle>
            <PageNavContent>payment method :{paymentMethod} </PageNavContent>
          </View>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </PageNavItem>
      </PageNav>
      <CheckOutCartItem cartData={cart} />
    </Container>
  );
}

export default CheckoutContent;
