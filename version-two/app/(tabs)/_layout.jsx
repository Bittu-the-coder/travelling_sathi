import React from "react";
import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.black,
        tabBarStyle: {
          backgroundColor: Colors.white,
          width: "100%",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: "My Trip",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
