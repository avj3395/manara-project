import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGuestCartId, setCartEmpty } from "../../store/slices/cartSlice";
import {
  setCustomerCartId,
  setGuestCartId,
  setToken,
} from "../../store/slices/loginSlice";
import { updatePassword } from "../../store/slices/customerSlice";
import { showSuccessToastWithColor } from "../../constants/Utils";

const FormWrapper = styled(View)`
  width: 100%;
  padding: 0 20px;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

const FormLabelText = styled(Text)`
  color: #181818;
  margin-bottom: 8px;
  font-size: 14px;
`;

const ErrorText = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
`;

const Spacer = styled(View)`
  height: 15px;
`;

const Spacer30 = styled(View)`
  height: 30px;
`;
const Spacer20 = styled(View)`
  height: 20px;
`;

const ErrorTextApi = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
`;

const Button = styled(TouchableOpacity)`
  background-color: #008f57;
  padding: 10px 15px;
  border-radius: 8px;
  align-items: center;
`;

const InputFields = styled(TextInput)`
  border: 1px solid #808080;
  height: 40px;
  padding: 0 15px;
  border-radius: 8px;
`;

const Content = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: #8c8c8c;
  margin-bottom: 5px;
`;

const ChangeEmailTitle = styled(Text)`
  font-size: 16px;
  color: #008f57;
  margin-bottom: 8px;
`;
const EditPasswordForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch({});
  const [errorMessage, setErrorMessage] = useState("");

  const { status } = useSelector((state) => state.customer);
  const generateNewGuestId = async () => {
    const resultAction = await dispatch(getGuestCartId());
    if (getGuestCartId.fulfilled.match(resultAction)) {
      if (resultAction?.payload?.data)
        dispatch(setGuestCartId(resultAction?.payload?.data));
    } else {
      dispatch(setGuestCartId(null));
    }
  };

  const updateCustomerPassword = async (values) => {
    // console.log("function arg", values);
    const data = {
      currentPassword: values?.current_password,
      newPassword: values?.new_password,
    };

    const resultAction = await dispatch(updatePassword(data));
    if (updatePassword.fulfilled.match(resultAction)) {
      showSuccessToastWithColor("Password Updated !");
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
    } else {
      setErrorMessage(resultAction?.payload?.message);
      //   setErrors(resultAction?.payload?.errors);
    }
  };

  const validationSchema = yup.object().shape({
    current_password: yup.string().required("Password is required"),

    new_password: yup.string().required("New Password is required"),

    confirm_new_password: yup.string().when("new_password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("new_password")], "Both password need to be the same"),
    }),
  });
  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormWrapper>
          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_new_password: "",
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
              updateCustomerPassword(values);

              // console.log("Values", values);
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
                <View>
                  <ChangeEmailTitle>CHANGE PASSWORD</ChangeEmailTitle>

                  <FormLabelText>Current Password</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("current_password")}
                    onBlur={handleBlur("current_password")}
                    value={values.current_password}
                    secureTextEntry={true}
                  />
                  {errors.current_password && touched.current_password ? (
                    <ErrorText>{errors.current_password}</ErrorText>
                  ) : null}
                  <Spacer />
                  <FormLabelText>New Password</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("new_password")}
                    onBlur={handleBlur("new_password")}
                    value={values.new_password}
                    secureTextEntry={true}
                  />
                  {errors.new_password && touched.new_password ? (
                    <ErrorText>{errors.new_password}</ErrorText>
                  ) : null}
                  <Spacer />
                  <FormLabelText>Confirm New Password</FormLabelText>
                  <InputFields
                    onChangeText={handleChange("confirm_new_password")}
                    onBlur={handleBlur("confirm_new_password")}
                    value={values.confirm_new_password}
                    secureTextEntry={true}
                  />
                  {errors.confirm_new_password &&
                  touched.confirm_new_password ? (
                    <ErrorText>{errors.confirm_new_password}</ErrorText>
                  ) : null}
                  <Spacer />
                  <ErrorText>{errorMessage}</ErrorText>
                </View>

                <Button onPress={handleSubmit}>
                  {status == "loading" ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <ButtonText>Save</ButtonText>
                  )}
                </Button>
              </>
            )}
          </Formik>
        </FormWrapper>
      </ScrollView>
    </View>
  );
};

export default EditPasswordForm;
