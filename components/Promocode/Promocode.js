import React from "react";
import styled from "styled-components/native";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
  TextInput,
} from "react-native";
const Container = styled(View)`
  position: relative;
  padding: 15px 0 0;
`;
const TitleWrap = styled(View)`
  background: #f5f5f5;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
`;
const Title = styled(Text)`
  font-size: 18px;
  color: #1f2c32;
  margin-bottom: 8px;
  font-weight: bold;
`;

const TextBtn = styled(Text)`
  font-size: 16px;
  color: #028444;
  margin-bottom: 8px;
  font-weight: bold;
`;
const Textbox = styled(TextInput)`
  padding: 15px 10px;
  color: #546e7a;
  border-width: 1px;
  border-top-color: #ccc;
  border-bottom-color: #ccc;
`;
function PromoCode({ item }) {
  return (
    <Container style={{ borderTopWidth: 1, borderTopColor: "#ccc" }}>
      <TitleWrap>
        <Title>Promo Code</Title>
        <TouchableHighlight>
          <TextBtn>ADD</TextBtn>
        </TouchableHighlight>
      </TitleWrap>
      <Textbox placeholder="Enter your promo code" />
    </Container>
  );
}

export default PromoCode;
