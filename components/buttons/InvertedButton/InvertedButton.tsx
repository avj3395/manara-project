import React from "react";
import { ImageBackground } from "react-native";
import styled, { css } from "styled-components/native";
import { Text, View } from "../../Themed";
import TouchableBase from "../TouchableBase/TouchableBase";
import useColorScheme from "../../../hooks/useColorScheme.web";

const ButtonText = styled(Text)`
  font-size: 16px;
  line-height: 17px;
  color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.buttonText};
  text-transform: uppercase;
  margin-top: 5px;
  font-family: "plex-medium";
  ${(props) =>
    props.btnSm &&
    css`
      color: ${({ theme, colorScheme = "light" }) =>
        theme.colors[colorScheme]?.whiteText};
      font-size: 12px;
      line-height: 13px;
    `}
  ${(props) =>
    props.btnBordered &&
    css`
      color: ${({ theme, colorScheme = "light" }) =>
        theme.colors[colorScheme]?.text};
      font-size: 14px;
      line-height: 18px;
    `}
`;
const CustomButton = styled(View)`
  border: 2px solid #000;
  border-radius: 10px;
  padding: 7px 40px;
  ${(props) =>
    props.btnSm &&
    css`
      padding: 0 10px;
      font-size: 12px;
      line-height: 22px;
      border-radius: 8px;
      height: 24px;
      background-color: transparent;
      border: 1px solid
        ${({ theme, colorScheme = "light" }) =>
          theme.colors[colorScheme]?.background};
    `}
  ${(props) =>
    props.btnBordered &&
    css`
      padding: 0 10px;
      font-size: 12px;
      line-height: 22px;
      border-radius: 8px;
      height: 30px;
      margin: 4px;
      background-color: transparent;
      border: 1px solid
        ${({ theme, colorScheme = "light" }) =>
          theme.colors[colorScheme]?.primaryDarkText};
    `}
`;
function InvertedButton({ title, btnSm, icon, btnBordered, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <TouchableBase {...props}>
      <CustomButton btnSm={btnSm} btnBordered={btnBordered}>
        <ButtonText
          btnSm={btnSm}
          btnBordered={btnBordered}
          colorScheme={colorScheme}
        >
          {icon}
          {title}
        </ButtonText>
      </CustomButton>
    </TouchableBase>
  );
}

export default InvertedButton;
