import React from "react";
import styled from "styled-components/native";
import { View, FlatList } from "react-native";
import CategoryNavItem from "./CategoryNavItem";
const Container = styled(View)`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const data = [
  {
    source: require("../../assets/icon-1.png"),
    title: "Medicines",
    color: "#e9ffef",
    category_id: 738,
  },
  {
    source: require("../../assets/icon-2.png"),
    title: "Supplements",
    color: "#fff0e7",
    category_id: 761,
  },
  {
    source: require("../../assets/icon-3.png"),
    title: "Fitness ",
    color: "#ebfff9",
    category_id: 929,
  },
  {
    source: require("../../assets/icon-4.png"),
    title: "Beauty Care",
    color: "#f9ffe3",
    category_id: 697,
  },
  {
    source: require("../../assets/icon-5.png"),
    title: "Skincare",
    color: "#fffadb",
    category_id: 714,
  },
  {
    source: require("../../assets/icon-6.png"),
    title: "Covid Essentials ",
    color: "#fffae3",
    category_id: 772,
  },
  {
    source: require("../../assets/icon-7.png"),
    title: "Newly Launched",
    color: "#fffadb",
    category_id: 868,
  },
];
function CategoryNav({ item }) {
  return (
    <Container>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => "cat-nav-" + item.category_id}
        renderItem={({ item }) => <CategoryNavItem item={item} />}
      />
    </Container>
  );
}

export default CategoryNav;
