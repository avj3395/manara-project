import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchCustomer } from "../store/slices/customerSlice";
import { getGuestCartId, setCartEmpty } from "../store/slices/cartSlice";
import {
  setCustomerCartId,
  setGuestCartId,
  setToken,
} from "../store/slices/loginSlice";

const Container = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
  padding: 15px 15px;
`;

const TabWrapper = styled(View)`
  flex-direction: row;
  background-color: #e1e1e1;
  border-radius: 8px;
  padding: 4px 5px;
  margin-bottom: 30px;
`;

const LoginFormWrapper = styled(ScrollView)`
  flex: 1;
`;

const RegisterFormWrapper = styled(ScrollView)`
  flex: 1;
`;

const TabButtonLog = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.activeTab == "LOG" ? "#fff" : "transparent"};
  padding: 5px 15px;
  flex: 1;
  border-radius: 8px;
  align-items: center;
`;

const TabButtonReg = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.activeTab == "REG" ? "#fff" : "transparent"};
  padding: 5px 15px;
  flex: 1;
  border-radius: 8px;
  align-items: center;
`;

const TabButtonText = styled(Text)`
  color: #252525;
  font-size: 14px;
`;

const TitleText = styled(Text)`
  color: #252525;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

const InputFields = styled(TextInput)`
  border: 1px solid #808080;
  height: 40px;
  padding: 0 15px;
  border-radius: 8px;
`;

const ErrorText = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
`;

const Spacer = styled(View)`
  height: 20px;
`;
const Spacer50 = styled(View)`
  height: 50px;
`;

const LoginButton = styled(TouchableOpacity)`
  background-color: #008f57;
  padding: 10px 15px;
  border-radius: 8px;
  align-items: center;
`;

const LoginButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

const FormLabelText = styled(Text)`
  color: #181818;
  margin-bottom: 8px;
`;

const ModalContainerWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const SuccessMessageContainer = styled(View)`
  padding: 20px 50px;
  background-color: #fff;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const CloseIconWrapper = styled(TouchableOpacity)`
  padding: 5px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const CloseIcon = styled(AntDesign)`
  color: #181818;
`;

const SettingsIcon = styled(AntDesign)`
  color: #181818;
  font-size: 24px;
`;

const SuccessIcon = styled(Feather)`
  color: #008f57;
  margin-bottom: 5px;
`;

const SuccessMessage = styled(Text)`
  font-size: 16px;
  color: #181818;
`;

const UserNameText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #181818;
`;
const UserEmailText = styled(Text)`
  font-size: 12px;
  color: #a1a1a1;
`;

const UserDetailsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 8px;
  padding: 10px 5px;
`;

const UserInfoWrapper = styled(View)``;

const ActionWrapper = styled(TouchableOpacity)`
  padding: 5px;
`;

const UserWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const UserIcon = styled(Image)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

const ListItemWrap = styled(TouchableOpacity)`
  width: 100%;
  /* height: 50px; */
  background-color: #ebebeb;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;
const ListText = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
  color: #263238;
`;

function MyAccountBottomTab() {
  const dispatch = useDispatch({});
  const navigation = useNavigation();

  const { customer } = useSelector((state) => state.customer);

  const [activeTab, setActiveTab] = useState("LOG");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const { token } = useSelector((state) => state.login);
  const [isToken, setTokenFlag] = useState(token != null ? true : false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token != null) {
          setTokenFlag(true);
          await dispatch(fetchCustomer());
        } else setTokenFlag(false);
      } catch (error) {}
    };
    fetchData();
  }, [token]);

  const generateNewGuestId = async () => {
    const resultAction = await dispatch(getGuestCartId());
    if (getGuestCartId.fulfilled.match(resultAction)) {
      if (resultAction?.payload?.data)
        dispatch(setGuestCartId(resultAction?.payload?.data));
    } else {
      dispatch(setGuestCartId(null));
    }
  };
  const customerLogOut = async () => {
    try {
      await AsyncStorage.removeItem("CUSTOMER_TOKEN");
      await AsyncStorage.removeItem("CUSTOMER_CART_ID");
      dispatch(setCustomerCartId(null));
      dispatch(setToken(null));
      dispatch(setGuestCartId(null));
      dispatch(setCartEmpty());
      generateNewGuestId();
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeDrawer" }],
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // console.log("token==", token, isToken, customer);
  // const validationSchema = yup.object().shape({
  //   firstname: yup
  //     .string()
  //     .nullable()
  //     .min(3, "First name must be at least 3 characters")
  //     .required("First name is required"),
  //   lastname: yup.string().nullable().required("Last name is required"),
  //   email: yup
  //     .string()
  //     .nullable()
  //     .required("Email is required")
  //     .email("Please enter a valid email"),
  //   password: yup
  //     .string()
  //     .nullable()
  //     .required("Password is required")
  //     .min(6, "Password must be at least 8 characters long"),
  // });
  return (
    <Container>
      {!isToken ? (
        <>
          <TabWrapper>
            <TabButtonLog
              activeTab={activeTab}
              onPress={() => setActiveTab("LOG")}
            >
              <TabButtonText>Login</TabButtonText>
            </TabButtonLog>
            <TabButtonReg
              activeTab={activeTab}
              onPress={() => setActiveTab("REG")}
            >
              <TabButtonText>Register</TabButtonText>
            </TabButtonReg>
          </TabWrapper>
          {activeTab == "LOG" ? (
            <LoginFormWrapper
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <SignIn />
            </LoginFormWrapper>
          ) : (
            <RegisterFormWrapper
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <SignUp setActiveTab={setActiveTab} />
            </RegisterFormWrapper>
          )}
          <Modal
            transparent={true}
            visible={successModalVisible}
            onRequestClose={() => setSuccessModalVisible(false)}
          >
            <ModalContainerWrapper>
              <SuccessMessageContainer>
                <CloseIconWrapper>
                  <CloseIcon
                    name="closecircleo"
                    size={22}
                    onPress={() => setSuccessModalVisible(false)}
                  />
                </CloseIconWrapper>
                <SuccessIcon name="check-circle" size={36} />
                <SuccessMessage>
                  Your account created successfully.{" "}
                </SuccessMessage>
              </SuccessMessageContainer>
            </ModalContainerWrapper>
          </Modal>
        </>
      ) : (
        <>
          <UserDetailsWrapper>
            <UserWrapper>
              <UserIcon source={require("../assets/user-icon.png")} />
              <UserInfoWrapper>
                <UserNameText>
                  {customer?.lastname + " " + customer?.firstname}
                </UserNameText>
                <UserEmailText>{customer?.email}</UserEmailText>
              </UserInfoWrapper>
            </UserWrapper>
            <ActionWrapper onPress={() => navigation.navigate("MyAccount")}>
              <SettingsIcon name="setting" />
            </ActionWrapper>
          </UserDetailsWrapper>

          <ListItemWrap onPress={() => navigation.navigate("MyOrder")}>
            <FontAwesome name="folder-open" size={24} color="#263238" />
            <ListText>My Order</ListText>
          </ListItemWrap>
          <ListItemWrap onPress={() => navigation.navigate("Cart")}>
            <AntDesign name="shoppingcart" size={24} color="#263238" />
            <ListText>Cart</ListText>
          </ListItemWrap>
          <ListItemWrap onPress={customerLogOut}>
            <AntDesign name="logout" size={24} color="#263238" />
            <ListText>Logout</ListText>
          </ListItemWrap>
        </>
      )}
    </Container>
  );
}

export default MyAccountBottomTab;
