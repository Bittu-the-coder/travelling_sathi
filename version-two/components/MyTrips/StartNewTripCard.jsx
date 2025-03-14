import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 50,
        padding: 20,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Poppins-Medium",
        }}
      >
        No Trip planned yet
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins-Regular",
          textAlign: "center",
          marginTop: 10,
          color: Colors.grayLight,
        }}
      >
        Looks like its time to plane a new travel experience! Get started below
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/create-trip/search-place")}
        style={{
          marginTop: 20,
          backgroundColor: Colors.black,
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Poppins-Medium",
            color: Colors.white,
          }}
        >
          Start New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
