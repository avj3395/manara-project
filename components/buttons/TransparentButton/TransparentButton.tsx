import React from "react";
import styled, { css } from "styled-components/native";
import TouchableBase from "../TouchableBase/TouchableBase";
import { View, Image, TouchableHighlight, Text } from "react-native";
import useColorScheme from "../hooks/useColorScheme.web";

const BtnText = styled(TouchableBase)``;
const BtnLink = styled(Text)`
  padding: 10px 30px;
  font-size: 16px;
  text-align: left;
  color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.buttonText};
  font-weight: bold;
  ${(props) =>
    props.noMargin &&
    css`
      padding: 10px 10px 10px 0;
      margin-left: 5px;
      margin-right: 5px;
    `}
`;
const LinkWrap = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const IconImage = styled(Image)`
  width: 20px;
  height: 15px;
`;
function TransparentButton({ label, imgSource, onPress, noMargin }) {
  return (
    <BtnText onPress={onPress} activeOpacity={0.9} underlayColor="#bba284">
      <LinkWrap>
        {imgSource && <IconImage resizeMode="contain" source={imgSource} />}

        <BtnLink noMargin={noMargin}>{label}</BtnLink>
      </LinkWrap>
    </BtnText>
  );
}

export default TransparentButton;
