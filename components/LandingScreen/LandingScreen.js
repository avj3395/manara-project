import React from 'react';
import styled from "styled-components/native";
import {
  ImageBackground,
  View,
  Image,
} from "react-native";
import bgImage from "../../assets/bg-image.png";
import logo from "../../assets/logo.png";

const Container = styled(View)`
  flex: 1;
  background-color: #39824b;
  padding: 0;
`;
const BgImage = styled(ImageBackground)`
  flex: 1;
  position: relative;
  width:100%;
  align-items:center;
  justify-content:center;
`;
const LogoImage = styled(Image)`
    height: 250px;
    width: 189px;
`;
function LandingScreen() {
  return (
    <Container>
      <BgImage source={bgImage} style={{ resizeMode: 'cover' }}>
        <LogoImage source={logo} style={{ resizeMode: 'contain' }} />
      </BgImage>
    </Container>
  )
}

export default LandingScreen
