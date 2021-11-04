import React from "react";
import styled, { css } from "styled-components/native";
import { Text, View } from "../../Themed";
import TouchableBase from "../TouchableBase/TouchableBase";
import useColorScheme from "../../../hooks/useColorScheme.web";

const ButtonText = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.textInverted};
  margin-top: 8px;
  padding: 10px;
`;

const ButtonHolder = styled(View)`
  ${({ theme, colorScheme = "light" }) => {
    const bgColor = theme.colors[colorScheme].tabIconSelected;
    const borderRadius = `${theme.buttonBorderRadius}px`;
    return css`
      background-color: ${bgColor};
    `;
  }}
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border: 0;
  border-radius: 50px;
  align-items: center;
  height: 50px;
  width: 90%;
  align-self: center;
`;

function Button({ title, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        height: 50,
        width: "100%",
        alignItems: "stretch",
      }}
    >
      <TouchableBase {...props}>
        <ButtonHolder colorScheme={colorScheme}>
          <ButtonText colorScheme={colorScheme}>{title}</ButtonText>
        </ButtonHolder>
      </TouchableBase>
    </View>
  );
}

export default Button;
