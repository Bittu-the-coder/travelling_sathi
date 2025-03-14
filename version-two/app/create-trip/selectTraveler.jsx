import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Corrected import
import { Colors } from "../../constants/Colors";
import { SelectTravelerList } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../contexts/CreateTripContext";
import { useRouter } from "expo-router";

export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectTraveler, setSelectTraveler] = useState(null); // Set to null initially
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  useEffect(() => {
    // Update tripData with the selected traveler
    setTripData((prevData) => ({
      ...prevData,
      traveler: selectTraveler,
    }));
  }, [selectTraveler]); // Add dependency to avoid unnecessary updates

  useEffect(() => {
    console.log("Trip Data Updated:", tripData);
  }, [tripData]);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 36,
          fontFamily: "Poppins-Bold",
          marginTop: 20,
        }}
      >
        Who's Travelling
      </Text>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Bold", // Corrected typo
              fontSize: 20,
            }}
          >
            Choose your travelers
          </Text>
        </View>
        <FlatList
          data={SelectTravelerList}
          keyExtractor={(item) => item.id.toString()} // Add keyExtractor
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectTraveler(item)}>
              <OptionCard
                option={item}
                index={index}
                selectedTraveler={selectTraveler}
              />
            </TouchableOpacity>
          )}
          style={{ height: "70%" }}
        />
        <TouchableOpacity
          style={{
            width: "80%",
            backgroundColor: Colors.black,
            padding: 6,
            borderRadius: 15,
            alignSelf: "center",
            marginTop: 30,
          }}
          onPress={() => router.push("/create-trip/select-dates")}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontFamily: "Poppins-Bold",
              textAlign: "center",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
