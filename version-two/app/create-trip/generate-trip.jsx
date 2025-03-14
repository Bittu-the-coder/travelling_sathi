import { View, Text, Animated } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../contexts/CreateTripContext";
import { AiPrompt } from "../../constants/Options";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Config from "react-native-config";

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  // Initialize Google Generative AI
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBFjIIxhkvWk35f3vOKCtO3IDklvOme3Q4"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const GenerateAiTrip = async () => {
    if (!tripData || !user) return; // Guard clause to ensure tripData and user exist

    setLoading(true);

    // try {
    //   // Generate the final prompt
    //   const FINAL_PROMPT = AiPrompt.replace(
    //     "{location}",
    //     tripData?.location?.name
    //   )
    //     .replace("{traveler}", tripData?.traveler?.title)
    //     .replace("{startDate}", tripData?.startDate)
    //     .replace("{endDate}", tripData?.endDate)
    //     .replace("{budget}", tripData?.budget)
    //     .replace("{totalDays}", tripData?.totalNoOfDate)
    //     .replace("{totalNights}", tripData?.totalNoOfDate - 1)
    //     .replace("{totalDays}", tripData?.totalNoOfDate)
    //     .replace("{totalNights}", tripData?.totalNoOfDate - 1);

    //   console.log("Final Prompt:", FINAL_PROMPT);

    //   // Start a chat session and send the prompt
    //   const chatSession = model.startChat({
    //     history: [
    //       {
    //         role: "user",
    //         parts: [{ text: FINAL_PROMPT }],
    //       },
    //     ],
    //   });

    //   const result = await chatSession.sendMessage(FINAL_PROMPT);
    //   const tripResp = result.response.text();

    //   // console.log("AI Response:", tripResp);

    //   // Save trip data to Firestore
    //   const docId = Date.now().toString();
    //   await setDoc(doc(db, "UserTrips", docId), {
    //     userEmail: user.email,
    //     tripPlan: tripResp,
    //     tripData: JSON.stringify(tripData),
    //     docId: docId,
    //   });
    //   console.log("Trip saved to Firestore with ID:", docId);
    //   router.push("/(tabs)/mytrip");
    // } catch (error) {
    //   console.error("Error generating trip or saving to Firestore:", error);
    // } finally {
    //   setLoading(false);
    // }

    try {
      // Generate the AI prompt
      const FINAL_PROMPT = `Generate a structured JSON itinerary for a trip.
    Format the response as valid JSON without any extra text.
    Data should be structured as:
    {
      "tripDetails": {
        "location": { "name": "${tripData?.location?.name}" },
        "startDate": "${tripData?.startDate}",
        "endDate": "${tripData?.endDate}",
        "duration": "${tripData?.totalNoOfDate} Days / ${
        tripData?.totalNoOfDate - 1
      } Nights",
        "traveler": "${tripData?.traveler?.title}",
        "budget": "${tripData?.budget}"
      },
      "flightDetails": [...],
      "hotelOptions": [...],
      "placesToVisit": [...],
      "dailyItinerary": [...],
      "budgetBreakdown": {...},
      "FactsAboutLocation": [...],
      "notes": "Ensure this response is valid JSON only."
    }`;

      console.log("Final Prompt:", FINAL_PROMPT);

      // Start chat session with AI
      const chatSession = model.startChat({
        history: [{ role: "user", parts: [{ text: FINAL_PROMPT }] }],
      });

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      let tripResp = result.response.text();

      console.log("Raw AI Response:", tripResp);

      // 🔹 Ensure valid JSON response
      let structuredTrip;
      try {
        // Remove any unwanted text before or after JSON using regex
        const jsonMatch = tripResp.match(/{[\s\S]*}/);
        if (jsonMatch) {
          tripResp = jsonMatch[0]; // Extract only JSON part
        }
        structuredTrip = JSON.parse(tripResp);
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        return;
      }

      // Prepare Firestore document
      const docId = Date.now().toString();
      const tripDocument = {
        userEmail: user.email,
        tripDetails: structuredTrip.tripDetails,
        flightDetails: structuredTrip.flightDetails,
        hotelOptions: structuredTrip.hotelOptions,
        placesToVisit: structuredTrip.placesToVisit,
        dailyItinerary: structuredTrip.dailyItinerary,
        budgetBreakdown: structuredTrip.budgetBreakdown,
        FactsAboutLocation: structuredTrip.FactsAboutLocation,
        notes: structuredTrip.notes,
        docId: docId,
      };

      // Save structured trip data to Firestore
      await setDoc(doc(db, "UserTrips", docId), tripDocument);

      console.log("Trip saved successfully with ID:", docId);
      router.push("/(tabs)/mytrip");
    } catch (error) {
      console.error("Error generating trip or saving to Firestore:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, [tripData]);

  // Animation for the loading spinner
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // 1 second per rotation
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.white,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Text
        style={{
          fontSize: 50,
          marginBottom: 30,
          transform: [{ rotate: spin }],
        }}
      >
        ⏳
      </Animated.Text>

      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 36,
          marginBottom: 20,
          textAlign: "center",
          color: Colors.black,
        }}
      >
        Please Wait...
      </Text>

      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
          textAlign: "center",
          color: Colors.gray,
        }}
      >
        We are working to generate your dream trip
      </Text>
    </View>
  );
}
