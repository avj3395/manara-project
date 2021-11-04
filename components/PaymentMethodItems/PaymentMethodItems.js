import React from "react";
import styled from "styled-components/native";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
} from "react-native";
import { RadioButton } from "react-native-paper";

const { width } = Dimensions.get("window");
const itemWidth = width - 200;
const Container = styled(View)`
  position: relative;
  width: 100%;
  flex-direction: row;
  padding: 5px 10px;
  /* margin-bottom: 10px; */
  /* background-color: #fff; */
`;
const Content = styled(View)`
  position: relative;
  padding: 8px 5px 10px 0;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 5px;
`;

const PaymentMethodItems = ({
  item,
  setCheckPaymentMethod,
  checkPaymentMethod,
}) => {
  // const [checked, setChecked] = React.useState("cashondelivery");
  // console.log("method(((((", item);
  return (
    <Container>
      <RadioButton
        value="first"
        status={checkPaymentMethod === item?.code ? "checked" : "unchecked"}
        onPress={() => setCheckPaymentMethod(item?.code)}
      />

      <Content style={{ width: itemWidth }}>
        <Title>{item?.title}</Title>
      </Content>
    </Container>
  );
};

export default PaymentMethodItems;
