import React from "react";
import styled from "styled-components/native";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
const itemWidth = width - 185;
const Container = styled(View)`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`;
const Content = styled(View)`
  position: relative;
  padding: 10px 5px 10px 0;
`;
const ImageWrap = styled(TouchableHighlight)`
  position: relative;
  padding-right: 20px;
`;
const ImageItem = styled(Image)`
  position: relative;
  width: 150px;
  height: 99px;
`;
const Title = styled(Text)`
  font-size: 16px;
  color: #1f2c32;
  margin-bottom: 8px;
`;

const Date = styled(Text)`
  font-size: 14px;
  color: #acacac;
  margin-bottom: 8px;
`;

function BlogItem({ item }) {
  return (
    <Container>
      <ImageWrap>
        <ImageItem source={item.source} style={{ resizeMode: "contain" }} />
      </ImageWrap>
      <Content style={{ width: itemWidth }}>
        <Title>{item.title}</Title>
        <Date>{item.date}</Date>
      </Content>
    </Container>
  );
}

export default BlogItem;
