import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  fetchPaymentMethod,
  paymentOrder,
  placeOrder,
} from "../store/slices/CheckoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styled, { css } from "styled-components/native";
import ProductViewTitle from "../components/ProductViewTitle/ProductViewTitle";
import PaymentMethodItems from "../components/PaymentMethodItems/PaymentMethodItems";
import ButtonSubmit from "../components/ButtonSubmit/ButtonSubmit";
import * as _ from "lodash";
import { setCartEmpty } from "../store/slices/cartSlice";
import {
  getCustomerCartId,
  setCustomerCartId,
} from "../store/slices/loginSlice";

const Container = styled(View)`
  flex: 1;
  padding: 50px 10px 0px 10px;
  background-color: #ffff;
`;

const FlatListWarp = styled(View)`
  padding: 15px;
  border: solid gray;
  border-radius: 15px;
  margin-bottom: 15px;
  background-color: #f0f0f0;
`;
const Title = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 5px;
  font-weight: bold;
`;

const BorderThin = styled(View)`
  height: 2px;
  background: #bfbfbf;
  margin-top: 5px;
`;

const ContentWarp = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 10px;
`;
const AddressWarp = styled(View)`
  padding: 15px;
`;

const ChangeAddressWarp = styled(TouchableOpacity)`
  margin-top: 10px;
  align-items: flex-end;
`;

const PaymentMethod = ({ route }) => {
  const dispatch = useDispatch({});
  const navigation = useNavigation();

  const shippingAddressId = route?.params?.shippingAddressId;
  const { paymentMethod, status } = useSelector((state) => state.checkout);
  const { customer } = useSelector((state) => state.customer);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [checkPaymentMethod, setCheckPaymentMethod] = useState("creditcard");
  const [shipping, setShipping] = useState("Flat Rate - Fixed");
  const [shippingMethod, setShippingMethod] = useState(
    route?.params?.shippingMethod ? route?.params?.shippingMethod : "flatrate"
  );
  let address = "";

  useEffect(() => {
    if (shippingAddressId) {
      address = _.find(customer?.addresses, {
        id: shippingAddressId,
      });
    } else {
      address = _.find(customer?.addresses, {
        default_shipping: true,
      });
    }

    setCustomerAddress(address);

    // console.log("456789", address);
    const fetchData = async () => {
      const data = {
        data: {
          addressInformation: {
            shipping_address: {
              region: address?.region?.region,
              country_id: "AE",
              street: [address?.street[0]],
              postcode: address?.postcode,
              city: address?.city,
              firstname: address?.firstname,
              lastname: address?.lastname,
              email: customer?.email,
              telephone: address?.telephone,
            },
            billing_address: {
              region: address?.region?.region,
              country_id: "AE",
              street: [address?.street[0]],
              postcode: address?.postcode,
              city: address?.city,
              firstname: address?.firstname,
              lastname: address?.lastname,
              email: customer?.email,
              telephone: address?.telephone,
            },
            shipping_carrier_code: shippingMethod,
            shipping_method_code: shippingMethod,
          },
        },
      };
      await dispatch(fetchPaymentMethod(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (route && route?.params?.shippingMethod) {
      setShipping(
        route?.params?.shippingMethod === "flatrate"
          ? "Flat Rate - Fixed"
          : "Free Shipping"
      );
    }
  }, [route]);

  // const backToCheckOut = () => {
  //   navigation.navigate("CheckoutPage", {
  //     customerAddress: customerAddress,
  //     checkPaymentMethod: checkPaymentMethod,
  //     shippingMethod: shipping,
  //   });
  // };

  const newCustomerCartId = async () => {
    const resultAction = await dispatch(getCustomerCartId());
    if (getCustomerCartId.fulfilled.match(resultAction))
      dispatch(setCustomerCartId(resultAction?.payload?.data));
  };

  const paymentGateway = async (orderId) => {
    const resultAction = await dispatch(paymentOrder({ orderId: orderId }));
    if (paymentOrder.fulfilled.match(resultAction)) {
      navigation.navigate("PaymentGateWay");
    }
  };

  const placeYourOrder = async () => {
    const data = {
      data: {
        paymentMethod: {
          method: checkPaymentMethod,
        },
        billing_address: {
          email: customer?.email,
          region: customerAddress?.region?.region,
          country_id: "AE",
          street: [customerAddress?.street[0]],
          postcode: customerAddress?.postcode,
          city: customerAddress?.city,
          telephone: customerAddress?.telephone,
          firstname: customerAddress?.firstname,
          lastname: customerAddress?.lastname,
        },
      },
    };
    // console.log("payment response", data);
    const resultAction = await dispatch(placeOrder(data));
    if (placeOrder.fulfilled.match(resultAction)) {
      // unwrapResult(resultAction);

      if (checkPaymentMethod === "creditcard") {
        // console.log(resultAction);
        const orderId = resultAction?.payload?.data;
        paymentGateway(orderId);
      } else {
        dispatch(setCartEmpty());
        newCustomerCartId();
        navigation.navigate("OrderConfirmed");
      }
    } else {
      navigation.navigate("OrderNotConfirmed");
    }
  };
  // console.log("payment response", paymentMethod);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductViewTitle titleLabel="Review & Payments" searchFlag={false} />
        <FlatListWarp>
          <Title>Payment Method</Title>
          {paymentMethod?.payment_methods?.map((item) => (
            <PaymentMethodItems
              item={item}
              key={"payment-" + item?.code}
              setCheckPaymentMethod={setCheckPaymentMethod}
              checkPaymentMethod={checkPaymentMethod}
            />
          ))}
          {/* <FlatList
            data={paymentMethod?.payment_methods}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => "payment-" + item?.code}
            renderItem={({ item }) => (
              <PaymentMethodItems
                item={item}
                setCheckPaymentMethod={setCheckPaymentMethod}
                checkPaymentMethod={checkPaymentMethod}
              />
            )}
          /> */}
        </FlatListWarp>
        <FlatListWarp>
          <Title>Order Summary</Title>
          <BorderThin />
          <ContentWarp>
            <Text>Cart Subtotal</Text>
            <Text>
              AED {paymentMethod?.totals?.base_subtotal_with_discount}
            </Text>
          </ContentWarp>
          <ContentWarp>
            <View>
              <Text>Shipping</Text>
              <Text>{shipping} </Text>
            </View>
            <Text>AED {paymentMethod?.totals?.shipping_incl_tax}</Text>
          </ContentWarp>
          <ContentWarp>
            <View>
              <Text>Tax</Text>
            </View>
            <Text>AED {paymentMethod?.totals?.tax_amount}</Text>
          </ContentWarp>
          <BorderThin />
          <ContentWarp>
            <Title>Order Total</Title>
            <Title>AED {paymentMethod?.totals?.grand_total} </Title>
          </ContentWarp>
          <Text>{paymentMethod?.totals?.items.length} ITEMS IN CART</Text>
        </FlatListWarp>
        <View>
          <Title>Ship To:</Title>
          <BorderThin />
          <AddressWarp>
            {customerAddress ? (
              <View>
                <Text>
                  {customerAddress?.firstname} {customerAddress?.lastname}
                </Text>
                <Text>{customerAddress?.street[0]}</Text>
                <Text>
                  {customerAddress?.city}, {customerAddress?.region?.region}
                </Text>
                <Text>United Arab Emirates</Text>
                <Text>{customerAddress?.telephone} </Text>
                <ChangeAddressWarp
                  onPress={() => {
                    navigation.navigate("ShippingAddress");
                  }}
                >
                  <Text style={{ color: "#5cb85c" }}>Change Address</Text>
                </ChangeAddressWarp>
              </View>
            ) : (
              <Text>No Address Found</Text>
            )}
          </AddressWarp>
        </View>
        <View>
          <Title>Shipping Method</Title>
          <BorderThin />
          <AddressWarp>
            <Text>{shipping} </Text>
          </AddressWarp>
        </View>
      </ScrollView>
      <ButtonSubmit
        label="Place Order"
        onPress={placeYourOrder}
        status={status}
      />
    </Container>
  );
};

export default PaymentMethod;
