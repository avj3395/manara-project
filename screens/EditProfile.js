import React, { useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { updatePassword } from "../store/slices/customerSlice";
import {
  setCustomerCartId,
  setGuestCartId,
  setToken,
} from "../store/slices/loginSlice";
import { getGuestCartId, setCartEmpty } from "../store/slices/cartSlice";
import { showSuccessToastWithColor } from "../constants/Utils";
import EditProfileForm from "../components/Forms/EditProfileForm";
import EditPasswordForm from "../components/Forms/EditPasswordForm";

const Container = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
`;

const ScreenTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const BackButton = styled(TouchableOpacity)`
  padding: 10px 20px;
  position: absolute;
  left: 0;
`;

const ScreenTitle = styled(Text)`
  font-size: 20px;
  color: #546e7a;
`;

function EditProfile({ route }) {
  const changePassword = route?.params?.changePassword;
  const navigation = useNavigation();

  // console.log("flag", changePassword);
  return (
    <Container>
      <ScreenTitleWrapper>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={32} color="#546e7a" />
        </BackButton>
        <ScreenTitle>Edit Profile</ScreenTitle>
      </ScreenTitleWrapper>
      {changePassword ? <EditPasswordForm /> : <EditProfileForm />}
    </Container>
  );
}

export default EditProfile;
