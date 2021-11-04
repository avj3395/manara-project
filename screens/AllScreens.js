import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";

const Separator = () => (
  <View
    style={styles.separator}
    lightColor="#eee"
    darkColor="rgba(255,255,255,0.1)"
  />
);

const TextButton = ({ title, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.mainTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function AllScreens({ navigation }) {
  const screens = navigation.dangerouslyGetState().routeNames;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Screens</Text>
          <Separator />
          {screens.map((screen, i) =>
            i === 0 ? null : (
              <View key={screen}>
                <TextButton
                  title={screen}
                  onPress={() => navigation.navigate(screen)}
                />
                <Separator />
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: "90%",
  },
});
