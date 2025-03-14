import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../contexts/CreateTripContext";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Set navigation options
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

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
        Review Your Trip
      </Text>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            marginTop: 4,
            color: Colors.gray,
          }}
        >
          Before generating your trip, Please review your selections.
        </Text>
        {/* Destination selection info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            🌴
          </Text>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: Colors.gray,
              }}
            >
              Destination
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                marginRight: 20,
              }}
            >
              {tripData?.location?.name}
            </Text>
          </View>
        </View>
        {/* Date selection info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            🗓️
          </Text>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: Colors.gray,
              }}
            >
              Travel Date
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              {moment(tripData?.startDate).format("DD MMM")} To{" "}
              {moment(tripData?.endDate).format("DD MMM")}
            </Text>
          </View>
        </View>
        {/* Travel info selection info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            ✈️
          </Text>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: Colors.gray,
              }}
            >
              Who is Traveling
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>
        {/* Budget  selection info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            💰
          </Text>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: Colors.gray,
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            backgroundColor: Colors.black,
            padding: 6,
            borderRadius: 15,
            alignSelf: "center",
            marginTop: 50,
          }}
          onPress={() => router.push("/create-trip/generate-trip")}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontFamily: "Poppins-Bold",
              textAlign: "center",
            }}
          >
            Build My trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
