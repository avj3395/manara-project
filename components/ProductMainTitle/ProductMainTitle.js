import React from "react";
import styled from "styled-components/native";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Container = styled(View)`
  position: relative;
  flex-direction: row;
  /* margin-bottom: 27px; */
  padding: 0 10px;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 17px;
  color: #3d3d3d;
  font-weight: bold;
`;
const MoreBtn = styled(TouchableOpacity)`
  margin-left: auto;
`;
const MoreBtnLabel = styled(Text)`
  font-size: 14px;
  color: #028444;
  margin-left: auto;
`;
function ProductMainTitle({ title, category_id, subCategoryPage }) {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>{title}</Title>
      {subCategoryPage ? null : (
        <MoreBtn
          onPress={() => {
            navigation.navigate("SubCategoryScreen", {
              parentCategoryId: category_id,
            });
          }}
        >
          <MoreBtnLabel>View All</MoreBtnLabel>
        </MoreBtn>
      )}
    </Container>
  );
}

export default ProductMainTitle;
