import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("../assets/images/login.jpg")}
        style={{
          width: "100%",
          height: 400,
          resizeMode: "cover",
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Poppins-Bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Travelling Sathi
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins-Regular",
            textAlign: "center",
            marginTop: 20,
            marginHorizontal: 20,
            color: Colors.gray,
          }}
        >
          Discover the best places in the world for your next holiday
          destination.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/sign-in")}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Bold",
              textAlign: "center",
              color: Colors.white,
              backgroundColor: Colors.black,
              paddingVertical: 15,
              paddingHorizontal: 50,
              borderRadius: 30,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    marginTop: -20,
    height: " 100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
});
