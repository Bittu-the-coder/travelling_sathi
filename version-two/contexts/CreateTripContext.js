import React, { createContext, useState } from "react";

export const CreateTripContext = createContext();

export const CreateTripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    location: {
      name: "",
      latitude: null,
      longitude: null,
      photoRef: null,
      photoUrl: null,
    },

  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </CreateTripContext.Provider>
  );
};