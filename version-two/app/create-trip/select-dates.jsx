import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { CreateTripContext } from "../../contexts/CreateTripContext";

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    const totalNoOfDate = endDate.diff(startDate, "days") + 1;
    if (totalNoOfDate < 1) {
      ToastAndroid.show(
        "Please select start and end dates",
        ToastAndroid.SHORT
      );
      return;
    }
    setTripData((prevData) => ({
      ...prevData,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      totalNoOfDate: totalNoOfDate,
    }));
    router.push("/create-trip/select-budget");
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
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>
      <View
        style={{
          marginTop: 30,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxDateDuration={8}
          selectedDayTextStyle={{ color: Colors.white }}
          selectedRangeStyle={{ backgroundColor: Colors.black }}
        />
      </View>
      <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: Colors.black,
          padding: 6,
          borderRadius: 15,
          alignSelf: "center",
          marginTop: 30,
        }}
        onPress={onDateSelectionContinue}
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
  );
}
