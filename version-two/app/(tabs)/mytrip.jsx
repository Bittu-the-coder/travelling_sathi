// import React, { useEffect, useState } from "react";
// import { View, Text, ActivityIndicator } from "react-native";
// import { Colors } from "../../constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { auth, db } from "../../configs/FirebaseConfig";
// import UserTripList from "../../components/MyTrips/UserTripList";

// export default function MyTrip() {
//   const [userTrips, setUserTrips] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const user = auth.currentUser;

//   useEffect(() => {
//     if (user) {
//       GetMyTrips();
//     }
//   }, [user]);

//   const GetMyTrips = async () => {
//     setLoading(true);
//     setUserTrips([]); // Clear previous trips

//     try {
//       const q = query(
//         collection(db, "UserTrips"),
//         where("userEmail", "==", user?.email)
//       );

//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         console.log("No trips found for the user:", user?.email);
//       } else {
//         const trips = [];
//         querySnapshot.forEach((doc) => {
//           console.log((doc.id, " => ", doc.data()));
//           trips.push({ id: doc.id, ...doc.data() }); // Include document ID in the trip data
//         });
//         setUserTrips(trips); // Update state once with all trips
//       }
//     } catch (error) {
//       console.error("Error fetching trips:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View
//       style={{
//         padding: 25,
//         paddingTop: 40,
//         backgroundColor: Colors.white,
//         height: "100%",
//       }}
//     >
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{
//             fontFamily: "Poppins-Bold",
//             fontSize: 36,
//           }}
//         >
//           My Trip
//         </Text>
//         <Ionicons name="add-circle" size={30} color={Colors.black} />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color={Colors.black} />
//       ) : userTrips.length === 0 ? (
//         <StartNewTripCard />
//       ) : (
//         <UserTripList userTrips={userTrips} />
//       )}
//     </View>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import UserTripList from "../../components/MyTrips/UserTripList";
import { useRouter } from "expo-router";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetMyTrips();
    }
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    // setUserTrips([]);

    try {
      const q = query(
        collection(db, "UserTrips"),
        where("userEmail", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No trips found for the user:", user?.email);
      } else {
        const trips = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          trips.push({ id: doc.id, ...doc.data() }); // Include document ID in the trip data
        });
        setUserTrips(trips); // Update state once with all trips
        // console.log("User trips this comes with set user data:", userTrips);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 16,
        paddingTop: 35,
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      {/* Header */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 36,
          }}
        >
          My Trip
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/create-trip/search-place")}
        >
          <Ionicons name="add-circle" size={30} color={Colors.black} />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} />
      ) : userTrips.length === 0 ? (
        <StartNewTripCard />
      ) : (
        // Trip List using FlatList for better performance
        <UserTripList userTrips={userTrips} />
      )}
    </View>
  );
}
