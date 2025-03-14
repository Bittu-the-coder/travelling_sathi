import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../../constants/Colors";
import { getIconComponent } from "../getIconComponent";

const OptionCard = ({ option, selectedTraveler }) => {
  return (
    <View
      style={[
        styles.card,
        selectedTraveler?.id === option?.id && {
          borderWidth: 2,
          borderColor: Colors.primary,
        }, // Corrected comparison
      ]}
    >
      <View style={styles.content}>
        <View
          style={{
            width: "60%",
          }}
        >
          <Text style={styles.title}>{option?.title}</Text>
          <Text style={styles.desc}>{option?.desc}</Text>
          <Text style={styles.people}>People: {option?.people}</Text>
        </View>
        {getIconComponent(option?.icon, 30, "#333")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
  },
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  desc: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  people: {
    fontSize: 12,
    color: "#999",
  },
});

export default OptionCard;
