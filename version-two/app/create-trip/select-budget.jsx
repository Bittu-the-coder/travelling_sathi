import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../contexts/CreateTripContext";
import { Colors } from "../../constants/Colors";
import { SelectBudgetOptions } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";

export default function SelectBudget() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Set navigation options
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  // Update tripData when selectedOption changes
  useEffect(() => {
    if (selectedOption) {
      setTripData((prevData) => ({
        ...prevData,
        budget: selectedOption.title,
      }));
    }
  }, [selectedOption, setTripData]);

  // Handle continue button press
  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show("Please select a budget", ToastAndroid.SHORT);
      return;
    }
    router.push("/create-trip/review-trip");
  };

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
          marginTop: 10,
        }}
      >
        Select Budget
      </Text>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 20,
          }}
        >
          Choose spending habits for your trip
        </Text>
        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id} // Add key here
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard option={item} selectedTraveler={selectedOption} />
            </TouchableOpacity>
          )}
          style={{
            height: "60%",
            marginTop: 20,
          }}
          keyExtractor={(item) => item.id.toString()} // Ensure unique keys
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
          onPress={onClickContinue}
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
