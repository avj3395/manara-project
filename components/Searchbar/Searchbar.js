import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../../store/slices/productsSlice";

const Container = styled(View)`
  padding: 10px 15px;
  background-color: #f1f2f3;
  border-radius: 8px;
  flex-direction: row;
  margin-bottom: 15px;
  align-items: center;
`;
const Textbox = styled(TextInput)`
  padding: 0 10px;
  color: #546e7a;
  width: 70%;
`;
const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;
const Button = styled(TouchableOpacity)`
  background-color: #008f57;
  padding: 5px 15px 5px 15px;
  border-radius: 8px;
  align-items: center;
  margin-left: auto;
`;
function Searchbar() {
  const dispatch = useDispatch();

  const [searchName, setSearchName] = useState("");

  const handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    setSearchName(formatQuery);
  };

  const searchProducts = async () => {
    let data = "%" + searchName + "%";
    const resultAction = await dispatch(
      getSearchProducts({
        "searchCriteria[filterGroups][0][filters][0][field]": "name",
        "searchCriteria[filterGroups][0][filters][0][value]": data,
        "searchCriteria[filterGroups][0][filters][0][conditionType]": "like",
        "searchCriteria[pageSize]": 20,
      })
    );
    if (getSearchProducts.fulfilled.match(resultAction)) {
      setSearchName("");
    }
    // console.log("search name", data);
  };
  return (
    <Container>
      <AntDesign name="search1" size={24} color="#546e7a" />
      <Textbox
        placeholder="Search for Items"
        onChangeText={(text) => handleSearch(text)}
        value={searchName}
      />
      <Button onPress={searchProducts}>
        <ButtonText>Search</ButtonText>
      </Button>
    </Container>
  );
}

export default Searchbar;
