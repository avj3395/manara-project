import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import CartListItem from "../components/CartListItem/CartListItem";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/slices/cartSlice";

const Container = styled(View)`
  flex: 1;
  padding: 50px 0;
  background-color: #fff;
`;

const data = [
  {
    source: require("../assets/product-1.png"),
    title: "Austro Labs SWACHH HAND SANITIZER SPRAY LIQUID 60 ML X 10",
    offerPrice: "$90.00",
    actualPrice: "$100.00",
    spec: "Weight: 0.25lbs",
  },
  {
    source: require("../assets/product-2.png"),

    title:
      "CENWELL Unisex 100% Cotton Protective Fashionable Printed Fabric N95",
    offerPrice: "$90.00",
    actualPrice: "$100.00",
    spec: "Weight: 0.25lbs",
  },
  {
    source: require("../assets/product-3.png"),
    title: "Pro Name 001ABD",
    offerPrice: "$100.00",
    actualPrice: "$120.00",
    spec: "Weight: 0.25lbs",
  },
  {
    source: require("../assets/product-1.png"),
    title: "WOW Skin Science Green Tea & Tea Tree Anti-Dandruff Shampoo",
    actualPrice: "$50.00",
    spec: "Weight: 0.25lbs",
  },
  {
    source: require("../assets/product-2.png"),
    title: "Pro Name 001ABD",
    offerLabel: "3%",
    offerPrice: "$90.00",
    actualPrice: "$100.00",
    spec: "Weight: 0.25lbs",
  },
];
function CartInsideCheckout() {
  const dispatch = useDispatch({});

  const { cart, cartStatus } = useSelector((state) => state.cart);

  useEffect(() => {
    const getCartItems = async () => {
      await dispatch(fetchCart());
    };
    getCartItems();
  }, []);

  return (
    <Container>
      <ProductViewTitle titleLabel="Cart" />
      {cartStatus === "loading" && cart.length < 1 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="##8c8c8c" />
        </View>
      )}
      {cart.length > 0 && (
        <FlatList
          data={cart}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => "cart-" + item?.item_id}
          renderItem={({ item }) => <CartListItem listView item={item} />}
        />
      )}
      {cart.length < 1 && cartStatus === "succeeded" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>No Data Found</Text>
        </View>
      )}
    </Container>
  );
}

export default CartInsideCheckout;
