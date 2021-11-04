import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";
import ShippingMethodItem from "../components/ShippingMethodItem/ShippingMethodItem";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit";
import { fetchShippingMethod } from "../store/slices/CheckoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Container = styled(View)`
  flex: 1;
  padding: 50px 0px 0px 0px;
  background-color: #f2f2f2;
`;

function ShippingMethod({ route }) {
  const dispatch = useDispatch({});
  const navigation = useNavigation();
  const shippingAddressId = route?.params?.addressId;
  const { shippingMethod } = useSelector((state) => state.checkout);
  const [checkShippingMethod, setCheckShippingMethod] = useState("flatrate");

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        data: {
          address: {
            region: "Dubai",
            country_id: "AE",
            street: ["123 Oak Ave"],
            postcode: "10577",
            city: "Purchase",
            firstname: "Jane",
            lastname: "Doe",
            customer_id: 4,
            email: "akshay@test.com",
            telephone: "(512) 555-1111",
            same_as_billing: 1,
          },
        },
      };
      await dispatch(fetchShippingMethod(data));
    };
    fetchData();
  }, []);
  // console.log("****checkout*****", shippingMethod);

  const gotoPaymentMethod = () => {
    navigation.navigate("PaymentMethod", {
      shippingAddressId: shippingAddressId,
      shippingMethod: checkShippingMethod,
    });
  };

  return (
    <Container>
      <ProductViewTitle titleLabel="Shipping Method" searchFlag={false} />
      <FlatList
        data={shippingMethod}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => "shipping-" + item?.method_code}
        renderItem={({ item }) => (
          <ShippingMethodItem
            item={item}
            setCheckShippingMethod={setCheckShippingMethod}
            checkShippingMethod={checkShippingMethod}
          />
        )}
      />

      <ButtonSubmit label="Continue" onPress={gotoPaymentMethod} />
    </Container>
  );
}

export default ShippingMethod;
