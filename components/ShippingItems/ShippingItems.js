import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { RadioButton } from "react-native-paper";

const AddressContainer = styled(View)`
  position: relative;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 15px 10px;
  margin-bottom: 25px;
`;
const AddressData = styled(View)`
  padding: 0 10px;
`;
const NameLabel = styled(Text)`
  position: relative;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;
const AddressLabel = styled(Text)`
  position: relative;
  font-size: 14px;
  color: #7f7f7f;
`;
const { width } = Dimensions.get("window");
const itemWidth = width - 80;
const ShippingItems = ({ item, checked, setChecked, createButtonAlert }) => {
  useEffect(() => {
    if (item?.default_shipping == true && !checked) {
      setChecked(item?.id);
    }
  }, []);
  return (
    <AddressContainer>
      <RadioButton
        // value="first"
        status={checked == item?.id ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(item?.id);
          // console.log("cccc", item?.id);
        }}
      />
      <AddressData style={{ width: itemWidth }}>
        <NameLabel>
          {item?.firstname} {item?.lastname}
        </NameLabel>
        <AddressLabel>{item?.street[0]}</AddressLabel>
        <AddressLabel>{item?.city}</AddressLabel>
        <AddressLabel>
          {item?.region?.region}, {item?.postcode}
        </AddressLabel>
        <AddressLabel>{item?.telephone}</AddressLabel>
      </AddressData>
      <TouchableOpacity
        onPress={() => {
          createButtonAlert(item?.id);
        }}
      >
        <AntDesign name="delete" size={24} color="#333333" />
      </TouchableOpacity>
    </AddressContainer>
  );
};

export default ShippingItems;
