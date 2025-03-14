import React from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

/**
 * Dynamically returns the appropriate icon component based on the icon name.
 * @param {string} iconName - The name of the icon.
 * @param {number} size - The size of the icon.
 * @param {string} color - The color of the icon.
 * @returns {React.Component} - The icon component.
 */
export const getIconComponent = (iconName, size, color) => {
  try {
    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  } catch (error) {
    try {
      return <Ionicons name={iconName} size={size} color={color} />;
    } catch (error) {
      try {
        return <Ionicons name="alert-circle" size={size} color={color} />;
      } catch (error) {
        return <FontAwesome name="money" size={size} color={color} />;
      }
    }
  }
};
