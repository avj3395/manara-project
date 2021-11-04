import React from "react";
import styled, { css } from "styled-components/native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const ButtonWrap = styled(View)`
  position: relative;
  overflow: hidden;
`;
const CustomButtonWrap = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  background-color: #0a874c;
  overflow: hidden;
  position: relative;
  padding: 9px 15px;
  border-radius: 5px;
  margin: 25px 10px 15px;
`;

const ButtonLabel = styled(Text)`
  position: relative;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
function ButtonSubmit({ label, onPress, status }) {
  return (
    <ButtonWrap>
      <CustomButtonWrap onPress={onPress}>
        {status === "loading" ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonLabel>{label}</ButtonLabel>
        )}
      </CustomButtonWrap>
    </ButtonWrap>
  );
}

export default ButtonSubmit;
