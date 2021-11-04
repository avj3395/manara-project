import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../Themed";
import TouchableBase from "../TouchableBase/TouchableBase";
import useColorScheme from "../../../hooks/useColorScheme.web";

const ButtonText = styled(Text)`
  font-size: 16px;
  color: ${({ theme, colorScheme }) => theme.colors[colorScheme].tint}
  text-transform: uppercase;
  margin-top:5px;
`;

function PlayButton({ title, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <TouchableBase {...props}>
      <Image
        source={require("./images/button.png")}
        style={{
          width: 87.3,
          height: 87.3,
        }}
      />
    </TouchableBase>
  );
}

export default PlayButton;
