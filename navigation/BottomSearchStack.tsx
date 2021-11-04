import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import NotFoundScreen from "../screens/NotFoundScreen";
import SubCategoryScreen from "../screens/SubCategoryScreen";
import SearchCategory from "../screens/SearchCategory";
import ProductView from "../screens/ProductView";
import SearchPage from "../screens/SearchPage";

const Stack = createStackNavigator<RootStackParamList>();
function BottomSearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="SearchCategory"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SearchCategory" component={SearchCategory} />
      <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
      <Stack.Screen name="ProductView" component={ProductView} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

export default BottomSearchStack;
