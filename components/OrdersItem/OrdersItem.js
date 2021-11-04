import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import _ from "lodash";
import moment from "moment";

const OrderDataTitle = styled(Text)`
  font-size: 14px;
  color: #546e7a;
  font-weight: bold;
  margin-bottom: 3px;
`;
const OrderDataText = styled(Text)`
  font-size: 14px;
  color: #000;
  margin-bottom: 5px;
`;
const OrderAmountText = styled(Text)`
  font-size: 16px;
  color: #008f57;
  font-weight: bold;
`;

const BasicDetailsRow = styled(View)`
  justify-content: space-between;
  flex-direction: row;
`;

const OrderIdWrapper = styled(View)``;

const OrderTotalWrapper = styled(View)`
  min-width: 80px;
`;

const Spacer3 = styled(View)`
  height: 3px;
`;

const Spacer5 = styled(View)`
  height: 5px;
`;

const Divider = styled(View)`
  background-color: #d3d3d3;
  height: 1px;
`;

function OrdersItem({ item }) {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 25,
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <BasicDetailsRow>
        <OrderIdWrapper>
          <OrderDataTitle>Order Id</OrderDataTitle>
          <OrderDataText>#{item?.increment_id}</OrderDataText>
        </OrderIdWrapper>
        <OrderTotalWrapper>
          <OrderDataTitle>Total</OrderDataTitle>
          <OrderAmountText>
            {item?.base_currency_code} {item?.grand_total}
          </OrderAmountText>
        </OrderTotalWrapper>
      </BasicDetailsRow>
      {/* <Divider /> */}
      <Spacer5 />
      <OrderDataTitle>Shipping address</OrderDataTitle>
      <Spacer3 />
      <OrderDataText>
        {/* {
          item?.extension_attributes?.shipping_assignments[0]?.shipping?.address
            ?.region_code
        } */}
        {item?.extension_attributes?.shipping_assignments[0].length > 0 ||
        item?.extension_attributes?.shipping_assignments[0]?.shipping?.address
          ?.street
          ? _.join(
              item?.extension_attributes?.shipping_assignments[0]?.shipping
                ?.address?.street,
              ","
            )
          : ""}
      </OrderDataText>
      <Divider />
      <Spacer5 />

      <BasicDetailsRow>
        <OrderIdWrapper>
          <OrderDataTitle>Order date</OrderDataTitle>
          <OrderDataText>
            {item?.created_at && moment(item?.created_at).isValid
              ? moment(item?.created_at).format("DD-MMM-YYYY")
              : ""}
          </OrderDataText>
        </OrderIdWrapper>
        <OrderTotalWrapper>
          <OrderDataTitle>Status</OrderDataTitle>
          <OrderDataText>{item?.status}</OrderDataText>
        </OrderTotalWrapper>
      </BasicDetailsRow>
    </View>
  );
}

export default OrdersItem;
