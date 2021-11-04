import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { AirbnbRating } from "react-native-ratings";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addReviews } from "../../store/slices/reviewSlice";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  margin: 5px;
`;
const Title = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
`;
const QuantityTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const ValueTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const PriceTitle = styled(Text)`
  line-height: 25px;
  font-weight: bold;
  padding-left: 5px;
  color: #8c8c8c;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TextRequired = styled(Text)`
  color: red;
  line-height: 25px;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TitleWarp = styled(View)`
  flex-direction: row;
`;

const FormContainer = styled(View)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Label = styled(Text)`
  line-height: 25px;
  padding-left: 5px;
  color: #8c8c8c;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const Textbox = styled(TextInput)`
  padding: 10px 10px;
  margin-left: 3px;
  color: #546e7a;
  width: 100%;
  border-color: #bfbfbf;
  border-width: 1px;
  border-radius: 10px;
`;
const ButtonWarp = styled(TouchableOpacity)`
  margin-top: 25px;
  margin-bottom: 20px;
  margin-left: 5px;
  background-color: #0a874c;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin: 25px 5px;
  padding: 9px 15px;
  align-items: center;
  justify-content: center;
`;

const ButtonLabel = styled(Text)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
const ErrorText = styled(Text)`
  color: tomato;
  font-size: 10px;
  margin-top: 5px;
  margin-left: 5px;
`;

const ResponseWarp = styled(View)`
  flex-direction: row;
  margin-left: 5px;
  background-color: #f6ffed;
  width: 100%;
  border-radius: 10px;
`;

const ResponseText = styled(Text)`
  color: #5cb85c;
  margin-left: 5px;
  margin-top: 3px;
`;

const AddReviews = ({ setResponseFlag, setIsModelVisible }) => {
  const [quantityRate, setQuantityRate] = useState("");
  const [valueRate, setValueRate] = useState("");
  const [priceRate, setPriceRate] = useState("");
  const [submitFlag, setSubmitFlag] = useState(false);
  const dispatch = useDispatch({});
  const { customer } = useSelector((state) => state.customer);
  const { productItem } = useSelector((state) => state.products);
  const postReviews = async (
    value,
    { setErrors, setSubmitting, resetForm }
  ) => {
    // console.log("==data", value);

    const data = {
      data: {
        review: {
          title: value?.title,
          detail: value?.detail,
          nickname: value?.nickname,
          review_entity: "product",
          review_status: 2,
          entity_pk_value: productItem?.id,
          ratings: [
            {
              rating_name: "Quality",
              value: value?.quantity_rate,
            },
            {
              rating_name: "Value",
              value: value?.value_rate,
            },
            {
              rating_name: "Price",
              value: value?.price_rate,
            },
          ],
        },
      },
    };
    // console.log("paylod", data);
    const resultAction = await dispatch(addReviews(data));
    if (addReviews.fulfilled.match(resultAction)) {
      resetForm();
      setQuantityRate("");
      setValueRate("");
      setPriceRate("");
      setResponseFlag(true);
      setIsModelVisible(false);
    }
  };

  const initialValues = {
    nickname: customer?.firstname,
    title: "",
    detail: "",
    quantity_rate: quantityRate,
    value_rate: valueRate,
    price_rate: priceRate,
  };

  // console.log("rating count", customer, productItem);

  const validationSchema = yup.object().shape({
    nickname: yup.string().required("Nick name is required"),
    title: yup.string().required("Summary is required"),
    detail: yup.string().required("Review is required"),
    quantity_rate: yup
      .string()
      .required("Please select one of each of the ratings above."),
    value_rate: yup
      .string()
      .required("Please select one of each of the ratings above."),
    price_rate: yup
      .string()
      .required("Please select one of each of the ratings above."),
  });
  return (
    <Container>
      <Title>Your Rating </Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setErrors, resetForm, setSubmitting }) => {
          postReviews(values, { setErrors, resetForm, setSubmitting });
        }}
      >
        {({
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
        }) => (
          <FormContainer>
            <View>
              <QuantityTitle>Quantity</QuantityTitle>
              <AirbnbRating
                count={5}
                defaultRating={quantityRate}
                size={14}
                selectedColor="#f5af3f"
                showRating={false}
                fractions={2}
                onFinishRating={(data) => setQuantityRate(data)}
                starContainerStyle={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              />
              <ValueTitle>Value</ValueTitle>
              <AirbnbRating
                count={5}
                defaultRating={valueRate}
                size={14}
                selectedColor="#f5af3f"
                showRating={false}
                fractions={2}
                onFinishRating={(data) => setValueRate(data)}
                starContainerStyle={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              />
              <PriceTitle>Price</PriceTitle>
              <AirbnbRating
                count={5}
                defaultRating={priceRate}
                size={14}
                selectedColor="#f5af3f"
                showRating={false}
                fractions={2}
                onFinishRating={(data) => setPriceRate(data)}
                starContainerStyle={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              />
              {errors.quantity_rate ||
              errors.price_rate ||
              errors.value_rate ? (
                <ErrorText>
                  Please select one of each of the ratings above.
                </ErrorText>
              ) : null}
              <TitleWarp>
                <Label>Nickname</Label>
                <TextRequired>*</TextRequired>
              </TitleWarp>

              <Textbox
                onChangeText={handleChange("nickname")}
                value={values.nickname}
              />
              {errors.nickname && touched.nickname ? (
                <ErrorText>{errors.nickname}</ErrorText>
              ) : null}
              <TitleWarp>
                <Label>Summary</Label>
                <TextRequired>*</TextRequired>
              </TitleWarp>
              <Textbox
                onChangeText={handleChange("title")}
                value={values.title}
              />
              {errors.title && touched.title ? (
                <ErrorText>{errors.title}</ErrorText>
              ) : null}
              <TitleWarp>
                <Label>Review</Label>
                <TextRequired>*</TextRequired>
              </TitleWarp>
              <Textbox
                onChangeText={handleChange("detail")}
                value={values.detail}
                multiline={true}
                numberOfLines={4}
                style={{ textAlignVertical: "top" }}
              />
              {errors.detail && touched.detail ? (
                <ErrorText>{errors.detail}</ErrorText>
              ) : null}
              <ButtonWarp onPress={handleSubmit}>
                <ButtonLabel>SUBMIT REVIEW</ButtonLabel>
              </ButtonWarp>
            </View>
          </FormContainer>
        )}
      </Formik>
    </Container>
  );
};

export default AddReviews;
