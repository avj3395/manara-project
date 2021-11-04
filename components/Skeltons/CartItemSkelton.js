import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
function CartItemSkelton() {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: "5%",
        }}
      >
        <View style={{ width: 90, height: 90, borderRadius: 5 }} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: 15,
              borderRadius: 4,
            }}
          />
          <View
            style={{ marginTop: 6, width: "80%", height: 15, borderRadius: 4 }}
          />
          <View
            style={{
              alignSelf: "flex-end",
              marginTop: 16,
              width: "30%",
              height: 20,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}

export default CartItemSkelton;
