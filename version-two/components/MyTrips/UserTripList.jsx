// import { View, Text, Image, TouchableOpacity } from "react-native";
// import React from "react";
// import moment from "moment";
// import { Colors } from "../../constants/Colors";
// import UserTripCard from "./UserTripCard";
// import { useRouter } from "expo-router";

// export default function UserTripList({ userTrips }) {
//   const tripData = userTrips[0];
//   console.log("trip data", tripData);
//   console.log("this is 0th index: ", tripData.tripDetails);
//   const tripDetails = tripData?.tripDetails;

//   const router = useRouter();

//   if (!userTrips) {
//     return <Text>No trip details available</Text>;
//   }
//   return (
//     <View>
//       <View style={{ marginTop: 20 }}>
//         <Image
//           source={require("../../assets/images/default.jpg")}
//           style={{
//             width: "100%",
//             height: 240,
//             borderRadius: 20,
//             marginRight: 10,
//           }}
//         />
//       </View>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
//         {tripDetails.location.name || "Location name"}
//       </Text>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text style={{ fontSize: 16, color: Colors.gray }}>
//           {moment(tripDetails.startDate).format("MMM DD, YYYY") || "Start Date"}
//         </Text>
//         <Text style={{ fontSize: 16, color: Colors.gray }}>
//           🚗 {tripDetails.traveler || "Traveler"}
//         </Text>
//       </View>
//       <TouchableOpacity
//         style={{
//           backgroundColor: Colors.black,
//           padding: 10,
//           borderRadius: 15,
//           marginTop: 10,
//         }}
//         onPress={() => {
//           try {
//             const jsonString = JSON.stringify(tripData); // Ensure proper conversion
//             router.push({
//               pathname: "/my-plans/tripDetails",
//               params: {
//                 tripData: jsonString,
//               },
//             });
//           } catch (error) {
//             console.error("Error stringifying tripData:", error);
//           }
//         }}
//       >
//         <Text
//           style={{
//             color: Colors.white,
//             textAlign: "center",
//             fontFamily: "Poppins-Bold",
//           }}
//         >
//           See Your Plan
//         </Text>
//       </TouchableOpacity>

//       <UserTripCard tripData={tripData} />
//     </View>
//   );
// }

import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const router = useRouter();

  if (!userTrips || userTrips.length === 0) {
    return <Text>No trips available</Text>;
  }

  const renderTrip = ({ item }) => {
    const tripDetails = item?.tripDetails;

    return (
      <View
        style={{
          marginBottom: 20,
          marginHorizontal: 4,
          // borderWidth: 1,
          // borderRadius: 16,
          // padding: 4,
          // borderColor: Colors.grayLight,
        }}
      >
        {/* Trip Image */}
        <View>
          <Image
            source={require("../../assets/images/default.jpg")}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 20,
            }}
          />
        </View>

        {/* Trip Details */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
          {tripDetails?.location?.name || "Location Name"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: Colors.gray }}>
            {tripDetails?.startDate
              ? moment(tripDetails.startDate).format("MMM DD, YYYY")
              : "Start Date"}
          </Text>
          <Text style={{ fontSize: 16, color: Colors.gray }}>
            🚗 {tripDetails?.traveler || "Traveler"}
          </Text>
        </View>

        {/* "See Your Plan" Button */}
        <TouchableOpacity
          style={{
            backgroundColor: Colors.black,
            padding: 10,
            borderRadius: 15,
            marginTop: 10,
          }}
          onPress={() => {
            try {
              const jsonString = JSON.stringify(item); // Ensure proper conversion
              router.push({
                pathname: "/my-plans/tripDetails",
                params: {
                  tripData: jsonString,
                },
              });
            } catch (error) {
              console.error("Error stringifying tripData:", error);
            }
          }}
        >
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "Poppins-Bold",
            }}
          >
            See Your Plan
          </Text>
        </TouchableOpacity>

        {/* Trip Card */}
        <UserTripCard tripData={item} />
      </View>
    );
  };

  return (
    <FlatList
      data={userTrips}
      keyExtractor={(item) => item.id}
      renderItem={renderTrip}
      showsVerticalScrollIndicator={false}
    />
  );
}
