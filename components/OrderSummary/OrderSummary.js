import React from "react";
import styled, { css } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
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
  padding: 0;
  margin-bottom: 60px;
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

const LabelWrap = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  ${(props) =>
    props.noBorder &&
    css`
      border-bottom-width: 0;
    `}
`;
const LineSpacer = styled(View)`
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #333;
`;
const LabelText = styled(Text)`
  font-size: 18px;
  color: #1f2c32;
  margin-bottom: 8px;
  ${(props) =>
    props.textGreen &&
    css`
      color: #028444;
    `}
  ${(props) =>
    props.textBold &&
    css`
      font-weight: bold;
      font-size: 20px;
    `}
    ${(props) =>
    props.textCenter &&
    css`
      font-weight: bold;
      font-size: 16px;
      text-align: center;
    `}
`;
function OrderSummary({ totalPrice }) {
  return (
    <Container>
      {/* <TitleWrap>
        <Title>Order Summary</Title>
        <TouchableHighlight>
          <AntDesign name="exclamationcircleo" size={24} color="#f38901" />
        </TouchableHighlight>
      </TitleWrap> */}
      {/* <LabelWrap noBorder>
        <LabelText>Orde Value</LabelText>
        <LabelText>$650</LabelText>
      </LabelWrap>
      <LabelWrap>
        <LabelText textGreen>Savings</LabelText>
        <LabelText textGreen>$50</LabelText>
      </LabelWrap>
      <LabelWrap>
        <LabelText>Sub Total</LabelText>
        <LabelText>$600</LabelText>
      </LabelWrap>
      <LabelWrap>
        <LabelText>Shipping</LabelText>
        <LabelText>Free</LabelText>
      </LabelWrap>
      <LabelWrap>
        <LabelText>Tax</LabelText>
        <LabelText>$2</LabelText>
      </LabelWrap>
      <LabelWrap>
        <LabelText textGreen>Rewards Credit</LabelText>
        <LabelText textGreen>100</LabelText>
      </LabelWrap> */}
      <LineSpacer style={{ BorderBottomStyle: "dashed" }} />
      <LabelWrap>
        <LabelText textBold>Order Total</LabelText>
        <LabelText textBold>${totalPrice} </LabelText>
      </LabelWrap>
      {/* <LabelWrap>
        <LabelText textGreen textCenter>
          You will save $5 on this order.
        </LabelText>
      </LabelWrap> */}
    </Container>
  );
}

export default OrderSummary;
