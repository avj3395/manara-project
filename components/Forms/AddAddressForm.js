import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker,
  ActivityIndicator,
} from "react-native";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { addBillingAddress } from "../../store/slices/CheckoutSlice";
import { updateCustomer } from "../../store/slices/customerSlice";
import {
  fetchCustomerBillingAddress,
  fetchCustomerShippingAddress,
} from "../../store/slices/customerSlice";
import _ from "lodash";
const Container = styled(View)`
  position: relative;
  flex: 1;
`;

const Title = styled(Text)`
  font-size: 17px;
  color: #263238;
  margin-bottom: 8px;
  font-family: "raleway-medium";
  text-align: left;
  font-weight: bold;
  margin-bottom: 15px;
`;
const Notification = styled(View)`
  background-color: #fffae7;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const NotificationInfo = styled(Text)`
  font-size: 13px;
  color: #263238;
  text-align: left;
  margin-left: 10px;
`;
const Textbox = styled(TextInput)`
  padding: 15px 10px;
  color: #546e7a;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.grey};
`;

const OptionLabel = styled(Text)`
  font-size: 12px;
  color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.textGrey};
`;

const Content = styled(View)``;

const OptionWrapper = styled(View)``;

const PickerWrapper = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.grey};
`;

const Option = styled(Picker)`
  width: 100%;
  height: 40px;
  font-size: 35px;
`;
const SwitchWrap = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const CustomLabel = styled(Text)`
  font-size: 16px;
  color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.black};
  margin-top: 25px;
  margin-bottom: 10px;
`;
const ErrorText = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
`;

function AddAddressForm({ setModalVisible, billing, shipping }) {
  const dispatch = useDispatch({});
  const navigation = useNavigation();

  const { customer, billingAddress, shippingAddress, status } = useSelector(
    (state) => state.customer
  );

  const [streetAddress, setStreetAddress] = useState("");

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    if (billing) {
      if (billingAddress.length != 0) {
        setBillingAddress();
      }
      if (billingAddress.default_billing == true) {
        setBillingAddress();
      }
    } else {
      if (shippingAddress.length != 0) {
        setShippingAddress();
      }
      if (shippingAddress.default_shipping == true) {
        setShippingAddress();
      }
    }
  });

  const setBillingAddress = () => {
    billingAddress.street.map((item) => {
      setStreetAddress(item);
    });
  };
  const setShippingAddress = () => {
    shippingAddress.street.map((item) => {
      setStreetAddress(item);
    });
  };
  // console.log("street====", streetAddress);
  const initialValues = {
    region: "",
    firstname: "",
    lastname: "",
    address1: "",
    city: "",
    state: "",
    postcode: "",
    number: "",
  };
  const initialValuesEdit = {
    region: "",
    firstname: billing ? billingAddress?.firstname : shippingAddress?.firstname,
    lastname: billing ? billingAddress?.lastname : shippingAddress?.lastname,
    address1: streetAddress,
    city: billing ? billingAddress?.city : shippingAddress?.city,
    state: billing
      ? billingAddress?.region?.region
      : shippingAddress?.region?.region,
    postcode: billing ? billingAddress?.postcode : shippingAddress?.postcode,
    number: billing ? billingAddress?.telephone : shippingAddress?.telephone,
  };
  const validationSchema = yup.object().shape({
    firstname: yup.string().nullable().required("First name is required"),
    lastname: yup.string().nullable().required("Last name is required"),
    address1: yup.string().nullable().required("Address is required"),
    city: yup.string().nullable().required("City is required"),
    state: yup.string().nullable().required("State is required"),
    postcode: yup.number().nullable().required("Post code is required"),
    number: yup.number().nullable().required("Mobile number is required"),
  });

  //console.log("data88888", existingAddress);
  const postAddress = async (value) => {
    // console.log("data", value);
    let data;
    let existingAddress = [];

    _.map(customer?.addresses, (item) => {
      // console.log("&&&&", item);
      const temp = {
        region: {
          region: item?.region?.region,
        },
        country_id: "AE",
        street: [item?.street[0]],
        telephone: item?.telephone,
        postcode: item?.postcode,
        city: item?.city,
        firstname: item?.firstname,
        lastname: item?.lastname,
        default_shipping: item?.default_shipping
          ? item?.default_shipping
          : false,
        default_billing: item?.default_billing ? item?.default_billing : false,
      };
      existingAddress.push(temp);
    });

    if (billing || shipping) {
      data = {
        data: {
          customer: {
            email: customer?.email,
            firstname: customer?.firstname,
            lastname: customer?.lastname,
            website_id: customer?.website_id,
            addresses: [
              ...existingAddress,
              {
                region: {
                  region: value?.state,
                },
                country_id: "AE",
                street: [value?.address1],
                telephone: value?.number,
                postcode: value?.postcode,
                city: value?.city,
                firstname: value?.firstname,
                lastname: value?.lastname,
                default_shipping: billing ? false : true,
                default_billing: billing ? true : false,
              },
            ],
          },
        },
      };
    } else {
      data = {
        data: {
          customer: {
            email: customer?.email,
            firstname: customer?.firstname,
            lastname: customer?.lastname,
            website_id: customer?.website_id,
            addresses: [
              ...existingAddress,
              {
                region: {
                  region: value?.state,
                },
                country_id: "AE",
                street: [value?.address1],
                telephone: value?.number,
                postcode: value?.postcode,
                city: value?.city,
                firstname: value?.firstname,
                lastname: value?.lastname,
                default_shipping: true,
                default_billing: true,
              },
            ],
          },
        },
      };
    }

    const resultAction = await dispatch(updateCustomer(data));
    if (updateCustomer.fulfilled.match(resultAction)) {
      if (billing || shipping) {
        await dispatch(fetchCustomerBillingAddress());
        await dispatch(fetchCustomerShippingAddress());
        navigation.navigate("MyAccount");
      } else {
        await dispatch(fetchCustomerBillingAddress());
        await dispatch(fetchCustomerShippingAddress());
        setModalVisible(false);
      }
    }
    // console.log("post data", data);
  };

  // console.log("post data", customer);
  return (
    <Container>
      {billing && <Title>Add new billing address</Title>}
      {shipping && <Title>Add new shipping address</Title>}
      {shipping == undefined && billing == undefined && (
        <Title>Add new shipping address</Title>
      )}

      {/* <Notification>
        <FontAwesome name="exclamation-triangle" size={15} color="#e8ac00" />
        <NotificationInfo>
          Sed sodales justo at felis tempor, at iaculis ipsum maximus. Nullam
          commodo tellus vitae nisl gravida cursus. Praesent feugiat et elit ut
          pellentesque.
        </NotificationInfo>
      </Notification> */}
      <Formik
        initialValues={billing || shipping ? initialValuesEdit : initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          // console.log("KKKKKK", values);
          postAddress(values);
        }}
      >
        {({
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
        }) => (
          <View>
            {/* <OptionWrapper>
              <OptionLabel>Choose your option</OptionLabel>
              <Option
                mode="dropdown"
                selectedValue={values.region}
                onValueChange={(itemValue) =>
                  setFieldValue("region", itemValue)
                }
              >
                <Option.Item label="United Arab Emirates" value="AE" />
              </Option>
              <PickerWrapper />
            </OptionWrapper> */}
            <Textbox
              onChangeText={handleChange("firstname")}
              value={values.firstname}
              placeholder="First Name"
            />
            {errors.firstname && touched.firstname ? (
              <ErrorText>{errors.firstname}</ErrorText>
            ) : null}
            <Textbox
              onChangeText={handleChange("lastname")}
              value={values.lastname}
              placeholder="Last Name"
            />
            {errors.lastname && touched.lastname ? (
              <ErrorText>{errors.lastname}</ErrorText>
            ) : null}
            <Textbox
              placeholder="Address Lane "
              onChangeText={handleChange("address1")}
              value={values.address1}
            />
            {errors.address1 && touched.address1 ? (
              <ErrorText>{errors.address1}</ErrorText>
            ) : null}
            {/* <Textbox
              placeholder="Address Lane 2"
              onChangeText={handleChange("address2")}
              value={values.address2}
            />
            <Textbox
              placeholder="Address Lane 3"
              onChangeText={handleChange("address3")}
              value={values.address3}
            /> */}
            {/* <Textbox
              placeholder="Landmark"
              onChangeText={handleChange("landmark")}
              value={values.landmark}
            /> */}
            <Textbox
              placeholder="City"
              onChangeText={handleChange("city")}
              value={values.city}
            />
            {errors.city && touched.city ? (
              <ErrorText>{errors.city}</ErrorText>
            ) : null}
            <Textbox
              placeholder="State"
              onChangeText={handleChange("state")}
              value={values.state}
            />
            {errors.state && touched.state ? (
              <ErrorText>{errors.state}</ErrorText>
            ) : null}
            <Textbox
              placeholder="Postal code"
              onChangeText={handleChange("postcode")}
              value={values.postcode}
            />
            {errors.postcode && touched.postcode ? (
              <ErrorText>{errors.postcode}</ErrorText>
            ) : null}
            <Textbox
              placeholder="Mobile Number"
              onChangeText={handleChange("number")}
              value={values.number}
            />
            {errors.number && touched.number ? (
              <ErrorText>{errors.number}</ErrorText>
            ) : null}
            {/* <SwitchWrap>
              <CustomLabel>Set as default shipping address</CustomLabel>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </SwitchWrap> */}

            <ButtonSubmit label="Save" onPress={handleSubmit} status={status} />
          </View>
        )}
      </Formik>
    </Container>
  );
}

export default AddAddressForm;
