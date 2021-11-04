import React from 'react';
import styled from "styled-components/native";
import {
    View,
    Image,
    TouchableHighlight
} from "react-native";
const Container = styled(View)`
  position: relative;
  margin-left: 14px;
`;
const ImageItem = styled(Image)`
  position: relative;
 width:180px;
 height:153px;
`;
function HorizontalBannerList({ item }) {
    return (
        <Container>
            <TouchableHighlight>
                <ImageItem source={item.source} style={{ resizeMode: 'cover' }} />
            </TouchableHighlight>
        </Container>
    )
}

export default HorizontalBannerList;
