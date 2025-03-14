import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Discover() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  // Sample Data (This can come from an API)
  const recommendedTrips = [
    {
      id: 1,
      name: "Paris Getaway",
      image: require("../../assets/images/paris.jpg"),
    },
    {
      id: 2,
      name: "Beach Escape",
      image: require("../../assets/images/beach.jpg"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search places or trips..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Recommended Trips */}
      <Text style={styles.sectionTitle}>Recommended Trips</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommendedTrips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={styles.tripCard}
            onPress={() => router.push("/trip-details")}
          >
            <Image source={trip.image} style={styles.tripImage} />
            <Text style={styles.tripTitle}>{trip.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Destinations */}
      <Text style={styles.sectionTitle}>Popular Destinations</Text>
      <View style={styles.destinationsContainer}>
        <TouchableOpacity
          style={styles.destinationCard}
          onPress={() => router.push("/destination/paris")}
        >
          <Image
            source={require("../../assets/images/paris.jpg")}
            style={styles.destinationImage}
          />
          <Text style={styles.destinationTitle}>Paris</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.destinationCard}
          onPress={() => router.push("/destination/bali")}
        >
          <Image
            source={require("../../assets/images/beach.jpg")}
            style={styles.destinationImage}
          />
          <Text style={styles.destinationTitle}>Bali</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
  },
  tripCard: {
    width: 150,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: 100,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  destinationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  destinationCard: {
    width: "48%",
    borderRadius: 10,
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: 120,
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});
