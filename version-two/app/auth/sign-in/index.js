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
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.replace('/(tabs)/mytrip')
        ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT);
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
      <TouchableOpacity style={{ position: "absolute", top: 20, right: 20 }} onPress={() => router.replace('/(tabs)/mytrip')}>
        <Text style={{ fontSize: 16, color: "#666" }}>Skip</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "Poppins-Bold",
          color: Colors.textPrimary,
        }}
      >
        Let's Sign You In
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "Poppins-Bold",
          color: Colors.textSecondary,
        }}
      >
        Welcome Back
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Poppins-Regular",
          color: Colors.textSecondary,
        }}
      >
        You've been missed!
      </Text>
      <View
        style={{
          marginTop: 40,
        }}
      >
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
      <View
        style={{
          marginTop: 20,
        }}
      >
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
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: Colors.gray,
            fontFamily: "Poppins-Regular",
          }}
        >
          Forgot Password?
        </Text>
      </View>
      {/* Sign in Button */}
      <View>
        <TouchableOpacity style={styles.button}
        >
          <Text style={styles.buttonText} onPress={onSignIn}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.white,
              borderColor: Colors.black,
              borderWidth: 1,
              marginTop: 10,
            },
          ]}
          onPress={() => router.push("/auth/sign-up")}
        >
          <Text style={[styles.buttonText, { color: Colors.black }]}>
            Create Account
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
    paddingVertical: 10,
  },
  buttonText: {
    width: "100%",
    alignItems: "center",
    color: Colors.white,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
