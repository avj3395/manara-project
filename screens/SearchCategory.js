import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Searchbar from "../components/Searchbar/Searchbar";
import FilterButton from "../components/FilterButton/FilterButton";
import CategoryResultItem from "../components/CategoryResultItem/CategoryResultItem";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategoryLink,
  fetchCategoryList,
} from "../store/slices/categorySlice";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";

const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 0px;
  background-color: #fff;
`;
const MainButton = styled(View)`
  flex-direction: row;
  margin-bottom: 20px;
`;
const MainButtonItem = styled(View)`
  background: #f5f5f5;
  width: 48%;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const ButtonItemLabel = styled(Text)`
  font-size: 17px;
  color: #1f2c32;
  font-weight: bold;
`;
const ColorLabel = styled(Text)`
  font-size: 17px;
  color: #e58917;
  font-weight: bold;
  margin-left: 6px;
  margin-right: 6px;
`;
const Border = styled(View)`
  height: 4px;
  background: #f2f2f2;
  margin-bottom: 15px;
`;
const BorderThin = styled(View)`
  height: 2px;
  background: #f2f2f2;
  margin-bottom: 10px;
  margin-top: 0;
`;
const SubCategoryPillContainer = styled(View)`
  margin: 10px 10px;
`;

function SearchCategory() {
  const dispatch = useDispatch({});
  const { category, status } = useSelector((state) => state.category);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(fetchCategoryList({ rootCategoryId: 2 }));
  };
  //console.log("@@@@", category);
  return (
    <Container>
      <ProductViewTitle titleLabel="Category" />
      {/* <Searchbar /> */}
      {/* <FilterButton /> */}
      {/* <BorderThin /> */}
      {/* <MainButton>
        <MainButtonItem>
          <ButtonItemLabel>
            <ColorLabel>/</ColorLabel> Brands <ColorLabel>/</ColorLabel>
          </ButtonItemLabel>
        </MainButtonItem>
        <MainButtonItem>
          <ButtonItemLabel>
            <ColorLabel>/</ColorLabel> Conditions <ColorLabel>/</ColorLabel>
          </ButtonItemLabel>
        </MainButtonItem>
      </MainButton> */}
      <Border />
      {status === "loading" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="##8c8c8c" />
        </View>
      ) : (
        <FlatList
          data={category?.children_data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => "category-" + item?.id}
          numColumns={3}
          renderItem={({ item }) => <CategoryResultItem item={item} />}
        />
      )}
    </Container>
  );
}

export default SearchCategory;
