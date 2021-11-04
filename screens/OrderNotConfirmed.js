import React from "react";
import { View, Text, Image } from "react-native";
import styled, { css } from "styled-components/native";

import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  margin-bottom: 10px;
`;

const OrderNotConfirmed = ({ navigation }) => {
  const checkYourCart = () => {
    navigation.navigate("Cart");
  };
  return (
    <Container>
      <OuterBorder>
        <MaterialCommunityIcons name="close-circle" size={100} color="red" />
        <Title>Your Order Is Not Confirmed!</Title>
        <ButtonSubmit label="Go to Cart" onPress={checkYourCart} />
      </OuterBorder>
    </Container>
  );
};

export default OrderNotConfirmed;
