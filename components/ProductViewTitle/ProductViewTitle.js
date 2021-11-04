import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../assets/e-manara-logo.png";

import {
  View,
  FlatList,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
const BorderThin = styled(View)`
  height: 2px;
  background: #f2f2f2;
`;
const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled(Text)`
  padding: 0;
  flex-direction: row;
  font-size: 20px;
  font-weight: 700;
  color: #263238;
  text-transform: capitalize;
`;
const BackButton = styled(View)`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;
const SearchButton = styled(View)`
  padding: 10px 20px;
  flex-direction: row;
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
function ProductViewTitle({
  titleLabel,
  subCatFlag,
  parentId,
  searchFlag = true,
}) {
  const navigation = useNavigation();

  const goBackPage = () => {
    navigation.goBack();
  };

  const goSearchPage = () => {
    if (searchFlag) {
      navigation.navigate("SearchPage");
    }
  };

  return (
    <>
      <Container>
        <TouchableOpacity onPress={goBackPage}>
          <BackButton>
            <Ionicons name="ios-arrow-back" size={30} color="#546e7a" />
          </BackButton>
        </TouchableOpacity>
        {titleLabel ? (
          <Title>{titleLabel}</Title>
        ) : (
          <LogoMain>
            <LogoImage source={logoImg} resizeMode="contain" />
          </LogoMain>
        )}

        <TouchableOpacity onPress={goSearchPage}>
          <SearchButton>
            {searchFlag && <Feather name="search" size={24} color="#96a6ad" />}
          </SearchButton>
        </TouchableOpacity>
      </Container>
      <BorderThin />
    </>
  );
}

export default ProductViewTitle;
