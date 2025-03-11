import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabsRoot() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="mytrip" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="discover" />
    </Tabs>
  );
}
