import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import CartViewItem from "../components/CartViewItem/CartViewItem";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import PromoCode from "../components/Promocode/Promocode";
import ProductMainTitle from "../components/ProductMainTitle/ProductMainTitle";
import ProductItem from "../components/ProductItem/ProductItem";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../store/slices/productsSlice";
import { fetchCart } from "../store/slices/cartSlice";
import api from "../apis/apis";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import CartItemSkelton from "../components/Skeltons/CartItemSkelton";

const Container = styled(View)`
  flex: 1;
  padding-top: 50px;
  background-color: #fff;
`;
const Header = styled(View)`
  background: #f5f5f5;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 15px;
`;
const HeaderLeftBlock = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderRightBlock = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LabelText = styled(Text)`
  font-size: 18px;
  color: #1f2c32;
  ${(props) =>
    props.textGreen &&
    css`
      color: #028444;
    `}
  ${(props) =>
    props.textBold &&
    css`
      font-weight: bold;
      font-size: 18px;
    `}
`;
const Loading = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

function Cart() {
  const dispatch = useDispatch({});
  const { products, status } = useSelector((state) => state.products);
  const { cart, cartStatus, deleteCart } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState("");
  const [fullLoading, setFullLoading] = useState(false);
  const navigation = useNavigation();
  // const { guestCartId, token, customerCartId } = useSelector(
  //   (state) => state.login
  // );
  // useEffect(() => {
  //   console.log("keys==", guestCartId, token, customerCartId);
  // }, []);

  let priceTotal = 0;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProductsList({
          "searchCriteria[pageSize]": 5,
          "searchCriteria[current_page]": 1,
        })
      );

      await dispatch(fetchCart());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cart) {
      getTotalPrice();
    }
  }, [cart]);

  let total = cart.map((data) => data?.price * data?.qty);

  const getTotalPrice = () => {
    for (let i = 0; i < total.length; i++) {
      priceTotal = total[i] + priceTotal;
    }
    setTotalPrice(priceTotal);
  };

  var formatedTotalPrice = parseFloat(totalPrice).toFixed(2);

  const gotoCheckout = async () => {
    // console.log("iam checkout");
    try {
      const token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
      if (token) {
        navigation.navigate("ShippingAddress");
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {fullLoading && (
        <Loading>
          <ActivityIndicator size="large" color="##8c8c8c" />
        </Loading>
      )}
      <ProductViewTitle titleLabel="Cart" searchFlag={false} />
      {cartStatus === "loading" && cart?.length < 1 && (
        <View>
          <CartItemSkelton />
          <CartItemSkelton />
          <CartItemSkelton />
        </View>
      )}
      {cart?.length < 1 && cartStatus === "succeeded" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="shoppingcart" size={100} color="#d9d9d9" />
          <Text style={{ color: "#cccc", padding: 10, fontWeight: "bold" }}>
            Empty Cart
          </Text>
        </View>
      )}
      {cart?.length > 0 && (
        <Header>
          <HeaderLeftBlock>
            <LabelText textBold>Cart:</LabelText>
            <LabelText>{cart?.length} Items</LabelText>
          </HeaderLeftBlock>
          <HeaderRightBlock>
            <LabelText textBold>Total:</LabelText>
            <LabelText>$ {formatedTotalPrice}</LabelText>
          </HeaderRightBlock>
        </Header>
      )}

      {cart?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            {cart?.map((item, index) => (
              <CartViewItem
                listView
                item={item}
                key={`cart-${item?.item_id}`}
                setFullLoading={setFullLoading}
              />
            ))}
            <OrderSummary totalPrice={formatedTotalPrice} />
          </>
        </ScrollView>
      )}

      {/* <PromoCode /> */}

      {/* <ProductMainTitle title="Recently Viewed" />
        <FlatList
          data={products.slice(0, 5)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => "product-V-" + item.id}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
        <ProductMainTitle title="Recommended for you" />
        <FlatList
          data={products.slice(0, 5)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => "product-R-" + item.id}
          renderItem={({ item }) => <ProductItem item={item} />}
        /> */}

      {cart?.length > 0 && (
        <ButtonSubmit label="Checkout" onPress={gotoCheckout} />
      )}
    </Container>
  );
}

export default Cart;
