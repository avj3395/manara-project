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
import { updateCustomer } from "../../store/slices/customerSlice";
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

const EditProfileForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch({});
  const [errorMessage, setErrorMessage] = useState("");

  const { customer, status } = useSelector((state) => state.customer);

  const validationSchema = yup.object().shape({
    firstname: yup.string().nullable().required("First name is required"),
    lastname: yup.string().nullable().required("Last name is required"),

    email: yup
      .string()
      .nullable()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  const editProfile = async (value) => {
    const data = {
      data: {
        customer: {
          id: customer?.id,
          email: value?.email,
          firstname: value?.firstname,
          lastname: value?.lastname,
          websiteId: customer?.website_id,
        },
      },
    };
    // console.log("Values", data);
    const resultAction = await dispatch(updateCustomer(data));
    if (updateCustomer.fulfilled.match(resultAction)) {
      navigation.navigate("MyAccount");
    } else {
      setErrorMessage(resultAction?.payload?.message);
      //   setErrors(resultAction?.payload?.errors);
    }
  };

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormWrapper>
          <Formik
            initialValues={{
              firstname: customer?.firstname,
              lastname: customer?.lastname,
              email: customer?.email,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
              editProfile(values);
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

                <Spacer20 />

                <View>
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
                </View>
                <ErrorText>{errorMessage}</ErrorText>
                <Spacer20 />
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

export default EditProfileForm;
