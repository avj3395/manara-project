import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import ShippingAddressBook from "../components/ShippingAddressBook/ShippingAddressBook";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from "../store/slices/customerSlice";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";

const Container = styled(View)`
  flex: 1;
  padding: 50px 0px 0px 0px;
  background-color: #f2f2f2;
`;
function ShippingAddress() {
  const dispatch = useDispatch({});
  const { customer } = useSelector((state) => state.customer);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(fetchCustomer());
  //   };
  //   fetchData();
  // }, []);

  //console.log("*************", customer);
  return (
    <Container>
      <ProductViewTitle titleLabel="Shipping Address" searchFlag={false} />

      <ShippingAddressBook customersDetails={customer} />
    </Container>
  );
}

export default ShippingAddress;
