import React, { useEffect } from "react";
import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import OrdersItem from "../components/OrdersItem/OrdersItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/ordersSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const ScreenTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const BackButton = styled(TouchableOpacity)`
  padding: 10px 20px;
  position: absolute;
  left: 0;
`;

const ScreenTitle = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #263238;
`;

const LoadingWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
  z-index: 100;
`;
const NoDataWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const NoDataText = styled(Text)`
  color: #a9a9a9;
  font-size: 18px;
`;

const NoDataIcon = styled(MaterialCommunityIcons)`
  color: #a9a9a9;
  font-size: 32px;
  /* margin-bottom: 5px; */
`;

function MyOrders() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(
      fetchOrders({
        "searchCriteria[filter_groups][0][filters][0][field]": "customer_email",
        "searchCriteria[filter_groups][0][filters][0][value]": customer?.email,
        "searchCriteria[sortOrders][0][field]": "entity_id",
        "searchCriteria[sortOrders][0][direction]": "DESC",
      })
    );
  };
  // console.log("order", orders);
  return (
    <Container>
      <ScreenTitleWrapper>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={32} color="#546e7a" />
        </BackButton>
        <ScreenTitle>My Orders</ScreenTitle>
      </ScreenTitleWrapper>
      {status === "loading" && (
        <LoadingWrapper>
          <ActivityIndicator size="large" color="#008f57" />
        </LoadingWrapper>
      )}

      {orders?.items?.length < 1 && status === "succeeded" && (
        <NoDataWrapper>
          <NoDataIcon name="image-filter-none" />
          <NoDataText>No Orders</NoDataText>
        </NoDataWrapper>
      )}
      {orders?.items?.length > 0 && status === "succeeded" && (
        <FlatList
          data={orders?.items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => "order-" + item?.entity_id}
          renderItem={({ item }) => <OrdersItem item={item} />}
        />
      )}
    </Container>
  );
}

export default MyOrders;
