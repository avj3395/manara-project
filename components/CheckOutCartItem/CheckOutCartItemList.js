import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { fetchProductGallery } from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { mediaURL } from "../../apis/apis";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";

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

function CheckOutCartItemList({ item }) {
  const [productInfo, setProductInfo] = useState([]);

  const navigation = useNavigation();

  const dispatch = useDispatch({});

  useEffect(() => {
    const getImages = async () => {
      const result = await dispatch(
        fetchProductGallery({ product_sku: item?.sku })
      );

      setProductInfo(result?.payload[0]);
    };
    getImages();
    //console.log("dataaaaaaa", result);
  }, []);

  // console.log("@@@@@@@", productInfo);

  return (
    <Avatar>
      <ImageWrap
        onPress={() => {
          navigation.navigate("ProductView", {
            product_sku: item?.sku,
          });
        }}
      >
        <ImageItem
          source={{
            uri: mediaURL + productInfo?.file,
          }}
          defaultImageSource={require("../../assets/default.jpg")}
          style={{ resizeMode: "contain" }}
        />
      </ImageWrap>
      <Count>X {item?.qty}</Count>
    </Avatar>
  );
}

export default CheckOutCartItemList;
