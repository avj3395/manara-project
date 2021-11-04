import React from "react";
import { View, Animated, StyleSheet } from "react-native";

const ProgressiveImage = ({ defaultImageSource, source, style, props }) => {
  const defaultImageAnimated = new Animated.Value(0);
  const originalImageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleOriginalImageLoad = () => {
    Animated.timing(originalImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.Image
        source={defaultImageSource}
        style={[style, { opacity: defaultImageAnimated }]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
        {...props}
      />
      <Animated.Image
        source={source}
        style={[style, { opacity: originalImageAnimated }, styles.imageOverlay]}
        onLoad={handleOriginalImageLoad}
        {...props}
      />
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
