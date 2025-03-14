import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import { CreateTripContext } from "../../contexts/CreateTripContext";
import { useRouter } from "expo-router";

export default function SearchPlace() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const MAPILLARY_API_KEY =
    "MLY|9521273664596809|00e19564d12f9774aa82df94bc77e8cc";

  const fetchSuggestions = async (text) => {
    if (text.length > 2) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${text}`;
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "YourAppName/1.0 (your@email.com)", // Required by Nominatim
          },
        });
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchMapillaryImages = async (lat, lon) => {
    const url = `https://graph.mapillary.com/images?access_token=${MAPILLARY_API_KEY}&fields=thumb_1024_url&bbox=${
      lon - 0.01
    },${lat - 0.01},${lon + 0.01},${lat + 0.01}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return data.data[0].thumb_1024_url; // Return the first image URL
      }
    } catch (error) {
      console.error("Error fetching Mapillary images:", error);
    }
    return null;
  };

  const handleSuggestionPress = async (item) => {
    // Fetch images from Mapillary
    const photoUrl = await fetchMapillaryImages(item.lat, item.lon);

    // Update tripData with the selected location
    const updatedTripData = {
      location: {
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        photoRef: null,
        photoUrl,
      },
    };

    console.log("Updated Trip Data:", updatedTripData); // Log the updated data
    setTripData((prevData) => ({
      ...prevData,
      ...updatedTripData,
    }));

    // Clear the search query and suggestions
    setQuery("");
    setSuggestions([]);

    // Add a small delay before navigating back
    setTimeout(() => {
      router.push("/create-trip/selectTraveler");
    }, 100);
  };

  const handleSearchSubmit = () => {
    if (query.length > 2) {
      fetchSuggestions(query); // Fetch suggestions only when Enter is pressed
    }
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Search Place",
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    console.log("Trip Data Updated:", tripData);
  }, [tripData]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a place"
        value={query}
        onChangeText={(text) => {
          setQuery(text); // Update the query state as the user types
        }}
        onSubmitEditing={handleSearchSubmit} // Trigger search when Enter is pressed
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
            <Text style={styles.suggestionItem}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.white,
    height: "100%",
  },
  input: {
    height: 44,
    borderColor: Colors.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
