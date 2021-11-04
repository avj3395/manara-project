import React from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../Themed";
import TouchableBase from "../TouchableBase/TouchableBase";
import useColorScheme from "../../../hooks/useColorScheme.web";

const ButtonText = styled(Text)`
  font-size: 16px;
  color: ${({ theme, colorScheme }) => theme.colors[colorScheme].textInverted};
  text-transform: uppercase;
  margin-top: 5px;
`;

function DefaultButton({ title, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <TouchableBase {...props}>
      <ImageBackground
        source={require("./images/button.png")}
        style={{
          width: 210,
          height: 66,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonText colorScheme={colorScheme}>{title}</ButtonText>
      </ImageBackground>
    </TouchableBase>
  );
}

export default DefaultButton;
