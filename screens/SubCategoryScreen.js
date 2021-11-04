import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import ProductMainTitle from "../components/ProductMainTitle/ProductMainTitle";
import ProductItem from "../components/ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../store/slices/productsSlice";
import SubCategoryPill from "../components/SubCategoryPill/SubCategoryPill";
import ProductListing from "./ProductListing";
import {
  fetchCategoryList,
  fetchSubCategoryList,
} from "../store/slices/categorySlice";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import ProductItemSkelton from "../components/Skeltons/ProductItemSkelton";
import _ from "lodash";
import ProductViewItemSkelton from "../components/Skeltons/ProductViewItemSkelton";

const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 0px;
  background-color: #fff;
  position: relative;
`;

const BorderThin = styled(View)`
  height: 2px;
  background: #f2f2f2;
`;

const SubCategoryPillContainer = styled(View)`
  margin: 0 10px;
  padding: 12px 0;
`;
const ParentHeading = styled(Text)`
  padding-left: 15px;
  padding-top: 10px;
  font-size: 17px;
  color: #263238;
  font-family: "raleway-medium";
  font-weight: bold;
  margin-bottom: -13px;
`;
const ResultCount = styled(Text)`
  padding-left: 15px;
  padding-bottom: 10px;
  font-size: 15px;
  color: #263238;
  font-family: "raleway-medium";
`;
const Loading = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
`;
function SubCategoryScreen({ route }) {
  const [filterId, setFilterId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [deals, setDeals] = useState([]);
  const [fullLoading, setFullLoading] = useState(false);
  //const subCategoryId = route?.params?.subCategoryId;
  const parentCategoryId = route?.params?.parentCategoryId;
  const { products, status, responseStatus } = useSelector(
    (state) => state.products
  );
  const { category, subCategory } = useSelector((state) => state.category);

  const getData = async () => {
    setFilterId(parentCategoryId);
    const resultAction = await dispatch(
      fetchSubCategoryList({ rootCategoryId: parentCategoryId })
    );
    setRefreshing(false);
  };

  const getProducts = async () => {
    setIsLoading(true);
    await dispatch(
      fetchProductsList({
        "searchCriteria[pageSize]": 10,
        "searchCriteria[current_page]": refreshing ? 1 : currentPage,
        "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
        "searchCriteria[filterGroups][0][filters][0][value]": filterId,
      })
    );
    setIsLoading(false);
    // setRefreshing(false);
  };
  // console.log(
  //   "parent id",
  //   route?.params?.parentCategoryId,
  //   parentCategoryId,
  //   filterId
  // );
  useEffect(() => {
    getData();
    getProducts();
  }, [parentCategoryId]);

  useEffect(() => {
    if (filterId) {
      getProducts();
    }
  }, [filterId]);

  useEffect(() => {
    if (refreshing) {
      getData();
      getProducts();
    }
  }, [refreshing]);

  useEffect(() => {
    if (!isLoading && currentPage > 1) {
      getProducts();
    }
  }, [currentPage]);

  // useEffect(() => {
  //   if (products?.length > 0 && currentPage == 1) {
  //     const loopLength = products?.length < 5 ? products?.length : 5;
  //     let dealProducts = [];
  //     for (let i = 0; i < loopLength; i++) {
  //       dealProducts.push(
  //         products[Math.floor(Math.random() * products.length)]
  //       );
  //     }
  //     setDeals(dealProducts);
  //   }
  // }, [products]);

  // console.log("******", subCategory);
  const ListHeader = () => {
    //View to set in Header
    return (
      <>
        {/* <ProductMainTitle title="Deal of the day" subCategoryPage={true} />
        <View>
          <FlatList
            data={deals}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => "deals-" + item.id + "-" + index}
            renderItem={({ item }) => <ProductItem item={item} />}
          />
        </View> */}
        {/* <BorderThin /> */}
        {/* {subCategory?.name && (
          <ParentHeading>
            {subCategory?.name} {subCategory?.product_count} Results
          </ParentHeading>
        )} */}
        {subCategory?.children_data?.length > 0 && (
          <SubCategoryPillContainer>
            <FlatList
              data={subCategory?.children_data}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => "sub-cat-" + item?.id}
              horizontal={true}
              //numColumns={2}
              renderItem={({ item }) => (
                <SubCategoryPill item={item} setFilterId={setFilterId} />
              )}
            />
          </SubCategoryPillContainer>
        )}
        <BorderThin />
      </>
    );
  };

  const handleLoadMore = ({ distanceFromEnd }) => {
    if (subCategory?.product_count > products?.length)
      setCurrentPage(currentPage + 1);
    // console.log("==load more", currentPage);
  };

  return (
    <Container>
      {fullLoading && (
        <Loading>
          <ActivityIndicator size="large" color="##8c8c8c" />
        </Loading>
      )}
      <ProductViewTitle
        titleLabel={subCategory?.name}
        subCatFlag
        parentId={category?.parent_id}
      />

      {status === "loading" && products?.length < 1 && (
        <>
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <ProductViewItemSkelton />
            <ProductViewItemSkelton />
            <ProductViewItemSkelton />
          </View>
          <ProductItemSkelton />
          <ProductItemSkelton />
          <ProductItemSkelton />
          <ProductItemSkelton />
        </>
      )}
      {products.length > 0 && (
        <FlatList
          data={products}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "product-" + item?.sku + "-" + index}
          renderItem={({ item }) => (
            <ProductItem listView item={item} setFullLoading={setFullLoading} />
          )}
          ListHeaderComponent={ListHeader}
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
      )}
      {/* <ProductListing
        categoryType={"category_id"}
        categoryId={filterId ? filterId : parentCategoryId}
      /> */}
    </Container>
  );
}

export default SubCategoryScreen;
