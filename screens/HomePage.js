import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ImageBackground,
  View,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import BannerList from "../components/BannerList/BannerList";
import HorizontalBannerList from "../components/HorizontalBannerList/HorizontalBannerList";
import BannerSlider from "../components/BannerSlider";
import CategoryNav from "../components/CategoryNav/CategoryNav";
import HomeSearchbar from "../components/HomeSearchbar/HomeSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../store/slices/productsSlice";
import { AsyncStorage } from "react-native";
import { fetchCustomer } from "../store/slices/customerSlice";
import ProductPage from "./ProductPage";

const Container = styled(View)`
  flex: 1;
  padding: 0;
  padding-top: 30px;
  background-color: #fff;
`;
const data = [
  {
    source: require("../assets/banner-1.jpg"),
    id: 1,
  },
];
const data2 = [
  {
    source: require("../assets/banner-3.jpg"),
    id: 1,
  },
  {
    source: require("../assets/banner-2.jpg"),
    id: 2,
  },
  {
    source: require("../assets/banner-3.jpg"),
    id: 3,
  },
  {
    source: require("../assets/banner-2.jpg"),
    id: 4,
  },
  {
    source: require("../assets/slide-1.jpg"),
    id: 5,
  },
];
function HomePage() {
  const dispatch = useDispatch({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCustomer());
    };

    fetchData();
  }, []);
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
      >
        <HomeSearchbar />
        {/* <CategoryNav /> */}
        <BannerSlider />
        {/* <FlatList
          data={data}
          keyExtractor={(item) => "banner-" + item.id}
          renderItem={({ item }) => <BannerList item={item} />}
        /> */}

        <ProductPage refreshing={refreshing} setRefreshing={setRefreshing} />
      </ScrollView>
    </Container>
  );
}

export default HomePage;
