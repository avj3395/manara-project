import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const LinkText = styled(Text)`
  padding: 10px 15px;
  flex-direction: row;
`;

const Button = styled(View)`
  padding: 10px 20px;
  flex-direction: row;
  background: #f1f2f3;
  align-items: center;
  border-radius: 4px;
`;
const ButtonText = styled(Text)`
  color: #546e7a;
  margin-left: 5px;
`;
function FilterButton() {
  return (
    <Container>
      <TouchableHighlight>
        <LinkText>All</LinkText>
      </TouchableHighlight>
      <TouchableHighlight>
        <Button>
          <AntDesign name="plus" size={24} color="#546e7a" />
          <ButtonText>Touch Here</ButtonText>
        </Button>
      </TouchableHighlight>
    </Container>
  );
}

export default FilterButton;
