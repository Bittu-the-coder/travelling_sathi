import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ tripData }) {
  const facts = tripData.FactsAboutLocation;
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: Colors.text,
          fontFamily: "Poppins-Medium",
        }}
      >
        Some facts about {tripData.tripDetails.location.name}
      </Text>
      <View
        style={{
          boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)",
          width: "100%",
          gap: 10,
          padding: 10,
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        {facts.map((fact, index) => (
          <Text
            key={index}
            style={{
              fontSize: 14,
              color: Colors.gradient.textGradient,
              fontFamily: "Poppins-Regular",
            }}
          >
            💡 {fact}
          </Text>
        ))}
      </View>
    </View>
  );
}
