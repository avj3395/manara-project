import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AddReviews from "../components/Forms/AddReviews";
import ReviewsList from "../components/ReviewsList/ReviewsList";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "../store/slices/reviewSlice";

const BottomModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

const ModalWarp = styled(View)`
  flex: 0.8;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 10px 20px 10px;
`;
const ButtonText = styled(Text)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

const Button = styled(TouchableOpacity)`
  background-color: #008f57;
  padding: 9px 15px;
  border-radius: 5px;
  align-items: center;
  margin: 25px 0px;
`;
const ResponseWarp = styled(View)`
  flex-direction: row;
  margin-left: 5px;
  background-color: #f6ffed;
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
`;

const ResponseText = styled(Text)`
  color: #5cb85c;
  margin-left: 5px;
  margin-top: 3px;
`;
const reviewData = [
  {
    id: 1,
    review: 3,
    name: "Akshay v j",
    reviewTitle: "Test review title",
    reviewComment: "Test review comment",
  },
  {
    id: 2,
    review: 2,
    name: "Amal Babu",
    reviewTitle: "Test review title",
    reviewComment: "Test review comment",
  },
  {
    id: 3,
    review: 4,
    name: "Akash",
    reviewTitle: "Test review title",
    reviewComment: "Test review comment",
  },
  {
    id: 4,
    review: 3,
    name: "Aravind",
    reviewTitle: "Test review title",
    reviewComment: "Test review comment",
  },
];
const ReviewScreen = () => {
  const dispatch = useDispatch({});

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [responseFlag, setResponseFlag] = useState(false);
  const { reviews } = useSelector((state) => state.reviews);
  const { productItem } = useSelector((state) => state.products);
  useEffect(() => {
    const getReview = async () => {
      await dispatch(getProductReviews({ productId: productItem?.sku }));
    };
    getReview();
  }, [productItem]);

  //   console.log("reviews", reviews);

  return (
    <View>
      <Button onPress={() => setIsModelVisible(true)}>
        <ButtonText>Write a Review</ButtonText>
      </Button>
      {responseFlag && (
        <ResponseWarp>
          <Ionicons name="md-checkmark-circle" size={25} color="#4BB543" />
          <ResponseText>You submitted your review for moderation.</ResponseText>
        </ResponseWarp>
      )}
      {reviews?.length > 0 && (
        <View>
          {reviews.map((item) => (
            <ReviewsList item={item} key={`review-${item?.id}`} />
          ))}
        </View>
      )}
      <BottomModal
        isVisible={isModelVisible}
        onBackdropPress={() => setIsModelVisible(false)}
        onBackButtonPress={() => setIsModelVisible(false)}
      >
        <ModalWarp>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AddReviews
              setResponseFlag={setResponseFlag}
              setIsModelVisible={setIsModelVisible}
            />
          </ScrollView>
        </ModalWarp>
      </BottomModal>
    </View>
  );
};

export default ReviewScreen;
