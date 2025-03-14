import React, { useState } from "react";
import { View, TouchableOpacity, Animated, PanResponder } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router"; // Import to check current route

export default function ChatbotButton() {
  const router = useRouter();
  const segments = useSegments(); // Get current route segments
  const isChatScreen = segments.includes("chat"); // Check if user is in chat screen

  // Draggable button position
  const [position] = useState(new Animated.ValueXY({ x: 300, y: 600 }));

  // PanResponder for dragging functionality
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => position.flattenOffset(),
  });

  if (isChatScreen) return null; // Hide button on chat screen

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.chatbotButton,
        { transform: position.getTranslateTransform() },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push("/chat")}
        style={styles.button}
      >
        <Ionicons name="chatbubble-ellipses" size={30} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = {
  chatbotButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    zIndex: 1000,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
};
