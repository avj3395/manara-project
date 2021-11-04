import React from 'react';
import styled from "styled-components/native";
import {
    View,
    TouchableHighlight,Text
} from "react-native";
const Container = styled(View)`
  position: relative;
    overflow:hidden;
    margin-bottom: 25px;
`;
const LinkItem = styled(TouchableHighlight)`
    align-items:center;
    justify-content:center;
    background-color:#f27130;
    overflow:hidden;
    position: relative;
    margin-left: 10px;
    margin-right: 7px;
    padding:7px 15px;
    border-radius:5px;
    
`

const LinkLabel = styled(Text)`
  position: relative;
  font-size:14px;
  color:#fff;
 
`;

function ProductTypeNav({ item }) {
    return (
        <Container>
            <LinkItem>
                <LinkLabel>{item.title}</LinkLabel>
            </LinkItem>
        </Container>
    )
}

export default ProductTypeNav;
