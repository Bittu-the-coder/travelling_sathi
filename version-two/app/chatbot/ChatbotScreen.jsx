import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { getAIResponse } from "../../configs/ChatBotService"; // Import AI function
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export function ChatbotScreen() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  // Function to simulate AI typing effect
  const simulateTypingEffect = (response, callback) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < response.length) {
        callback(response.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 0);
  };

  // Handle user message submission
  const handleSend = async () => {
    if (!userInput.trim()) return;

    setIsTyping(true);
    setChatHistory((prev) => [...prev, { role: "user", text: userInput }]);

    const aiResponse = await getAIResponse(userInput);
    simulateTypingEffect(aiResponse, (partialResponse) => {
      setChatHistory((prev) => {
        const updatedHistory = [...prev];
        const lastMessage = updatedHistory[updatedHistory.length - 1];

        if (lastMessage && lastMessage.role === "ai") {
          updatedHistory[updatedHistory.length - 1] = {
            ...lastMessage,
            text: partialResponse,
          };
        } else {
          updatedHistory.push({ role: "ai", text: partialResponse });
        }

        return updatedHistory;
      });
    });

    setIsTyping(false);
    setUserInput("");
  };

  // Auto-scroll to the bottom of chat
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Chatbot</Text>

      {/* Chat Messages */}
      <ScrollView ref={scrollViewRef} style={styles.chatBox}>
        {chatHistory.map((msg, index) => (
          <View
            key={index}
            style={msg.role === "user" ? styles.userBubble : styles.aiBubble}
          >
            {msg.role === "ai" ? (
              <Markdown>{msg.text}</Markdown>
            ) : (
              <Text style={styles.text}>{msg.text}</Text>
            )}
          </View>
        ))}

        {/* Typing Indicator */}
        {/* {isTyping && (
          <View style={styles.aiBubble}>
            <ActivityIndicator size="small" color="#000" />
            <Text style={styles.typingText}>Typing...</Text>
          </View>
        )} */}
      </ScrollView>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me something..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.white },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chatBox: { flex: 1, marginBottom: 10 },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "95%",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: Colors.backgroundLight,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "95%",
  },
  text: { fontSize: 16, color: "#333" },
  typingText: { marginLeft: 5, fontStyle: "italic", color: "#555" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: Colors.black,
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
});

export default ChatbotScreen;
