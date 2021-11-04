import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

const TouchableBase = ({ children, ...passThruProps }) => {
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback {...passThruProps}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity {...passThruProps}>{children}</TouchableOpacity>
  );
};
export default TouchableBase;
