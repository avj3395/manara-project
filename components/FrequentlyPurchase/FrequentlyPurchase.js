import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import FrequentlyPurchaseItem from "../FrequentlyPurchaseItem/FrequentlyPurchaseItem";
import { addToCart, fetchCart } from "../../store/slices/cartSlice";

const Container = styled(View)`
  position: relative;
`;
const TitleWrap = styled(View)`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const Title = styled(Text)`
  position: relative;
  color: #070707;
  font-size: 18px;
  font-weight: bold;
`;
const AddButton = styled(View)`
  position: relative;
  ${(props) =>
    props.btnSm &&
    css`
      color: red;
    `}
`;
const ProductWrap = styled(View)`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const ImageWrap = styled(TouchableHighlight)`
  position: relative;
  padding: 0;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 75px;
  height: 75px;
`;
const Label = styled(Text)`
  position: relative;
  color: #070707;
  font-size: 19px;
  font-weight: bold;
`;
const Sum = styled(Text)`
  position: relative;
  color: #070707;
  font-size: 19px;
  font-weight: bold;
`;
const ButtonYellow = styled(Button)`
  background-color: #f48a00;
`;
const BtnOrange = styled(TouchableOpacity)`
  background-color: #f48a00;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
const BtnOrangeLabel = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
function FrequentlyPurchase({ customerCartId, setFrequentlyPurchaseFlag }) {
  const dispatch = useDispatch({});

  const { products, status } = useSelector((state) => state.products);
  const { cart, cartStatus } = useSelector((state) => state.cart);
  const [recommendedProduct, setRecommentedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  let priceTotal = 0;
  useEffect(() => {
    if (products?.length > 0) {
      const loopLength = products?.length < 3 ? products?.length : 3;
      let newProducts = [];
      for (let i = 0; i < loopLength; i++) {
        newProducts.push(products[Math.floor(Math.random() * products.length)]);
      }
      setRecommentedProduct(newProducts);
    }
  }, []);

  useEffect(() => {
    if (recommendedProduct) {
      getTotalPrice();
    }
  }, [recommendedProduct]);

  let total = recommendedProduct.map((data) => data?.price);

  const getTotalPrice = () => {
    for (let i = 0; i < total.length; i++) {
      priceTotal = total[i] + priceTotal;
    }
    setTotalPrice(priceTotal);
  };

  var formatedTotalPrice = parseFloat(totalPrice).toFixed(2);

  // console.log("total price ", formatedTotalPrice, total);

  const addFrequentlyProduct = async () => {
    let resultAction;
    setIsLoading(true);
    for (let i = 0; i < recommendedProduct?.length; i++) {
      let data = {
        data: {
          cartItem: {
            qty: 1,
            sku: recommendedProduct[i]?.sku,
            quote_id: customerCartId,
          },
        },
      };
      // console.log("++++++", data);
      resultAction = await dispatch(addToCart(data));
    }
    if (addToCart.fulfilled.match(resultAction)) {
      await dispatch(fetchCart());
      setIsLoading(false);
      setFrequentlyPurchaseFlag(true);
    }
  };

  // console.log("products===", recommendedProduct);

  return (
    <Container>
      <ScrollView>
        <TitleWrap>
          <Title>Frequently Purchased Together</Title>
          {/* <TouchableHighlight>
            <AddButton>
              <Entypo name="plus" size={32} color="#546e7a" />
            </AddButton>
          </TouchableHighlight> */}
        </TitleWrap>
        <FlatList
          data={recommendedProduct}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "product-N-" + item.id + "-" + index}
          renderItem={({ item, index }) => (
            <FrequentlyPurchaseItem item={item} index={index} />
          )}
        />

        <TitleWrap>
          <Label>3 Products Selected</Label>
          <Sum>$ {formatedTotalPrice}</Sum>
        </TitleWrap>
        {isLoading == false && (
          <BtnOrange onPress={addFrequentlyProduct}>
            <BtnOrangeLabel>Add 3 to Cart</BtnOrangeLabel>
          </BtnOrange>
        )}
      </ScrollView>
    </Container>
  );
}

export default FrequentlyPurchase;
