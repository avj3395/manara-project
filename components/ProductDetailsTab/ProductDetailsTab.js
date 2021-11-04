import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import HTML from "react-native-render-html";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import AddReviews from "../Forms/AddReviews";
import ReviewScreen from "../../screens/ReviewScreen";

const Container = styled(View)`
  position: relative;
  margin-bottom: 10px;
  padding: 20px 10px;
`;
const ListStyle = styled(Text)`
  margin: 0 0 5px;
  font-size: 14px;
  line-height: 19px;
  ${(props) =>
    props.boldText &&
    css`
      font-weight: bold;
    `}
`;
const ItalicStyle = styled(Text)`
  margin: 0 0 5px;
  font-size: 14px;
  line-height: 19px;
  font-style: italic;
`;
const ContentTitle = styled(Text)`
  margin: 0 0 8px;
  font-size: 15px;
  line-height: 19px;
  font-weight: bold;
`;
const Bullet = styled(Text)`
  margin: 0 5px;
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
`;
const WarningWarp = styled(View)`
  flex-direction: row;
  padding: 10px;
  background-color: #ffe7ba;
  border-radius: 5px;
  margin-top: 30px;
`;

const WarningMessage = styled(Text)``;

const FirstRoute = ({ overView }) => (
  <Container style={[{ backgroundColor: "#fff", flex: 1 }]}>
    <ContentTitle>Description</ContentTitle>

    <HTML source={{ html: `${overView}` }} />
  </Container>
);

const SecondRoute = ({ description }) => (
  <Container>
    <HTML source={{ html: `${description}` }} />
  </Container>
);
const ThirdRoute = ({ isToken, navigation }) => (
  <Container>
    {isToken ? (
      <ReviewScreen />
    ) : (
      <WarningWarp>
        <Ionicons name="md-warning" size={24} color="#d48806" />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <WarningMessage>
            Only registered users can write reviews.
          </WarningMessage>
          <View style={{ flexDirection: "row" }}>
            <WarningMessage>Please </WarningMessage>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#1890ff" }}>Sign in </Text>
            </TouchableOpacity>
            <WarningMessage>or </WarningMessage>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: "#1890ff" }}>create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </WarningWarp>
    )}
  </Container>
);
const FourthRoute = () => (
  <Container>
    <ListStyle boldText>Q:duration of odour??</ListStyle>
    <ListStyle> A:4 Or 5 hrs</ListStyle>
    <ListStyle boldText>Q:differences between deo and perfume</ListStyle>
    <ListStyle>
      A:A deodorant is normally water based and usually lasts all day long. A
      perfume on the other hand is alcohol based and does not remain for a long
      time. Deo for day. Perfume in night.
    </ListStyle>
    <ListStyle boldText>Q:differences between deo and perfume</ListStyle>
    <ListStyle>
      A:A deodorant is normally water based and usually lasts all day long. A
      perfume on the other hand is alcohol based and does not remain for a long
      time. Deo for day. Perfume in night.
    </ListStyle>
  </Container>
);

function ProductDetailsTab({ productInfo }) {
  const initialLayout = { width: Dimensions.get("window").width };
  const { productItem } = useSelector((state) => state.products);
  const [isToken, setIsToken] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Overview" },
    { key: "second", title: "Details" },
    { key: "third", title: "Review" },
    // { key: "fourth", title: "FAQ" },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
        if (token) {
          setIsToken(true);
        } else {
          setIsToken(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log("product details", productInfo);

  const renderScene = ({ route }) => {
    let result = "";
    // console.log(productDetails[0]?.value);
    // if (productDetails[0]?.value != "undefined") {
    //   const regex = /(<([^>]+)>)/gi;
    //   result = productDetails[0]?.value?.replace(regex, "");
    // }

    const description = _.find(productInfo?.custom_attributes, {
      attribute_code: "description",
    });
    const overView = _.find(productInfo?.custom_attributes, {
      attribute_code: "short_description",
    });

    switch (route.key) {
      case "first":
        return index == 0 && <FirstRoute overView={overView?.value} />;
      case "second":
        return index == 1 ? (
          <SecondRoute description={description?.value} />
        ) : null;
      case "third":
        return index == 2 ? (
          <ThirdRoute isToken={isToken} navigation={navigation} />
        ) : null;
      // case "fourth":
      //   return <FourthRoute />;
      default:
        return null;
    }
  };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  //   fourth: FourthRoute,
  // });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#0a874c" }}
      style={{ backgroundColor: "#fff", color: "#333", elevation: 1 }}
      activeColor="#0a874c"
      inactiveColor="#bababa"
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, margin: 3, fontSize: 15 }}>{route.title}</Text>
      )}
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
}

export default ProductDetailsTab;
