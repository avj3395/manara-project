import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import ProductItem from "../components/ProductItem/ProductItem";
import FrequentlyPurchase from "../components/FrequentlyPurchase/FrequentlyPurchase";
import ProductDetailsTab from "../components/ProductDetailsTab/ProductDetailsTab";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { cartId } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItem } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { fetchCart } from "../store/slices/cartSlice";
import * as _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductViewSkelton from "../components/Skeltons/ProductViewSkelton";

const Container = styled(View)`
  flex: 1;
  padding: 30px 10px 0px;
  background-color: #fff;
`;
const Spacer = styled(View)`
  background-color: #f5f5f3;
  height: 4px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 25px;
`;
const AddToCartWrap = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
`;
const CounterWrap = styled(View)`
  margin-bottom: 20px;
`;
const CounterLabel = styled(Text)`
  position: relative;
  color: #070707;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 15px;
`;
const ButtonWrap = styled(View)`
  flex-direction: row;
  width: 100%;
`;
const CountButton = styled(TouchableOpacity)`
  position: relative;
  color: #070707;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
const CountButtonLabel = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #070707;
`;
const CountWrap = styled(View)`
  position: relative;
  color: #070707;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  width: 80px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`;
const BtnOrange = styled(TouchableOpacity)`
  background-color: #0a874c;
  border-radius: 5px;
  width: 100%;
  padding: 9px 15px;
  align-items: center;
  justify-content: center;
`;
const BtnOrangeLabel = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
const BtnBorder = styled(TouchableOpacity)`
  border: 2px solid #487e08;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  margin-bottom: 3px;
`;
const Loading = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;
const data = [
  {
    source: require("../assets/product-1.png"),
    title: "Pro Name 001ABD",
    offerLabel: "10%",
    offerPrice: "$90.00",
    actualPrice: "$100.00",
    status: "On backorder",
    rating: "3",
  },
];
function ProductView({ route }) {
  const [qtyCount, setQtyCount] = useState(1);
  const [frequentlyPurchaseFlag, setFrequentlyPurchaseFlag] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const navigation = useNavigation();

  const dispatch = useDispatch({});
  const [itemInCart, setItemInCart] = useState(false);

  const { products, status } = useSelector((state) => state.products);
  const { cart, cartStatus, cartResStatus } = useSelector(
    (state) => state.cart
  );
  const { customerCartId: custCartId, guestCartId } = useSelector(
    (state) => state.login
  );
  const [customerCartId, setCustomerCartId] = useState(
    custCartId ? custCartId : guestCartId
  );
  useEffect(() => {
    setCustomerCartId(custCartId ? custCartId : guestCartId);
  }, [custCartId, guestCartId]);

  const productSku = route?.params?.product_sku;

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchProductItem({ product_sku: productSku })
      );
      // console.log("response === data", result);
      setProductInfo(result?.payload?.data);

      await dispatch(fetchCart());

      const itemAvailable = _.find(cart, { sku: productSku });
      if (cart.length > 1 && productSku === itemAvailable?.sku) {
        setItemInCart(true);
      } else {
        setItemInCart(false);
      }
    };
    fetchData();
  }, [productSku]);

  // console.log("customer cart id==", products);
  const postCart = async () => {
    //console.log("hello iam cart button");
    if (_.find(cart, { sku: productSku })) {
      navigation.navigate("Cart");
    } else {
      const data = {
        data: {
          cartItem: {
            qty: qtyCount,
            sku: productSku,
            quote_id: customerCartId,
          },
        },
      };

      const resultAction = await dispatch(addToCart(data));
      if (addToCart.fulfilled.match(resultAction)) {
        setItemInCart(true);
        await dispatch(fetchCart());
      }
    }
  };

  // console.log("response === data", products);
  // console.log("response &&&&&", addCart);
  return (
    <Container>
      <ProductViewTitle titleLabel="" searchFlag={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {status === "loading" ? (
          <ProductViewSkelton />
        ) : (
          <>
            <ProductItem productView item={productInfo} />
            {itemInCart === false && (
              <CounterWrap>
                <CounterLabel>Quantity</CounterLabel>
                <ButtonWrap>
                  <CountButton
                    onPress={() =>
                      qtyCount - 1 >= 0 && setQtyCount(qtyCount - 1)
                    }
                  >
                    <CountButtonLabel>-</CountButtonLabel>
                  </CountButton>
                  <CountWrap>
                    <Text>{qtyCount}</Text>
                  </CountWrap>
                  <CountButton onPress={() => setQtyCount(qtyCount + 1)}>
                    <CountButtonLabel>+</CountButtonLabel>
                  </CountButton>
                </ButtonWrap>
              </CounterWrap>
            )}
            <Spacer />
            <ProductDetailsTab productInfo={productInfo} />
            {/* {frequentlyPurchaseFlag == false && products?.length > 0 && (
              <FrequentlyPurchase
                customerCartId={customerCartId}
                setFrequentlyPurchaseFlag={setFrequentlyPurchaseFlag}
              />
            )} */}
            <Spacer />
          </>
        )}
      </ScrollView>
      <AddToCartWrap>
        {cartStatus == "loading" ? (
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            color="#487e08"
            size="large"
          />
        ) : (
          <BtnOrange style={{ width: "100%" }} onPress={postCart}>
            {_.find(cart, { sku: productSku }) ? (
              <BtnOrangeLabel> Go to Cart</BtnOrangeLabel>
            ) : (
              <BtnOrangeLabel> Add to Cart</BtnOrangeLabel>
            )}
          </BtnOrange>
        )}
        {/* <BtnBorder>
                <Ionicons name="ios-heart-empty" size={32} color="#487e08" />
              </BtnBorder> */}
      </AddToCartWrap>
    </Container>
  );
}

export default ProductView;
