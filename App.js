import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, KeyboardAvoidingView, Dimensions , View} from "react-native";
import Navigator from "./components/Navigator";

import { NavigationContainer } from "@react-navigation/native";



export default function App() {
  return (
    <NavigationContainer style={styles.container} >
        <Navigator />
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
