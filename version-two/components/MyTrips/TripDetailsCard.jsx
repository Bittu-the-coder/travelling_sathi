import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

const TripDetailsCard = ({
  budgetBreakdown,
  tripDetails,
  flightDetails,
  hotelOptions,
  dailyItinerary,
  placesToVisit,
}) => {
  // console.log(
  //   budgetBreakdown,
  //   tripDetails,
  //   flightDetails,
  //   hotelOptions,
  //   dailyItinerary,
  //   placesToVisit
  // );

  return (
    <>
      {/* Trip Details Card */}
      <Card style={styles.card}>
        <Card.Title title="Trip Details" titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.info}>
            📍 Location: {tripDetails?.location?.name}
          </Text>
          <Text style={styles.info}>🗓 Duration: {tripDetails?.duration}</Text>
          <Text style={styles.info}>
            📅 Start Date: {tripDetails?.startDate}
          </Text>
          <Text style={styles.info}>🏁 End Date: {tripDetails?.endDate}</Text>
          <Text style={styles.info}>💰 Budget: ₹{tripDetails?.budget}</Text>
          <Text style={styles.info}>
            👨‍👩‍👧‍👦 Traveler Type: {tripDetails?.traveler}
          </Text>
        </Card.Content>
      </Card>

      {/* Budget Breakdown Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💰 Budget Breakdown</Text>
        <Text>🏨 Hotel: ₹{budgetBreakdown?.hotel}</Text>
        <Text>✈️ Flights: ₹{budgetBreakdown?.flights}</Text>
        <Text>🍽️ Food: ₹{budgetBreakdown?.food}</Text>
        <Text>🎡 Activities: ₹{budgetBreakdown?.activities}</Text>
        <Text>🚕 Transportation: ₹{budgetBreakdown?.transportation}</Text>
        <Text>🔄 Miscellaneous: ₹{budgetBreakdown?.miscellaneous}</Text>
        <Text style={styles.total}>💵 Total: ₹{budgetBreakdown?.total}</Text>
      </View>

      {/* Flight Details Card */}
      {flightDetails?.map((flight, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>✈️ Flight {index + 1} Details</Text>
          <Text>
            🛫 From: {flight?.departureAirport} at {flight?.departureTime}
          </Text>
          <Text>
            🛬 To: {flight?.arrivalAirport} at {flight?.arrivalTime}
          </Text>
          <Text>🚀 Airline: {flight?.airline}</Text>
          <Text>💺 Class: {flight?.class}</Text>
          <Text>🔢 Flight No: {flight?.flightNumber}</Text>
        </View>
      ))}

      {/* Hotel Options Card */}
      {hotelOptions?.map((hotel, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>🏨 Hotel {index + 1}</Text>
          <Text>📍 Name: {hotel?.name}</Text>
          <Text>⭐ Rating: {hotel?.rating}</Text>
          <Text>📍 Address: {hotel?.address}</Text>
        </View>
      ))}

      {/* Daily Itinerary Card */}
      {dailyItinerary?.map((dayPlan, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>
            📅 Day {index + 1} - {dayPlan?.day}
          </Text>
          {dayPlan?.activities?.map((activity, activityIndex) => (
            <Text key={activityIndex}>🔹 {activity}</Text>
          ))}
        </View>
      ))}

      {/* Places to Visit Card */}
      <Card style={styles.card}>
        <Card.Title title="🌍 Places to Visit" titleStyle={styles.title} />
        <Card.Content>
          {placesToVisit?.map((place, index) => (
            <View key={index} style={styles.placeItem}>
              <Text style={styles.placeName}>
                📌 {place?.name} ({place?.city})
              </Text>
              <Text>{place?.description}</Text>
              <Text style={styles.priority}>
                ⭐ Priority: {place?.priority}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  placeItem: {
    marginBottom: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priority: {
    fontSize: 14,
    color: "#e67e22",
  },
});

export default TripDetailsCard;
