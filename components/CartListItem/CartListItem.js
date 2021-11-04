import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  fetchProductItem,
  fetchProductGallery,
} from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { mediaURL } from "../../apis/apis";
import { useNavigation } from "@react-navigation/native";
import { fetchCart, editCart, deleteCart } from "../../store/slices/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { cartId } from "../../apis/apis";
const { width } = Dimensions.get("window");
const itemWidth = width - 170;
const Container = styled(View)`
  position: relative;
  margin-left: 14px;
  margin-bottom: 30px;

  flex: 1;
  ${(props) =>
    props.listView &&
    css`
      flex-direction: row;
      margin-bottom: 20px;
      height: 120px;
      padding-bottom: 20px;
    `}
  ${(props) =>
    props.productView &&
    css`
      margin: 0 0 25px;
    `}
`;
const ImageWrap = styled(TouchableHighlight)`
  position: relative;
  margin-bottom: 20px;
  padding: 40px 5px 17px 5px;
  ${(props) =>
    props.listView &&
    css`
      padding: 30px 14px 17px;
      margin-right: 15px;
      margin-bottom: 0px;
    `}
  ${(props) =>
    props.productView &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 195px;
  height: 163px;
  ${(props) =>
    props.listView &&
    css`
      width: 65px;
      height: 75px;
    `}
`;
const Title = styled(Text)`
  font-size: 15px;
  color: #263238;
  margin-bottom: 8px;
  font-family: "raleway-medium";
  padding-right: 40px;
  ${(props) =>
    props.listView &&
    css`
      margin-bottom: 4px;
    `}
  ${(props) =>
    props.productView &&
    css`
      font-size: 22px;
    `}
`;
const PriceWrap = styled(View)`
  flex-direction: row;
  margin-bottom: 8px;
`;
const OfferPrice = styled(Text)`
  font-size: 18px;
  color: #028444;
  font-weight: bold;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const ActualPrice = styled(Text)`
  font-size: 17px;
  color: #9dacb3;
  text-decoration: line-through;
  padding-left: 10px;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const Spec = styled(Text)`
  font-size: 14px;
  color: #7f7f7f;
  margin-bottom: 8px;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
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
const DeleteCart = styled(TouchableOpacity)`
  position: relative;
  margin-left: auto;
  padding-right: 15px;
  padding-top: 15px;
  margin-top: 20px;
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
  width: 25px;
  height: 25px;
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
  width: 30px;
  height: 25px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;
function CartListItem({ item, listView, productView }) {
  const [qtyCount, setQtyCount] = useState(item?.qty);
  const [isLoading, setIsLoading] = useState(false);
  const [customerCartId, setCustomerCartId] = useState("");

  const [productInfo, setProductInfo] = useState([]);
  const { cart, cartStatus, cartDelete, cartResStatus } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch({});
  const navigation = useNavigation();

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);

      const result = await dispatch(
        fetchProductGallery({ product_sku: item?.sku })
      );

      setProductInfo(result?.payload[0]);
      setIsLoading(false);
    };
    getImages();

    //console.log("dataaaaaaa", result);
  }, []);

  useEffect(() => {
    const getCartId = async () => {
      let cart_id = "";
      let guestCartId = "";
      try {
        cart_id = await AsyncStorage.getItem("CUSTOMER_CART_ID");
        guestCartId = await AsyncStorage.getItem("GUEST_CART_ID");
        if (cart_id) {
          setCustomerCartId(cart_id);
        } else {
          setCustomerCartId(guestCartId);
        }
        //console.log("*(((((((())))))))))))))))", cart_id);
      } catch (error) {
        console.log("***error", error);
      }
    };
    getCartId();
  }, []);
  // console.log("dataaaaaaa", productInfo);

  useEffect(() => {
    if (qtyCount != item?.qty && qtyCount != 0) {
      quantityProcess();
    }
    if (qtyCount === 0) {
      productDelete();
    }
  }, [qtyCount]);

  const quantityProcess = async () => {
    // console.log("iam count number", qtyCount);
    const data = {
      cartItem: {
        qty: qtyCount,
        sku: item?.sku,
        quote_id: customerCartId,
      },
    };
    const editAction = await dispatch(
      editCart({ data: data, itemId: item?.item_id })
    );
    if (editCart.fulfilled.match(editAction)) {
      await dispatch(fetchCart());
    }
  };

  const productDelete = async () => {
    // console.log("iam zerooooooooooo", item?.item_id);
    const deleteResponse = await dispatch(
      deleteCart({ itemId: item?.item_id })
    );
    // console.log("iam resp@@@", deleteResponse);
    if (deleteCart.fulfilled.match(deleteResponse)) {
      await dispatch(fetchCart());
    }
  };

  return (
    <Container listView={listView} productView={productView}>
      <Avatar>
        <ImageWrap listView={listView} productView={productView}>
          {isLoading ? (
            <View style={{ paddingRight: 25, paddingTop: "50%" }}>
              <ActivityIndicator size="small" color="##8c8c8c" />
            </View>
          ) : (
            <ImageItem
              listView={listView}
              source={{
                uri: mediaURL + productInfo?.file,
              }}
              defaultImageSource={require("../../assets/default.jpg")}
              style={{ resizeMode: "contain" }}
            />
          )}
        </ImageWrap>
      </Avatar>
      <AvatarInfo listView={listView} style={{ width: itemWidth }}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("ProductView", {
              product_sku: item?.sku,
            });
          }}
        >
          <Title listView={listView} productView={productView}>
            {item?.name}
          </Title>
        </TouchableHighlight>
        {/* <Spec productView={productView}>{item.spec}</Spec> */}
        <PriceWrap>
          <OfferPrice productView={productView}> ${item?.price}</OfferPrice>
          <ActualPrice productView={productView}>$100</ActualPrice>
        </PriceWrap>
        <ButtonWrap>
          <CountButton
            onPress={() => qtyCount - 1 >= 0 && setQtyCount(qtyCount - 1)}
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
      </AvatarInfo>
      {listView && (
        <DeleteCart onPress={productDelete}>
          <AntDesign name="delete" size={24} color="#bfbfbf" />
        </DeleteCart>
      )}
    </Container>
  );
}

export default CartListItem;
