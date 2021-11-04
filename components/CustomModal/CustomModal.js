import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  View,
} from "react-native";
import styled, { css } from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
const Container = styled(View)`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
`;
const PopupContainer = styled(View)`
  flex: 1;
  justify-content: flex-start;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  margin-top: 50px;
  padding: 40px 20px;
  position: relative;
  background: ${({ theme, colorScheme = "light" }) =>
    theme.colors[colorScheme]?.background};
`;

const CloseBtn = styled(View)`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 20px;
  z-index: 2;
  ${(props) =>
    props.theme.dir === "rtl"
      ? css`
          left: 20px;
        `
      : css`
          right: 20px;
        `}
`;
const CloseBtnImg = styled(Image)`
  width: 30px;
  height: 30px;
`;
function CustomModal({ children, popupTitle, modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <Container>
        <PopupContainer>
          <CloseBtn>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Entypo name="cross" size={40} color="#C4C4C4" />
            </TouchableHighlight>
          </CloseBtn>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* <TitleWrap>
            <Title>{popupTitle}</Title>
          </TitleWrap> */}
            {children}
          </ScrollView>
        </PopupContainer>
      </Container>
    </Modal>
  );
}
export default CustomModal;
