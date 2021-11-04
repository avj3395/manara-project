import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { mediaURL } from "../../apis/apis";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteCart, addToCart } from "../../store/slices/cartSlice";
import { cartId } from "../../apis/apis";
import ProgressiveImage from "../ProgressiveImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled(View)`
  position: relative;
  margin-left: 14px;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 12px;
  margin-top: 20px;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.2;
  shadow-radius: 2;
  elevation:2;
  background-color: #fff;
  border:1px solid #ececec;

  ${(props) =>
    props.listView &&
    css`
      flex-direction: row;
      margin-bottom: 0px;
      margin-top: 0;
      border: none;
      border-bottom-width: 1px;
      border-bottom-color: #ececec;
      padding: 0;
      border-radius: 0;
      elevation: 0;
    `}
  ${(props) =>
    props.productView &&
    css`
      border: none;
      margin: 0 0 25px;
      padding: 0;
      border-radius: 0;
      elevation: 0;
    `}
`;
const ImageWrap = styled(View)`
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #ffff;
  padding: 5px;
  border-radius: 5px;
  padding-top: 0;
  ${(props) =>
    props.listView &&
    css`
      padding: 10px 7px 7px;
      margin-right: 15px;
      margin-bottom: 0px;
      width: 100px;
    `}
  ${(props) =>
    props.productView &&
    css`
      justify-content: center;
      align-items: center;
      border: none;
      padding-top: 5px;
    `}
`;
const ImageItem = styled(ProgressiveImage)`
  position: relative;
  width: 110px;
  height: 130px;
  background-color: #ffff;

  ${(props) =>
    props.listView &&
    css`
      width: 90px;
      height: 100px;
    `}
  ${(props) =>
    props.productView &&
    css`
      width: 180px;
      height: 130px;
    `};
`;
const Title = styled(Text)`
  font-size: 13px;
  color: #263238;
  margin-bottom: 8px;
  font-family: "raleway-medium";
  width: 130px;
  text-transform: capitalize;
  font-weight: bold;
  ${(props) =>
    props.listView &&
    css`
      margin-bottom: 4px;
      margin-top: 35px;
      font-size: 14px;
    `}
  ${(props) =>
    props.productView &&
    css`
      font-size: 17px;
      width: 100%;
    `};
`;
const PriceWrap = styled(View)`
  flex-direction: row;
  margin-bottom: 8px;
`;
const OfferPrice = styled(Text)`
  font-size: 16px;
  color: #43606d;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const ActualPrice = styled(Text)`
  font-size: 16px;
  color: #9dacb3;
  text-decoration: line-through;
  padding-left: 10px;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const Status = styled(Text)`
  font-size: 14px;
  color: #f29706;
  margin-bottom: 8px;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const OfferLabel = styled(Text)`
  font-size: 14px;
  color: #fff;
  background-color: #028444;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  padding: 7px 10px;
  border-bottom-right-radius: 12px;
  ${(props) =>
    props.listView &&
    css`
      padding: 3px 7px;
      border-bottom-right-radius: 8px;
      font-size: 11px;
    `}
`;
const Avatar = styled(View)`
  position: relative;
`;
const AvatarInfo = styled(View)`
  position: relative;
  ${(props) =>
    props.listView &&
    css`
      padding-top: 10px;
    `}
`;
const AddCart = styled(TouchableOpacity)`
  position: relative;
  margin-left: auto;
  padding-right: 15px;
  padding-top: 15px;
  margin-top: 32px;
`;
const CartContainer = styled(View)`
  position: absolute;
  background-color: #d9534f;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 41px;
  left: 18px;
`;
const Count = styled(Text)`
  color: white;
  font-weight: bold;
`;
function ProductItem({ item, listView, productView, setFullLoading }) {
  const { customerCartId: custCartId, guestCartId } = useSelector(
    (state) => state.login
  );
  const [customerCartId, setCustomerCartId] = useState(
    custCartId ? custCartId : guestCartId
  );
  const labelWidth = productView
    ? Dimensions.get("window").width - 15
    : Dimensions.get("window").width - 190;
  const navigation = useNavigation();
  const dispatch = useDispatch({});
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    setCustomerCartId(custCartId ? custCartId : guestCartId);
  }, [custCartId, guestCartId]);

  const imageURL = _.find(item?.media_gallery_entries, {
    media_type: "image",
  });

  const specialPrice = _.find(item?.custom_attributes, {
    attribute_code: "special_price",
  });

  const clickCartButton = async () => {
    setFullLoading(true);
    const cartProduct = _.find(cart, { sku: item?.sku });
    if (cartProduct) {
      const deleteAction = await dispatch(
        deleteCart({ itemId: cartProduct?.item_id })
      );
      if (deleteCart.fulfilled.match(deleteAction)) {
        await dispatch(fetchCart());
        setFullLoading(false);
      }
    } else {
      const data = {
        data: {
          cartItem: {
            qty: 1,
            sku: item?.sku,
            quote_id: customerCartId,
          },
        },
      };
      const resultAction = await dispatch(addToCart(data));
      if (addToCart.fulfilled.match(resultAction)) {
        if (resultAction?.payload?.data?.sku === item?.sku) {
          await dispatch(fetchCart());
          setFullLoading(false);
        }
      }
    }
  };

  // console.log("itemsssss", item);
  return (
    <Container listView={listView} productView={productView}>
      <Avatar>
        {/* {item?.offerLabel && <OfferLabel listView={listView}>10</OfferLabel>} */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductView", {
              product_sku: item?.sku,
            });
          }}
        >
          <ImageWrap listView={listView} productView={productView}>
            <ImageItem
              style={{ resizeMode: "contain" }}
              listView={listView}
              productView={productView}
              source={{
                uri: mediaURL + imageURL?.file,
              }}
              defaultImageSource={require("../../assets/default.jpg")}
              style={{ resizeMode: "contain" }}
            />
          </ImageWrap>
        </TouchableOpacity>
      </Avatar>
      <AvatarInfo listView={listView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductView", {
              product_sku: item?.sku,
            });
          }}
        >
          <Title
            numberOfLines={2}
            listView={listView}
            productView={productView}
            style={{
              width: listView
                ? Dimensions.get("window").width - 200
                : productView
                ? "100%"
                : 130,
            }}
          >
            {item?.name}
          </Title>
        </TouchableOpacity>
        <PriceWrap>
          <OfferPrice productView={productView}>
            $
            {specialPrice?.value
              ? parseFloat(specialPrice?.value).toFixed(2)
              : item?.price}
          </OfferPrice>
          {specialPrice?.value && (
            <ActualPrice productView={productView}>$ {item?.price}</ActualPrice>
          )}
        </PriceWrap>
        {/* <Status productView={productView}>Status</Status> */}

        {/* <AirbnbRating
          count={5}
          defaultRating={item.rating}
          size={14}
          selectedColor="#f5af3f"
          showRating={false}
          fractions={2}
          starContainerStyle={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        /> */}
      </AvatarInfo>
      {listView && (
        <View>
          {_.find(cart, { sku: item?.sku }) && (
            <CartContainer>
              <Count>
                {_.find(cart, { sku: item?.sku })
                  ? _.find(cart, { sku: item?.sku })?.qty
                  : ""}
              </Count>
            </CartContainer>
          )}
          <AddCart onPress={clickCartButton}>
            <AntDesign
              name="shoppingcart"
              size={30}
              color={_.find(cart, { sku: item?.sku }) ? "#f29706" : "#028444"}
            />
          </AddCart>
        </View>
      )}
    </Container>
  );
}

export default ProductItem;
