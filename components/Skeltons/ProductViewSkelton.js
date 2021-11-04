import React from "react";
import { Text, View } from "../Themed";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
function ProductViewSkelton({ size = 1 }) {
  //1 -normal 2small
  return (
    <SkeletonPlaceholder>
      <View style={{}}>
        <View
          style={{
            marginTop: 15,
            width: "100%",
            height: 180,
            borderRadius: 4,
          }}
        />
        <View
          style={{ marginTop: 16, width: "95%", height: 20, borderRadius: 4 }}
        />
        <View
          style={{
            marginTop: 16,
            width: size == 1 ? "30%" : "50%",
            height: 20,
            borderRadius: 4,
          }}
        />
        <View
          style={{
            marginTop: 12,
            width: size == 1 ? "30%" : "50%",
            height: 10,
            borderRadius: 4,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}

export default ProductViewSkelton;
