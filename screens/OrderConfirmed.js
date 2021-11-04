import React from "react";
import { View, Text, Image } from "react-native";
import styled, { css } from "styled-components/native";

import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(View)`
  flex: 1;
  padding: 10px;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
`;

const OuterBorder = styled(View)`
  padding: 50px;
  background-color: #ffff;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  text-align: center;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;
const SmallText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const OrderConfirmed = ({ route }) => {
  const { orderId } = useSelector((state) => state.checkout);
  const navigation = useNavigation();
  const transactionDetails = route?.params?.transactionDetails;
  const checkYourOrder = () => {
    navigation.navigate("MyOrder");
  };
  return (
    <Container>
      <OuterBorder>
        <Ionicons name="md-checkmark-circle" size={100} color="#4BB543" />
        <Title>Your Order is Confirmed!</Title>
        <SmallText>Order Id : {orderId}</SmallText>
        {transactionDetails && (
          <SmallText>
            Transaction Id : {transactionDetails?.transation_id}
          </SmallText>
        )}
        <ButtonSubmit label="Check your order" onPress={checkYourOrder} />
      </OuterBorder>
    </Container>
  );
};

export default OrderConfirmed;
