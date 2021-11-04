import React from 'react';
import styled from "styled-components/native";
import {
  View
} from "react-native";
import LandingScreen from '../components/LandingScreen/LandingScreen';
const Container = styled(View)`
  flex: 1;
`;
function Landing() {
  return (
    <Container>
      <LandingScreen />
    </Container>
  )
}

export default Landing
