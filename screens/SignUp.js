import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
  Platform,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addNewCustomer } from "../store/slices/customerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
  margin-bottom: 30;
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
  height: 15px;
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
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

const FormLabelText = styled(Text)`
  color: #181818;
  margin-bottom: 8px;
`;

const ErrorText = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
`;

const ErrorTextApi = styled(Text)`
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

const ModalContainerWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const SuccessMessageContainer = styled(View)`
  padding: 20px 15px;
  background-color: #fff;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const SuccessMessage = styled(Text)`
  font-size: 16px;
  color: #181818;
`;

const SuccessIcon = styled(Feather)`
  color: #008f57;
  margin-bottom: 5px;
`;

const CloseIcon = styled(AntDesign)`
  color: #181818;
`;

const CloseIconWrapper = styled(TouchableOpacity)`
  padding: 5px;
  position: absolute;
  top: 5px;
  right: 5px;
`;
const BackButton = styled(View)`
  padding: 10px 20px;
`;
function SignUp({ setActiveTab }) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { status } = useSelector((state) => state.customer);
  const [errorMessage, setErrorMessage] = useState("");
  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .nullable()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastname: yup.string().nullable().required("Last name is required"),
    email: yup
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

  const tostMessage = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show(
        "Successfully registered ! Please login... ",
        ToastAndroid.LONG
      );
    } else {
      AlertIOS.alert("Successfully registered ! Please login... ");
    }
  };

  const newCustomerAdded = async (
    data,
    { setErrors, setSubmitting, resetForm }
  ) => {
    const payload = {
      customer: {
        lastname: data?.lastname,
        firstname: data?.firstname,
        email: data?.email,
      },
      password: data?.password,
    };
    const resultAction = await dispatch(addNewCustomer(payload));
    if (addNewCustomer.fulfilled.match(resultAction)) {
      unwrapResult(resultAction);
      resetForm();
      setSubmitting(false);
      // setSuccessModalVisible(true);
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Login" }],
      // });
      tostMessage();
      setActiveTab("LOG");
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
        {/* {status === "loading" && (
          <LoadingWrapper>
            <ActivityIndicator size="large" color="#008f57" />
          </LoadingWrapper>
        )} */}
        <LogoWrapper>
          <Logo source={require("../assets/icon.png")} />
        </LogoWrapper>
        <Spacer />
        <TitleText>Create Account</TitleText>
        <Spacer />
        <FormWrapper>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
                newCustomerAdded(values, {
                  setErrors,
                  setSubmitting,
                  resetForm,
                });
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
                  <FormLabelText>First name</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                    value={values.firstname}
                  />
                  {errors.firstname && touched.firstname ? (
                    <ErrorText>{errors.firstname}</ErrorText>
                  ) : null}
                  <Spacer />
                  <FormLabelText>Last name</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    value={values.lastname}
                  />
                  {errors.lastname && touched.lastname ? (
                    <ErrorText>{errors.lastname}</ErrorText>
                  ) : null}
                  <Spacer />
                  <FormLabelText>Email</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email ? (
                    <ErrorText>{errors.email}</ErrorText>
                  ) : null}
                  <Spacer />
                  <FormLabelText>Password</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password ? (
                    <ErrorText>{errors.password}</ErrorText>
                  ) : null}
                  {/* <Spacer />
              <FormLabelText>Confirm password</FormLabelText>
              <InputFields secureTextEntry={true} /> */}
                  <ErrorTextApi>{errorMessage}</ErrorTextApi>
                  <Spacer30 />
                  <Button onPress={handleSubmit}>
                    {status == "loading" ? (
                      <ActivityIndicator size="large" color="#fff" />
                    ) : (
                      <ButtonText>Sign Up</ButtonText>
                    )}
                  </Button>
                </>
              )}
            </Formik>
          </ScrollView>
        </FormWrapper>
        {/* <Modal
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
        </Modal> */}
      </InnerContainer>
    </Container>
  );
}

export default SignUp;
