import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../configs/FirebaseConfig";
import { useRouter } from "expo-router";

export default function Profile() {
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/images/user.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.displayName || "Guest User"}</Text>
        <Text style={styles.email}>{user?.email || "No email linked"}</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/edit-profile")}
        >
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={Colors.black}
          />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="settings-outline" size={24} color={Colors.black} />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/security")}
        >
          <Ionicons name="lock-closed-outline" size={24} color={Colors.black} />
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => auth.signOut()}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
