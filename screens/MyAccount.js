import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as _ from "lodash";
import {
  fetchCustomerBillingAddress,
  fetchCustomerShippingAddress,
} from "../store/slices/customerSlice";

const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 10px;
  background-color: #ffff;
`;

const InformationContainer = styled(View)`
  border: solid gray;
  border-radius: 10px;
  margin-top: 10px;
`;

const ContainerTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;
const ContainerHeader = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;

const InnerText = styled(Text)`
  margin-bottom: 10px;
  color: #8c8c8c;
`;

const ButtonText = styled(Text)`
  margin-right: 10px;
  color: #008f57;
`;

const MyAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch({});

  const { customer, billingAddress, shippingAddress, status } = useSelector(
    (state) => state.customer
  );
  const [customerBillingAddress, setCustomerBillingAddress] = useState(null);
  const [customerShippingAddress, setCustomerShippingAddress] = useState(null);
  let billingStreet = "";
  useEffect(() => {
    const getAddress = async () => {
      await dispatch(fetchCustomerBillingAddress());
      await dispatch(fetchCustomerShippingAddress());
    };
    getAddress();

    // billingStreet = billingAddress?.street[0];
  }, []);

  // console.log("customer", customer, billingAddress, shippingAddress);
  return (
    <Container>
      <ProductViewTitle titleLabel="My Account" searchFlag={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 15 }}>
          <ContainerTitle>Account Information</ContainerTitle>
          <InformationContainer>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 10,
                paddingBottom: 15,
                backgroundColor: "#f0f0f0",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <ContainerHeader>CONTACT INFORMATION</ContainerHeader>
            </View>
            <View
              style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}
            >
              <InnerText>
                {customer?.firstname} {customer?.lastname}
              </InnerText>
              <InnerText>{customer?.email}</InnerText>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
                paddingLeft: 10,
                paddingBottom: 15,
                backgroundColor: "#f0f0f0",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <ButtonText>Edit</ButtonText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProfile", { changePassword: true });
                }}
              >
                <ButtonText>Change Password</ButtonText>
              </TouchableOpacity>
            </View>
          </InformationContainer>
        </View>
        <View style={{ paddingTop: 15 }}>
          <ContainerTitle>Address Book</ContainerTitle>
          <InformationContainer>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 10,
                paddingBottom: 15,
                backgroundColor: "#f0f0f0",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <ContainerHeader>DEFAULT BILLING ADDRESS</ContainerHeader>
            </View>
            <View
              style={{ paddingTop: 20, paddingLeft: 10, paddingBottom: 15 }}
            >
              {billingAddress?.default_billing == true && (
                <View>
                  <InnerText>
                    {billingAddress?.firstname} {billingAddress?.lastname}
                  </InnerText>
                  <InnerText>{billingAddress?.street[0]}</InnerText>
                  <InnerText>
                    {billingAddress?.city}, {billingAddress?.region?.region},{" "}
                    {billingAddress?.postcode}
                  </InnerText>
                  <InnerText>United Arab Emirates</InnerText>
                  <InnerText>T: {billingAddress?.telephone}</InnerText>
                </View>
              )}
              {billingAddress?.length < 1 && (
                <InnerText>No Address Found</InnerText>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
                paddingLeft: 10,
                paddingBottom: 15,
                backgroundColor: "#f0f0f0",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditAddress", { billing: true });
                }}
              >
                {billingAddress?.default_billing == true && (
                  <ButtonText>Edit Address</ButtonText>
                )}
                {billingAddress?.length < 1 && (
                  <ButtonText>Add Address</ButtonText>
                )}
              </TouchableOpacity>
            </View>
          </InformationContainer>
          <InformationContainer>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 10,
                paddingBottom: 15,
                backgroundColor: "#f0f0f0",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <ContainerHeader>DEFAULT SHIPPING ADDRESS</ContainerHeader>
            </View>
            <View
              style={{ paddingTop: 20, paddingLeft: 10, paddingBottom: 15 }}
            >
              {shippingAddress?.default_shipping == true && (
                <View>
                  <InnerText>
                    {shippingAddress?.firstname}
                    {shippingAddress?.lastname}
                  </InnerText>
                  <InnerText>{shippingAddress?.street[0]}</InnerText>
                  <InnerText>
                    {shippingAddress?.city},{shippingAddress?.region?.region},
                    {shippingAddress?.postcode}
                  </InnerText>
                  <InnerText>United Arab Emirates</InnerText>
                  <InnerText>T: {shippingAddress?.telephone}</InnerText>
                </View>
              )}
              {shippingAddress?.length < 1 && (
                <InnerText>No Address Found</InnerText>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
                paddingLeft: 10,
                paddingBottom: 15,
                backgroundColor: "#f0f0f0",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditAddress", { shipping: true });
                }}
              >
                {shippingAddress?.default_shipping == true && (
                  <ButtonText>Edit Address</ButtonText>
                )}
                {shippingAddress?.length < 1 && (
                  <ButtonText>Add Address</ButtonText>
                )}
              </TouchableOpacity>
            </View>
          </InformationContainer>
        </View>
      </ScrollView>
    </Container>
  );
};

export default MyAccount;
