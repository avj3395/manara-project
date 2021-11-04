import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled, { css } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import thumb1 from "../../assets/pr-7.png";
import thumb2 from "../../assets/pr-6.png";
import thumb3 from "../../assets/pr-5.png";
import * as _ from "lodash";
import { mediaURL } from "../../apis/apis";
import { useNavigation } from "@react-navigation/native";

const ProductWrap = styled(View)`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const ImageWrap = styled(TouchableOpacity)`
  position: relative;
  padding: 0;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 110px;
  height: 100px;
`;

const AddButton = styled(View)`
  position: relative;
  ${(props) =>
    props.btnSm &&
    css`
      color: red;
    `}
`;
const FrequentlyPurchaseItem = ({ item, index }) => {
  const navigation = useNavigation();

  const imageURL = _.find(item?.media_gallery_entries, {
    media_type: "image",
  });

  //   console.log("index===", index);
  return (
    <TouchableOpacity>
      <ProductWrap>
        <ImageWrap
          onPress={() => {
            navigation.navigate("ProductView", {
              product_sku: item?.sku,
            });
          }}
        >
          <ImageItem
            source={{
              uri: mediaURL + imageURL?.file,
            }}
            defaultImageSource={require("../../assets/default.jpg")}
            style={{ resizeMode: "contain" }}
          />
        </ImageWrap>
        {index === 2 ? null : (
          <AddButton>
            <AntDesign name="plus" size={24} color="#546e7a" />
          </AddButton>
        )}
      </ProductWrap>
    </TouchableOpacity>
  );
};

export default FrequentlyPurchaseItem;
