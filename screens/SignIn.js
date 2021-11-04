import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  customerLogin,
  getCustomerCartId,
  setGuestCartId,
} from "../store/slices/loginSlice";
import { fetchCustomer } from "../store/slices/customerSlice";
import { useNavigation } from "@react-navigation/native";
import {
  fetchCart,
  putGuestCartToCustomerCart,
} from "../store/slices/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
`;
const InnerContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled(View)`
  overflow: hidden;
  border-radius: 15px;
`;

const Logo = styled(Image)`
  height: 75px;
  width: 75px;
`;

const Spacer = styled(View)`
  height: 20px;
`;
const Spacer30 = styled(View)`
  height: 30px;
`;

const TitleText = styled(Text)`
  font-size: 18px;
  color: #181818;
`;

const FormWrapper = styled(View)`
  width: 100%;
  padding: 0 20px;
`;

const GuestWrapper = styled(View)`
  width: 100%;
  padding: 0 20px;
  margin-top: 10px;
`;

const InputFields = styled(TextInput)`
  border: 1px solid #808080;
  height: 40px;
  padding: 0 15px;
  border-radius: 8px;
`;

const Button = styled(TouchableOpacity)`
  background-color: #008f57;
  padding: 10px 15px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

const BottomLinksWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;

const BottomLinkWrapper = styled(TouchableOpacity)`
  padding: 5px 5px 5px 5px;
`;

const BottomLinkText = styled(Text)`
  color: #008f57;
`;

const ButtonWarp = styled(TouchableOpacity)`
  background-color: #fff;
  border-color: #5cb85c;
  border-width: 1px;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const ButtonLabel = styled(Text)`
  color: #5cb85c;
`;

const ErrorText = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
`;

const LoadingWrapper = styled(View)`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 100;
`;
const BackButton = styled(View)`
  padding: 10px 20px;
`;
function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { cart } = useSelector((state) => state.cart);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .nullable()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .nullable()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters long"),
  });

  const setValues = () => {
    dispatch(setGuestCartId(null));
    dispatch(fetchCart());
  };
  const putItemsToCart = async (storeId, customerId) => {
    const resultAction = await dispatch(
      putGuestCartToCustomerCart({
        customerId: customerId,
        storeId: 1,
        // storeId: storeId,
      })
    );
    if (putGuestCartToCustomerCart.fulfilled.match(resultAction))
      generateCustomerCartId();
    setValues();
  };
  const getCustomerProfile = async (customerCart) => {
    const resultAction = await dispatch(fetchCustomer({}));
    if (fetchCustomer.fulfilled.match(resultAction))
      putItemsToCart(customerCart, resultAction?.payload?.data?.id);
    else setValues();
  };
  const generateCustomerCartId = async () => {
    const resultAction = await dispatch(getCustomerCartId());
    // console.log("result===", resultAction);
    if (getCustomerCartId.fulfilled.match(resultAction)) {
      // console.log("generat CUSTOMER CARTID", resultAction?.payload?.data);
      if (cart?.length > 0) getCustomerProfile(resultAction?.payload?.data);
      else setValues();
    } else {
    }
  };
  const customerSignIn = async (
    data,
    { setErrors, setSubmitting, resetForm }
  ) => {
    setErrorMessage("");
    const payload = {
      username: data?.username,
      password: data?.password,
    };
    const resultAction = await dispatch(customerLogin(payload));
    if (customerLogin.fulfilled.match(resultAction)) {
      generateCustomerCartId();
      unwrapResult(resultAction);
      resetForm();
      setSubmitting(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeDrawer" }],
      });
    } else {
      setSubmitting(false);
      setErrorMessage(resultAction?.payload?.message);
      //   setErrors(resultAction?.payload?.errors);
    }
  };
  return (
    <Container>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackButton>
          <Ionicons name="ios-arrow-back" size={30} color="#546e7a" />
        </BackButton>
      </TouchableOpacity> */}
      <InnerContainer>
        <LogoWrapper>
          <Logo source={require("../assets/icon.png")} />
        </LogoWrapper>
        <Spacer />
        {/* <TitleText>Returning Customer</TitleText> */}
        <Spacer />
        <FormWrapper>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
              customerSignIn(values, { setErrors, setSubmitting, resetForm });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              isSubmitting,
              errors,
              touched,
            }) => (
              <>
                <InputFields
                  placeholder="Email"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  keyboardType="email-address"
                />
                {errors.username && touched.username ? (
                  <ErrorText>{errors.username}</ErrorText>
                ) : null}
                <Spacer />
                <InputFields
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <ErrorText>{errors.password}</ErrorText>
                ) : null}
                <ErrorText>{errorMessage}</ErrorText>
                <Spacer30 />
                {isSubmitting ? (
                  <ActivityIndicator size="large" color="#008f57" />
                ) : (
                  <Button onPress={handleSubmit}>
                    <ButtonText>Sign In</ButtonText>
                  </Button>
                )}
              </>
            )}
          </Formik>
          {/* <ButtonWarp onPress={() => navigation.navigate("SignUp")}>
            <ButtonLabel>Create account</ButtonLabel>
          </ButtonWarp> */}
        </FormWrapper>
        <Spacer />

        {/* <BottomLinkText>Create account</BottomLinkText> */}

        {/* <BottomLinkWrapper>
          <BottomLinkText>Forgot password</BottomLinkText>
        </BottomLinkWrapper> */}

        {/* <GuestWrapper>
        <Button onPress={() => navigation.navigate("HomePage")}>
          <ButtonText>Login as guest</ButtonText>
        </Button>
      </GuestWrapper> */}
      </InnerContainer>
    </Container>
  );
}

export default SignIn;
