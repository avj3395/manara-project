import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export const CheckConnection = () => {
  return NetInfo.fetch().then((state) => {
    return state.isConnected;
  });
};
