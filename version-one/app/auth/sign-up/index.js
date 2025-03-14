import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../configs/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onCreateAccount = () => {
    if (
      email?.length === 0 ||
      password?.length === 0 ||
      username?.length === 0
    ) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
        }}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "Poppins-Bold",
          color: Colors.textPrimary,
        }}
      >
        Create Account
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: Colors.textSecondary,
          fontFamily: "Poppins-Bold",
        }}
      >
        Join Us Today
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Poppins-Regular",
          color: Colors.textSecondary,
          marginTop: 20,
        }}
      >
        Start your journey with us!
      </Text>

      {/* Input Fields */}
      <View style={{ marginTop: 40 }}>
        <Text
          style={{ fontFamily: "Poppins-Medium", color: Colors.textPrimary }}
        >
          Username
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
            marginTop: 10,
            borderRadius: 10,
            color: Colors.textPrimary,
          }}
          placeholder="Choose a username"
          placeholderTextColor={Colors.gray}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{ fontFamily: "Poppins-Medium", color: Colors.textPrimary }}
        >
          Email
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
            marginTop: 10,
            borderRadius: 10,
            color: Colors.textPrimary,
          }}
          placeholder="Enter your email"
          placeholderTextColor={Colors.gray}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{ fontFamily: "Poppins-Medium", color: Colors.textPrimary }}
        >
          Password
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
            marginTop: 10,
            borderRadius: 10,
            color: Colors.textPrimary,
          }}
          secureTextEntry={true}
          placeholder="Create a password"
          placeholderTextColor={Colors.gray}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* Buttons */}
      <View>
        <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.white,
              borderColor: Colors.black,
              borderWidth: 1,
              marginTop: 12,
            },
          ]}
          onPress={() => router.push("/auth/sign-in")}
        >
          <Text style={[styles.buttonText, { color: Colors.black }]}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.black,
    borderRadius: 15,
    marginTop: 20,
    paddingVertical: 12,
  },
  buttonText: {
    width: "100%",
    color: Colors.white,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
