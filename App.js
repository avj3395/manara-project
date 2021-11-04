import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ThemeProvider } from "styled-components/native";
import Theme from "./constants/Theme";

import { Provider, useSelector } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./store/slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CheckConnection } from "./CheckConnection";
import NoConnection from "./screens/NoConnection";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [connectionStatus, setConnectionStatus] = useState(false);
  CheckConnection().then((res) => {
    setConnectionStatus(res);
  });
  const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    blacklist: [""], // navigation will not be persisted
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

  let persistor = persistStore(store);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={Theme}>
              {connectionStatus ? (
                <SafeAreaProvider>
                  <Navigation colorScheme={colorScheme} />
                  <StatusBar />
                </SafeAreaProvider>
              ) : (
                <NoConnection onCheck={CheckConnection} />
              )}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    );
  }
}
