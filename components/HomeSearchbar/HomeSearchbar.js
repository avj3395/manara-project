import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import menuIconImg from "../../assets/menu-icon.png";
import logoImg from "../../assets/e-manara-logo.png";

import { useNavigation } from "@react-navigation/native";

const Container = styled(View)`
  padding: 10px 15px 5px;
  border-radius: 8px;
  flex-direction: row;
  /* margin-bottom: 15px; */
  justify-content: space-between;
  align-items: center;
`;
const LogoMain = styled(View)`
  justify-content: center;
  margin: 0 auto;
`;
const LogoImage = styled(Image)`
  justify-content: center;
  width: 120px;
`;
const Textbox = styled(TextInput)`
  padding: 10px;
  color: #546e7a;
  flex: 1;
`;
const MenuIcon = styled(Image)`
  padding: 0 10px;
  width: 30px;
  height: 30px;
`;
function HomeSearchbar() {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={24} color="gray" />
        {/* <MenuIcon source={menuIconImg} resizeMode="contain" /> */}
      </TouchableOpacity>
      <LogoMain>
        <LogoImage source={logoImg} resizeMode="contain" />
      </LogoMain>
      {/* <Textbox placeholder="" /> */}
      <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
        <AntDesign name="search1" size={24} color="#546e7a" />
      </TouchableOpacity>
    </Container>
  );
}

export default HomeSearchbar;
