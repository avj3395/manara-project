import React from "react";
import styled from "styled-components/native";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Container = styled(View)`
  position: relative;
  margin-left: 13px;
  margin-right: 13px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const LinkItem = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  overflow: hidden;
  position: relative;
  flex-direction: column;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 25px;
`;
const LinkLabel = styled(Text)`
  position: relative;
  font-size: 10px;
  margin-top: 5px;
  color: #546e7a;
`;

function CategoryNavItem({ item }) {
  const navigation = useNavigation();
  //console.log(item?.color);
  return (
    <Container>
      <LinkItem
        color={item.color}
        onPress={() => {
          navigation.navigate("SubCategoryScreen", {
            parentCategoryId: item?.category_id,
          });
        }}
      >
        <ImageItem source={item.source} style={{ resizeMode: "contain" }} />
      </LinkItem>
      <LinkLabel>{item.title}</LinkLabel>
    </Container>
  );
}

export default CategoryNavItem;
