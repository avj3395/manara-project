import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import ProductItem from "../components/ProductItem/ProductItem";
import api from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../store/slices/productsSlice";
import { render } from "react-dom";
import { fetchCart } from "../store/slices/cartSlice";

const Container = styled(View)`
  flex: 1;
  padding: 50px 0;
  background-color: #fff;
`;

function ProductListing({ route, categoryType, categoryId }) {
  const dispatch = useDispatch({});
  const { products, status, responseStatus } = useSelector(
    (state) => state.products
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const filterType = route?.params ? route?.params?.filterType : categoryType;
  const filterId = route?.params ? route?.params?.filterId : categoryId;
  const { category, subCategory } = useSelector((state) => state.category);

  useEffect(() => {
    if (!isLoading && filterId > 0) {
      getData();
    }
  }, [filterId]);

  useEffect(() => {
    if (refreshing) {
      getData();
    }
  }, [refreshing]);

  useEffect(() => {
    // console.log("==useeffect 11 ", typeof currentPage, isLoading);
    if (!isLoading && currentPage > 1) {
      // console.log("==useeffect 1100 ", currentPage, isLoading);
      getData();
    }
  }, [currentPage]);
  const getData = async () => {
    setIsLoading(true);

    await dispatch(
      fetchProductsList({
        "searchCriteria[pageSize]": 10,
        "searchCriteria[current_page]": refreshing ? 1 : currentPage,
        "searchCriteria[filterGroups][0][filters][0][field]": filterType,
        "searchCriteria[filterGroups][0][filters][0][value]": filterId,
      })
    );
    // await dispatch(fetchCart());
    setIsLoading(false);
    setRefreshing(false);
  };

  const handleLoadMore = ({ distanceFromEnd }) => {
    if (subCategory?.product_count > products?.length)
      setCurrentPage(currentPage + 1);
    // console.log("==load more", currentPage);
  };

  return (
    <>
      {products.length > 0 && (
        <View>
          <FlatList
            data={products}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "product-" + item?.sku + "-" + index}
            renderItem={({ item }) => <ProductItem listView item={item} />}
            // ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.4}
            onEndReached={handleLoadMore}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
          />
        </View>
      )}
      {products.length < 1 && status === "succeeded" && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No Data Found</Text>
        </View>
      )}
    </>
  );
}

export default ProductListing;
