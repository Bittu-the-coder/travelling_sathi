import { View, Text, Image, ScrollView } from "react-native";
import React, { useRef } from "react";
import { Colors } from "../../constants/Colors";
import TripDetailsCard from "../../components/MyTrips/TripDetailsCard";
import { useLocalSearchParams } from "expo-router";

export default function TripDetails() {
  const params = useLocalSearchParams();

  let tripData = {};
  try {
    tripData = params.tripData ? JSON.parse(params.tripData) : {};
  } catch (error) {
    console.error("Error parsing tripData:", error);
  }

  console.log("tripData in my Trips:", tripData);

  return (
    <ScrollView>
      <Image
        source={require("../../assets/images/default2.jpg")}
        style={{
          width: "100%",
          height: 400,
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.white,
          marginTop: -30,
          height: " 100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 16,
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: Colors.black,
            marginVertical: 10,
            borderRadius: 2,
            marginHorizontal: 140,
            marginBottom: 20,
          }}
        />
        <TripDetailsCard
          budgetBreakdown={tripData.budgetBreakdown}
          tripDetails={tripData.tripDetails}
          flightDetails={tripData.flightDetails}
          hotelOptions={tripData.hotelOptions}
          dailyItinerary={tripData.dailyItinerary}
          placesToVisit={tripData.placesToVisit}
        />
      </View>
    </ScrollView>
  );
}
