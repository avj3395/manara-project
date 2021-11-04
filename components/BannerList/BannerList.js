import React from "react";
import styled from "styled-components/native";
import { View, Image, Dimensions, TouchableHighlight } from "react-native";
const Container = styled(View)`
  position: relative;
  margin-bottom: 5px;
  padding: 0 10px;
  overflow: hidden;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 100%;
`;
const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 18.5);
const imageWidth = dimensions.width - 20;
function BannerList({ item }) {
  return (
    <Container>
      <TouchableHighlight>
        <ImageItem
          source={item.source}
          style={{ height: imageHeight, width: imageWidth }}
        />
      </TouchableHighlight>
    </Container>
  );
}

export default BannerList;
