import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  setCustomerCartId,
  setGuestCartId,
  setToken,
} from "../store/slices/loginSlice";
import { getGuestCartId, setCartEmpty } from "../store/slices/cartSlice";
import { fetchCustomer } from "../store/slices/customerSlice";

export function DrawerContent(props) {
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch({});
  const { token } = useSelector((state) => state.login);
  const [isToken, setTokenFlag] = useState(token != null ? true : false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token != null) {
          setTokenFlag(true);
          await dispatch(fetchCustomer());
        } else setTokenFlag(false);
      } catch (error) {}
    };
    fetchData();
  }, [token]);
  const generateNewGuestId = async () => {
    const resultAction = await dispatch(getGuestCartId());
    if (getGuestCartId.fulfilled.match(resultAction)) {
      if (resultAction?.payload?.data)
        dispatch(setGuestCartId(resultAction?.payload?.data));
    } else {
      dispatch(setGuestCartId(null));
    }
  };
  const customerLogOut = async () => {
    try {
      await AsyncStorage.removeItem("CUSTOMER_TOKEN");
      await AsyncStorage.removeItem("CUSTOMER_CART_ID");
      dispatch(setCustomerCartId(null));
      dispatch(setToken(null));
      dispatch(setGuestCartId(null));
      dispatch(setCartEmpty());
      generateNewGuestId();
      props.navigation.reset({
        index: 0,
        routes: [{ name: "HomeDrawer" }],
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            {isToken && (
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={require("../assets/user-icon.png")}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>
                    {customer?.firstname} {customer?.lastname}{" "}
                  </Title>
                  <Caption style={styles.caption}>{customer?.email}</Caption>
                </View>
              </View>
            )}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="view-grid" color={color} size={size} />
              )}
              label="All Categories"
              onPress={() => {
                props.navigation.navigate("Search");
              }}
            />
            {isToken === false && (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ticket-percent" color={color} size={size} />
                )}
                label="Login"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate("Login");
                }}
              />
            )}
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            {isToken && (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="folder-download" color={color} size={size} />
                )}
                label="My Order"
                onPress={() => {
                  props.navigation.navigate("MyOrder");
                }}
              />
            )}
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="ticket" color={color} size={size} />
              )}
              label="My Coupons"
              onPress={() => {}}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cart" color={color} size={size} />
              )}
              label="My Cart"
              onPress={() => {
                props.navigation.navigate("Cart");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cards-heart" color={color} size={size} />
              )}
              label="My Wishlist"
              onPress={() => {}}
            /> */}
            {isToken && (
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-outline" color={color} size={size} />
                )}
                label="My Account"
                onPress={() => {
                  props.navigation.navigate("MyAccount");
                }}
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {isToken && (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={customerLogOut}
          />
        </Drawer.Section>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
