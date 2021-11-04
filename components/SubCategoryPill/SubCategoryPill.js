import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  fetchCategoryList,
  fetchSubCategoryList,
} from "../../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled(TouchableOpacity)`
  border: 2px solid #eff3f6;
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 10px;
`;

const PillText = styled(Text)`
  font-size: 16px;
  color: #808080;
`;

function SubCategoryPill({ item, setFilterId }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setFilterId(item?.id);
  // }, []);

  const getData = async () => {
    setFilterId(item?.id);
    await dispatch(fetchSubCategoryList({ rootCategoryId: item?.id }));
  };
  // console.log("@@@", item.length);
  return (
    <Container onPress={getData}>
      <PillText>{item?.name}</PillText>
    </Container>
  );
}

export default SubCategoryPill;
