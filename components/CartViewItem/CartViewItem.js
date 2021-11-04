import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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
import { cartId } from "../../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const itemWidth = width - 140;
const Container = styled(View)`
  position: relative;
  padding-left: 15px;
  flex: 1;
  ${(props) =>
    props.listView &&
    css`
      flex-direction: row;
      margin-bottom: 0;
      align-items: flex-start;
    `}
  ${(props) =>
    props.productView &&
    css`
      margin: 0 0 0;
    `};
`;
const ImageWrap = styled(TouchableOpacity)`
  position: relative;
  margin-bottom: 20px;
  padding: 40px 5px 17px 5px;
  ${(props) =>
    props.listView &&
    css`
      padding: 30px 14px 17px;
      margin-right: 15px;
      margin-left: 0px;
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
  width: 95px;
  height: 80px;
`;
const Title = styled(Text)`
  font-size: 15px;
  color: #263238;
  margin-bottom: 8px;
  padding-top: 33px;
  font-family: "raleway-medium";
  padding-right: 40px;
  text-transform: capitalize;
  font-weight: bold;
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
  margin-bottom: 30px;
  margin-top: 8px;
`;
const OfferPrice = styled(Text)`
  font-size: 19px;
  color: #666666;
  font-weight: bold;
  text-align: right;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const ActualPrice = styled(Text)`
  font-size: 17px;
  color: #9dacb3;
  text-align: right;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const PriceDiff = styled(Text)`
  font-size: 14px;
  color: #028444;
  text-align: right;
  font-weight: bold;
  ${(props) =>
    props.productView &&
    css`
      font-size: 18px;
    `}
`;
const Spec = styled(Text)`
  font-size: 12px;
  color: #7f7f7f;
  margin-bottom: 5px;
  text-align: center;
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
const MenuIcon = styled(TouchableOpacity)`
  position: relative;
  margin-left: auto;
  padding-right: 15px;
  padding-top: 15px;
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
function CartViewItem({ item, listView, productView, setFullLoading }) {
  const [qtyCount, setQtyCount] = useState(item?.qty);
  const [productInfo, setProductInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { customerCartId: custCartId, guestCartId } = useSelector(
    (state) => state.login
  );
  const [customerCartId, setCustomerCartId] = useState(
    custCartId ? custCartId : guestCartId
  );
  useEffect(() => {
    setCustomerCartId(custCartId ? custCartId : guestCartId);
  }, [custCartId, guestCartId]);
  const { cart, cartStatus, cartDelete, cartResStatus } = useSelector(
    (state) => state.cart
  );

  const productTotalPrice = item?.price * item?.qty;
  var formatedTotalPrice = parseFloat(productTotalPrice).toFixed(2);

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
    if (qtyCount != item?.qty && qtyCount != 0) {
      setFullLoading(true);
      quantityProcess();
    }
    if (qtyCount === 0) {
      productDelete();
    }
  }, [qtyCount]);

  const createButtonAlert = () =>
    Alert.alert(
      "Delete Cart",
      "Are you sure you want to delete this product ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel button pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => productDelete() },
      ]
    );

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
      setFullLoading(false);
    }
  };

  const productDelete = async () => {
    setFullLoading(true);
    const deleteResponse = await dispatch(
      deleteCart({ itemId: item?.item_id })
    );
    // console.log("iam resp@@@", deleteResponse);
    if (deleteCart.fulfilled.match(deleteResponse)) {
      // await dispatch(fetchCart());
      setFullLoading(false);
    }
  };

  return (
    <Container
      listView={listView}
      productView={productView}
      style={{ borderTopWidth: 1, borderTopColor: "#ccc" }}
    >
      <Avatar>
        <ImageWrap>
          {isLoading ? (
            <View style={{ paddingRight: 25, paddingTop: "50%" }}>
              <ActivityIndicator size="large" color="##8c8c8c" />
            </View>
          ) : (
            <ImageItem
              source={{
                uri: mediaURL + productInfo?.file,
              }}
              defaultImageSource={require("../../assets/default.jpg")}
              style={{ resizeMode: "contain" }}
            />
          )}
        </ImageWrap>
        {/* <Spec>{item.spec}</Spec> */}
      </Avatar>
      <AvatarInfo listView={listView} style={{ width: itemWidth }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductView", {
              product_sku: item?.sku,
            });
          }}
        >
          <Title>{item?.name}</Title>
        </TouchableOpacity>

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
        <PriceWrap>
          {/* <ActualPrice productView={productView}>$ 100</ActualPrice> */}
          <OfferPrice productView={productView}>
            $ {formatedTotalPrice}
          </OfferPrice>

          {/* <PriceDiff productView={productView}>Super Deal $ 10</PriceDiff> */}
        </PriceWrap>
      </AvatarInfo>
      {listView && (
        <MenuIcon onPress={createButtonAlert}>
          <AntDesign name="delete" size={20} color="#333333" />
        </MenuIcon>
      )}
    </Container>
  );
}

export default CartViewItem;
