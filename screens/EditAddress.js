import React from "react";
import { View, Text, ScrollView } from "react-native";
import styled, { css } from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import AddAddressForm from "../components/Forms/AddAddressForm";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";

const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 10px;
  background-color: #ffff;
`;

const EditAddress = ({ route }) => {
  const billing = route?.params?.billing;
  const shipping = route?.params?.shipping;

  console.log("flag", billing, shipping);
  return (
    <Container>
      <ProductViewTitle titleLabel="Edit Address" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AddAddressForm billing={billing} shipping={shipping} />
      </ScrollView>
    </Container>
  );
};

export default EditAddress;
