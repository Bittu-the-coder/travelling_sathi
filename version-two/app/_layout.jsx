// import React, { useState } from "react";
// import { Stack } from "expo-router";
// import { useFonts } from "expo-font";
// import { CreateTripContext } from "../contexts/CreateTripContext";

// export default function RootLayout() {
//   useFonts({
//     "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//     "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//     "Lobster-Regular": require("../assets/fonts/Lobster-Regular.ttf"),
//   });
//   const [tripData, setTripData] = useState([]);
//   return (
//     <CreateTripContext.Provider value={{ tripData, setTripData }}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" />
//         {/* <Stack.Screen name="index" /> */}
//       </Stack>
//     </CreateTripContext.Provider>
//   );
// }
import React, { useState } from "react";
import { Stack, useRouter, usePathname } from "expo-router"; // Import usePathname
import { View, TouchableOpacity, Text } from "react-native";
import Draggable from "react-native-draggable"; // Import Draggable
import { CreateTripContext } from "../contexts/CreateTripContext";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const [tripData, setTripData] = useState([]);
  const router = useRouter();
  const currentPath = usePathname(); // Get the current screen path

  // Function to navigate to chat screen
  const navigateToChat = () => {
    router.push("/chatbot/ChatbotScreen"); // Make sure "/chat" is the correct route
  };

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>

        {/* Show chatbot button on all screens EXCEPT the chat screen */}
        {currentPath !== "/chatbot/ChatbotScreen" && (
          <Draggable
            x={300} // Initial X position
            y={600} // Initial Y position
            minX={0} // Prevent dragging out of screen
            minY={0}
            maxX={360} // Adjust max width according to your layout
            maxY={740} // Adjust max height according to your layout
          >
            <TouchableOpacity
              onPress={navigateToChat}
              style={{
                backgroundColor: Colors.black,
                padding: 15,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
                elevation: 5, // For Android shadow
              }}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </Draggable>
        )}
      </View>
    </CreateTripContext.Provider>
  );
}
