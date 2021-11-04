import React, { useState } from "react";
import styled from "styled-components/native";
import { fetchProductGallery } from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { mediaURL } from "../../apis/apis";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import CheckOutCartItemList from "./CheckOutCartItemList";
const Container = styled(View)`
  position: relative;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 20px;
  background-color: #fff;
`;
const Title = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 20px;
  font-weight: bold;
`;
const Count = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 5px;
  font-weight: bold;
`;
const Avatar = styled(View)`
  position: relative;
  align-items: center;
  margin-right: 15px;
`;
const ImageWrap = styled(TouchableOpacity)`
  position: relative;
  margin-bottom: 10px;
  padding: 20px 5px 20px 5px;
  border: 1px solid #ccc;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 95px;
  height: 80px;
`;

const CartWarp = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
`;
const data = [
  {
    id: 1,
    source: require("../../assets/product-1.png"),
    count: "1",
  },
  {
    id: 2,
    source: require("../../assets/product-2.png"),
    count: "2",
  },
];
const Item = ({ item }) => (
  <Avatar>
    <ImageWrap>
      <ImageItem
        source={{
          uri: productInfo?.file
            ? mediaURL + productInfo?.file
            : "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
        }}
        style={{ resizeMode: "contain" }}
      />
    </ImageWrap>
    <Count>X {item?.qty}</Count>
  </Avatar>
);

function CheckOutCartItem({ cartData }) {
  const [productInfo, setProductInfo] = useState([]);
  const dispatch = useDispatch({});
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <Container>
      <CartWarp
      // onPress={() => {
      //   navigation.navigate("CartInsideCheckout");
      // }}
      >
        <Title>Cart({cartData.length})</Title>
        <Ionicons name="ios-arrow-forward" size={24} color="black" />
      </CartWarp>
      <FlatList
        data={cartData}
        // renderItem={renderItem}
        renderItem={({ item }) => <CheckOutCartItemList item={item} />}
        keyExtractor={(item) => "cart-" + item?.item_id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}

export default CheckOutCartItem;
