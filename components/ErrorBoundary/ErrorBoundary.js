import React from "react";
import { View, Text } from "react-native";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   // logErrorToMyService(error, errorInfo);
  // }

  render() {
    // console.log("has error", this.state.hasError);
    if (this.state.hasError) {
      // console.log("has error 2", this.state.hasError);
      // You can render any custom fallback UI
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "#000" }}>
            Something went wrong
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
