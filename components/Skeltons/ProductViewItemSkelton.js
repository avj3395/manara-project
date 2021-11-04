import React from "react";
import { View, Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function ProductViewItemSkelton() {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          marginTop: 20,
          marginRight: 10,
          marginBottom: 20,
          marginLeft: 10,
        }}
      >
        <View
          style={{ width: 120, height: 100, borderRadius: 5, marginBottom: 5 }}
        />
        <View style={{ width: 90, height: 20, borderRadius: 5 }} />
      </View>
    </SkeletonPlaceholder>
  );
}

export default ProductViewItemSkelton;
