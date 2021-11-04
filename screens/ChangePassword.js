import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { ref } from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  padding: 0 35px 0 15px;
  border-radius: 8px;
`;

const InputFieldWrapper = styled(View)``;

const EyeIcon = styled(MaterialCommunityIcons)``;

const EyeButtonWrapper = styled(TouchableOpacity)`
  position: absolute;
  right: 0;
  height: 100%;
  padding: 0 5px;
  justify-content: center;
`;

function ChangePassword() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrent, setShowCurrent] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const validationSchema = yup.object().shape({
    currentpassword: yup
      .string()
      .nullable()
      .min(8, "Password must be at least 8 characters long")
      .required("Current password is required"),
    newpassword: yup
      .string()
      .nullable()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmpassword: yup
      .string()
      .nullable()
      .required("Confirm password is required")
      .min(8, "Password must be at least 8 characters long")
      .oneOf([ref("newpassword")], "Passwords does not match"),
  });

  return (
    <Container>
      <ScreenTitleWrapper>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={32} color="#546e7a" />
        </BackButton>
        <ScreenTitle>Change Password</ScreenTitle>
      </ScreenTitleWrapper>
      <FormWrapper>
        <Formik
          initialValues={{
            currentpassword: "",
            newpassword: "",
            confirmpassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
            console.log("Values", values);
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
              <FormLabelText>Current password</FormLabelText>
              <InputFieldWrapper>
                <InputFields
                  onChangeText={handleChange("currentpassword")}
                  onBlur={handleBlur("currentpassword")}
                  value={values.currentpassword}
                  secureTextEntry={showCurrent}
                />
                <EyeButtonWrapper onPress={() => setShowCurrent(!showCurrent)}>
                  <EyeIcon
                    name={showCurrent ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#404040"
                  />
                </EyeButtonWrapper>
              </InputFieldWrapper>
              {errors.currentpassword && touched.currentpassword ? (
                <ErrorText>{errors.currentpassword}</ErrorText>
              ) : null}
              <Spacer />
              <FormLabelText>New password</FormLabelText>
              <InputFieldWrapper>
                <InputFields
                  onChangeText={handleChange("newpassword")}
                  onBlur={handleBlur("newpassword")}
                  value={values.newpassword}
                  secureTextEntry={showNew}
                />
                <EyeButtonWrapper onPress={() => setShowNew(!showNew)}>
                  <EyeIcon
                    name={showNew ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#404040"
                  />
                </EyeButtonWrapper>
              </InputFieldWrapper>
              {errors.newpassword && touched.newpassword ? (
                <ErrorText>{errors.newpassword}</ErrorText>
              ) : null}
              <Spacer />
              <FormLabelText>Confirm password</FormLabelText>
              <InputFieldWrapper>
                <InputFields
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                  secureTextEntry={showConfirm}
                />
                <EyeButtonWrapper onPress={() => setShowConfirm(!showConfirm)}>
                  <EyeIcon
                    name={showConfirm ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#404040"
                  />
                </EyeButtonWrapper>
              </InputFieldWrapper>
              {errors.confirmpassword && touched.confirmpassword ? (
                <ErrorText>{errors.confirmpassword}</ErrorText>
              ) : null}
              <Spacer />

              <Spacer30 />
              <Button onPress={handleSubmit}>
                <ButtonText>Save</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  );
}

export default ChangePassword;
