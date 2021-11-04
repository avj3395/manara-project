import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import styled, { css } from "styled-components/native";
import { AirbnbRating } from "react-native-ratings";

const Container = styled(View)`
  padding-top: 10px;
  background-color: #fff;
  margin: 5px;
`;

const UserName = styled(Text)`
  color: #f48a00;
  line-height: 25px;
  padding-left: 5px;
`;
const UserTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
`;
const QuantityTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
  margin-right: 10px;
`;
const ValueTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
  margin-right: 28px;
`;
const PriceTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
  margin-right: 32px;
`;
const UserComment = styled(Text)`
  line-height: 25px;
  padding-left: 5px;
`;

const BorderThin = styled(View)`
  height: 2px;
  background: green;
  margin-top: 10px;
`;

const ReviewsList = ({ item }) => {
  return (
    <Container>
      <UserName>{item?.nickname} </UserName>
      <UserTitle>{item?.title}</UserTitle>
      <UserComment>{item?.detail} </UserComment>
      {item?.ratings.map((items) => (
        <View style={{ flexDirection: "row" }} key={`review-${items?.vote_id}`}>
          <QuantityTitle>{items?.rating_name}</QuantityTitle>
          <AirbnbRating
            count={5}
            defaultRating={items?.value}
            size={14}
            selectedColor="#f5af3f"
            showRating={false}
            fractions={2}
            isDisabled={true}
            starContainerStyle={{
              width: "100%",
              justifyContent: "flex-start",
            }}
          />
        </View>
      ))}

      <BorderThin />
    </Container>
  );
};

export default ReviewsList;
