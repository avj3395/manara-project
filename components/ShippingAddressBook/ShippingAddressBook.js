import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import CustomModal from "../CustomModal/CustomModal";
import Modal from "react-native-modal";
import AddAddressForm from "../Forms/AddAddressForm";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import {
  updateCustomer,
  fetchCustomer,
  fetchCustomerBillingAddress,
  fetchCustomerShippingAddress,
} from "../../store/slices/customerSlice";
import ShippingItems from "../ShippingItems/ShippingItems";

const { width } = Dimensions.get("window");
const itemWidth = width - 80;
const Container = styled(View)`
  position: relative;
  overflow: hidden;
  flex: 1;
`;
const LinkWrap = styled(View)`
  position: relative;
  overflow: hidden;
  margin-bottom: 25px;
  background-color: #fff;
`;
const LinkItem = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-left: 10px;
  margin-right: 7px;
  padding: 12px 15px;
  border-radius: 5px;
`;

const LinkLabel = styled(Text)`
  position: relative;
  font-size: 16px;
  color: #028444;
`;
const AddressContainer = styled(View)`
  position: relative;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 15px 10px;
  margin-bottom: 25px;
`;
const AddressData = styled(View)`
  padding: 0 10px;
`;
const NameLabel = styled(Text)`
  position: relative;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;
const AddressLabel = styled(Text)`
  position: relative;
  font-size: 14px;
  color: #7f7f7f;
`;

function ShippingAddressBook({ customersDetails }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const { customer, status } = useSelector((state) => state.customer);

  const navigation = useNavigation();
  const dispatch = useDispatch({});

  const createButtonAlert = (itemId) =>
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel button pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteShippingAddress(itemId) },
      ]
    );

  const deleteShippingAddress = async (itemId) => {
    // console.log("delete address", itemId);

    let filterAddress = [];
    let data;
    _.map(customer?.addresses, (item) => {
      if (item?.id != itemId) {
        filterAddress.push(item);
      }
    });
    data = {
      data: {
        customer: {
          email: customer?.email,
          firstname: customer?.firstname,
          lastname: customer?.lastname,
          website_id: customer?.website_id,
          addresses: [...filterAddress],
        },
      },
    };
    // console.log("balance address", data);
    const resultAction = await dispatch(updateCustomer(data));
    if (updateCustomer.fulfilled.match(resultAction)) {
      await dispatch(fetchCustomer());
      await dispatch(fetchCustomerBillingAddress());
      await dispatch(fetchCustomerShippingAddress());
    }
  };

  const gotoShippingMethod = () => {
    navigation.navigate("ShippingMethod", { addressId: checked });
  };
  // console.log("address", customersDetails?.addresses);
  return (
    <Container>
      <LinkWrap>
        <LinkItem
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <LinkLabel>+ Add new shipping address</LinkLabel>
        </LinkItem>
      </LinkWrap>
      {status === "loading" && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#008f57" />
        </View>
      )}
      {customersDetails?.addresses?.length < 1 && status == "succeeded" && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FontAwesome5 name="address-card" size={100} color="#d9d9d9" />
          <Text style={{ color: "#8c8c8c" }}>Address Not Found !</Text>
        </View>
      )}
      {customersDetails?.addresses?.length > 0 && status == "succeeded" && (
        <FlatList
          data={customersDetails?.addresses}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => "details-" + item.id}
          renderItem={({ item }) => (
            <ShippingItems
              item={item}
              setChecked={setChecked}
              checked={checked}
              createButtonAlert={createButtonAlert}
            />
          )}
        />
      )}
      {customersDetails?.addresses?.length > 0 && (
        <ButtonSubmit label="Continue" onPress={gotoShippingMethod} />
      )}
      <CustomModal
        popupTitle="Customize"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <AddAddressForm setModalVisible={setModalVisible} />
      </CustomModal>
    </Container>
  );
}

export default ShippingAddressBook;
