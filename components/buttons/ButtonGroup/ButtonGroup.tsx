import React from "react";
import styled, { css } from "styled-components/native";
import { Text, View } from "../../Themed";
import TouchableBase from "../TouchableBase/TouchableBase";
import useColorScheme from "../../../hooks/useColorScheme.web";

const ButtonText = styled(Text)`
  font-size: 16px;
  line-height: 18px;
  font-family: "plex-medium";
  color: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.text};
  margin-top: 5px;

  ${(props) =>
    props.selected &&
    css`
      color: ${({ theme, colorScheme = "light" }) =>
        theme.colors[colorScheme]?.whiteText};
    `}
`;

const Button = styled(View)`
  background-color: #fff;
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 3px 10px 5px;
  border: 1px solid
    ${({ theme, colorScheme = "light" }) =>
      theme.colors[colorScheme]?.primaryDarkText};
  border-radius: ${({ theme }) => `${theme.buttonBorderRadius}px`};
  ${({ selected, theme, colorScheme = "light" }) => {
    const bgColor = theme.colors[colorScheme].tabIconSelected;
    return (
      selected &&
      css`
        padding: 3px 10px 5px;
        background-color: ${bgColor};
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border: 0;
        color: #fff;
        
      `
    );
  }}
  ${(props) =>
    props.btnLarge &&
    css`
    padding: 3px 20px 5px;
    `};
    ${(props) =>
    props.btnWhite &&
    css`
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        color:#2C2C2C;
    `};
`;

const ButtonHolder = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
 
  ${(props) =>
    props.spaceBetween &&
    css`
    justify-content:space-between;
    margin-bottom:20px;
    `};
`;

function ButtonGroup({ buttons, onChange, selectedIndex = 0,spaceBetween,btnLarge, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <ButtonHolder spaceBetween={spaceBetween}>
      {buttons.map((item, index) => (
        <TouchableBase key={item} onPress={() => onChange(index)}>
          <Button selected={index === selectedIndex} colorScheme={colorScheme} btnLarge={btnLarge}>
            <ButtonText selected={index === selectedIndex}>{item}</ButtonText>
          </Button>
        </TouchableBase>
      ))}
    </ButtonHolder>
  );
}

export default ButtonGroup;
