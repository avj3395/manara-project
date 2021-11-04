import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import ProductItem from "../components/ProductItem/ProductItem";
import Searchbar from "../components/Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import ProductItemSkelton from "../components/Skeltons/ProductItemSkelton";
import { Entypo } from "@expo/vector-icons";
const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 0px;
  background-color: #fff;
`;

const NoDataWarp = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;
const NoDataText = styled(Text)`
  color: gray;
  font-weight: bold;
`;
const SearchPage = () => {
  const dispatch = useDispatch();
  const { products, searchProducts, status } = useSelector(
    (state) => state.products
  );

  // console.log("search product ===", searchProducts);
  return (
    <Container>
      <ProductViewTitle titleLabel="Search" subCatFlag />
      <Searchbar />
      {status === "loading" && searchProducts?.length < 1 && (
        <>
          <ProductItemSkelton />
          <ProductItemSkelton />
          <ProductItemSkelton />
          <ProductItemSkelton />
        </>
      )}
      {searchProducts?.length > 0 && (
        <FlatList
          data={searchProducts}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "product-" + item?.sku + "-" + index}
          renderItem={({ item }) => <ProductItem listView item={item} />}
        />
      )}
      {searchProducts?.length < 1 && (
        <NoDataWarp>
          <Entypo name="emoji-sad" size={50} color="gray" />
          <NoDataText>No Item Found</NoDataText>
        </NoDataWarp>
      )}
    </Container>
  );
};

export default SearchPage;
