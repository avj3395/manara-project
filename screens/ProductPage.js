import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import ProductItem from "../components/ProductItem/ProductItem";
import ProductMainTitle from "../components/ProductMainTitle/ProductMainTitle";
import ProductTypeNav from "../components/ProductTypeNav";
import BlogItem from "../components/BlogItem/BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../store/slices/productsSlice";
import ProductViewItemSkelton from "../components/Skeltons/ProductViewItemSkelton";
const Container = styled(View)`
  flex: 1;
  padding: 15px 0;
  background-color: #fff;
`;

const nav = [
  {
    title: "Atopic Skin",
    id: 1,
  },
  {
    title: "Body Cleansers",
    id: 2,
  },
  {
    title: "Body Moisturizers",
    id: 3,
  },
  {
    title: "Body Sun Care",
    id: 4,
  },
  {
    title: "Cellulite",
    id: 5,
  },
];

function ProductPage({ refreshing, setRefreshing }) {
  const dispatch = useDispatch({});
  const { products, status, responseStatus } = useSelector(
    (state) => state.products
  );
  const [newLaunchProduct, setNewLaunchProduct] = useState([]);
  const [newLaunch, setNewLaunch] = useState([]);
  const [covidProduct, setCovidProduct] = useState([]);
  const [covidEssential, setCovidEssential] = useState([]);
  const [sellerProduct, setSellerProduct] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const newProduct = await dispatch(
        fetchProductsList({
          "searchCriteria[pageSize]": 10,
          "searchCriteria[current_page]": 1,
          "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
          "searchCriteria[filterGroups][0][filters][0][value]": 868,
        })
      );
      setNewLaunchProduct(newProduct?.payload?.data?.items);

      const covid = await dispatch(
        fetchProductsList({
          "searchCriteria[pageSize]": 10,
          "searchCriteria[current_page]": 1,
          "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
          "searchCriteria[filterGroups][0][filters][0][value]": 772,
        })
      );
      setCovidEssential(covid?.payload?.data?.items);

      const seller = await dispatch(
        fetchProductsList({
          "searchCriteria[pageSize]": 10,
          "searchCriteria[current_page]": 1,
          "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
          "searchCriteria[filterGroups][0][filters][0][value]": 726,
        })
      );
      setBestSeller(seller?.payload?.data?.items);
      setRefreshing(false);
    };
    getProduct();
  }, [refreshing]);

  useEffect(() => {
    if (newLaunchProduct?.length > 0) {
      const loopLength =
        newLaunchProduct?.length < 5 ? newLaunchProduct?.length : 5;
      let newProducts = [];
      for (let i = 0; i < loopLength; i++) {
        newProducts.push(
          newLaunchProduct[Math.floor(Math.random() * newLaunchProduct.length)]
        );
      }
      setNewLaunch(newProducts);
    }
    if (covidEssential?.length > 0) {
      const loopLength =
        covidEssential?.length < 5 ? covidEssential?.length : 5;
      let covidProducts = [];
      for (let i = 0; i < loopLength; i++) {
        covidProducts.push(
          covidEssential[Math.floor(Math.random() * covidEssential.length)]
        );
      }
      setCovidProduct(covidProducts);
    }

    if (bestSeller?.length > 0) {
      const loopLength = bestSeller?.length < 5 ? bestSeller?.length : 5;
      let sellerProducts = [];
      for (let i = 0; i < loopLength; i++) {
        sellerProducts.push(
          bestSeller[Math.floor(Math.random() * bestSeller.length)]
        );
      }
      setSellerProduct(sellerProducts);
    }
  }, [newLaunchProduct, covidEssential, bestSeller]);
  // console.log("data%%product page", newLaunchProduct);

  return (
    <Container>
      <ProductMainTitle title="Newly Launched Products" category_id={868} />
      {/* <FlatList
          data={nav}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => "product-H-" + item.id}
          renderItem={({ item }) => <ProductTypeNav item={item} />}
        /> */}
      {status === "loading" && (
        <View
          style={{
            flexDirection: "row",
            height: 150,
          }}
        >
          <ProductViewItemSkelton />
          <ProductViewItemSkelton />
          <ProductViewItemSkelton />
        </View>
      )}
      {newLaunch.length > 0 && status === "succeeded" && (
        <FlatList
          data={newLaunch}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "product-N-" + item.id + "-" + index}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      )}
      {newLaunch.length < 1 && status === "succeeded" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 150,
          }}
        >
          <Text>No Data Found</Text>
        </View>
      )}
      <ProductMainTitle title="Covid Essentials Products" category_id={772} />
      {status === "loading" && (
        <View
          style={{
            flexDirection: "row",
            height: 150,
          }}
        >
          <ProductViewItemSkelton />
          <ProductViewItemSkelton />
          <ProductViewItemSkelton />
        </View>
      )}
      {covidProduct.length > 0 && status === "succeeded" && (
        <FlatList
          data={covidProduct}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "product-B-" + item.id + "-" + index}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      )}
      {covidProduct.length < 1 && status === "succeeded" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 150,
          }}
        >
          <Text>No Data Found</Text>
        </View>
      )}
      <ProductMainTitle title="Best Sellers" category_id={726} />
      {status === "loading" && (
        <View
          style={{
            flexDirection: "row",
            height: 150,
          }}
        >
          <ProductViewItemSkelton />
          <ProductViewItemSkelton />
          <ProductViewItemSkelton />
        </View>
      )}
      {sellerProduct.length > 0 && status === "succeeded" && (
        <FlatList
          data={sellerProduct}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "product-B-" + item.id + "-" + index}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      )}
      {sellerProduct.length < 1 && status === "succeeded" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 150,
          }}
        >
          <Text>No Data Found</Text>
        </View>
      )}
    </Container>
  );
}

export default ProductPage;
