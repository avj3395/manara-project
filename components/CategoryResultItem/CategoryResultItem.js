import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryLink } from "../../store/slices/categorySlice";
import { fetchProductGallery } from "../../store/slices/productsSlice";
import { mediaURL } from "../../apis/apis";
import { useNavigation } from "@react-navigation/native";
import ProgressiveImage from "../ProgressiveImage";

const { width } = Dimensions.get("window");
const itemWidth = (width * 30) / 100;
const margin = (width * 1) / 100;
const titleWidth = width / 2 - 90;

const Container = styled(View)`
  position: relative;
  margin-bottom: 15px;
  overflow: hidden;
  background: #ffff;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  border-radius: 5px;
  border: 1px solid #ececec;
  elevation: 2;
  flex: 1;
  height: 190px;
`;
const Content = styled(View)`
  position: relative;
  z-index: 1;
`;
const ImageWrap = styled(View)`
  position: relative;
  /* margin-left: auto; */
  /* right: -20px;
  bottom: -10px; */
`;
const ImageItem = styled(ProgressiveImage)`
  position: relative;
  width: 90px;
  height: 90px;
`;
const Title = styled(Text)`
  font-size: 13px;
  color: #3d3d3d;
  font-weight: bold;
  font-family: "raleway-medium";
  text-transform: capitalize;
  text-align: center;
`;

function CategoryResultItem({ item }) {
  const dispatch = useDispatch({});
  const navigation = useNavigation();

  // const { categoryLink } = useSelector((state) => state.category);
  const { productItem, productGallery } = useSelector(
    (state) => state.products
  );
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);

  // useEffect(() => {
  //   const getCategoryImage = async () => {
  //     // setSubCategoryList(item?.children_data);
  //     setIsLoading(true);
  //     const returnData = await dispatch(
  //       fetchCategoryLink({ category_id: item?.id })
  //     );

  //     const result = await dispatch(
  //       fetchProductGallery({ product_sku: returnData?.payload[0]?.sku })
  //     );
  //     setProductDetails(result?.payload[0]);
  //     setIsLoading(false);
  //   };
  //   getCategoryImage();
  // }, []);

  //console.log("&&&&&&", subCategoryList);
  const categoryImages = {
    688: require("../../assets/category/688.jpg"),
    697: require("../../assets/category/697.jpg"),
    714: require("../../assets/category/714.jpg"),
    718: require("../../assets/category/718.jpg"),
    726: require("../../assets/category/726.jpg"),
    738: require("../../assets/category/738.jpg"),
    761: require("../../assets/category/761.jpg"),
    772: require("../../assets/category/772.jpg"),
    765: require("../../assets/category/765.jpg"),
    868: require("../../assets/category/868.jpg"),
    929: require("../../assets/category/929.jpg"),
  };
  // console.log("category id", item?.id);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SubCategoryScreen", {
          parentCategoryId: item?.id,
        });
      }}
    >
      <Container
        style={{
          width: itemWidth,
          marginLeft: margin,
          marginRight: margin,
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Content>
          <Title style={{ width: titleWidth }}>{item?.name}</Title>
        </Content>
        <ImageWrap>
          <ImageItem
            source={categoryImages[item?.id]}
            defaultImageSource={require("../../assets/default.jpg")}
            style={{ resizeMode: "contain" }}
          />
        </ImageWrap>
      </Container>
    </TouchableOpacity>
  );
}

export default CategoryResultItem;
