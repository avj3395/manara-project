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
  padding: 15px 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;
const Content = styled(View)`
  position: relative;
  padding: 10px 5px 10px 0;
`;
const ImageWrap = styled(TouchableHighlight)`
  position: relative;
  padding-right: 20px;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 130px;
  height: 100px;
`;
const Title = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 5px;
  font-weight: bold;
`;
const Price = styled(Text)`
  font-size: 18px;
  color: #1f2c32;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Date = styled(Text)`
  font-size: 14px;
  color: #acacac;
  margin-bottom: 5px;
`;
const ContentInfo = styled(Text)`
  font-size: 14px;
  color: #333;
`;

function ShippingMethodItem({
  item,
  checkShippingMethod,
  setCheckShippingMethod,
}) {
  // const [checked, setChecked] = React.useState("");
  //console.log("method(((((", item);
  return (
    <Container>
      <RadioButton
        value={item.index}
        status={
          checkShippingMethod === item?.method_code ? "checked" : "unchecked"
        }
        onPress={() => setCheckShippingMethod(item?.method_code)}
      />
      <ImageWrap>
        <ImageItem
          source={require("../../assets/icon.png")}
          style={{ resizeMode: "contain" }}
        />
      </ImageWrap>
      <Content style={{ width: itemWidth }}>
        <Title>{item?.method_title}</Title>
        <Price>rate: {item?.price_incl_tax} $</Price>
        {/* <Date>{item.date}</Date> */}
        <ContentInfo>{item?.carrier_title}</ContentInfo>
      </Content>
    </Container>
  );
}

export default ShippingMethodItem;
