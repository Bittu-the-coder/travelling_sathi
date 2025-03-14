
export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "face-man",
    people: "1"
  },
  {
    id: 2,
    title: "Couple",
    desc: "A romantic getaway for two",
    icon: "heart",
    people: "2"
  },
  {
    id: 3,
    title: "Family",
    desc: "A fun-filled adventure with the whole family",
    icon: "home",
    people: "4"
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends enjoying a trip together",
    icon: "group",
    people: "3-6"
  },
  // {
  //   id: 5,
  //   title: "Solo Backpacker",
  //   desc: "An adventurous solo journey with a backpack",
  //   icon: "backpack",
  //   people: "1"
  // },
  // {
  //   id: 6,
  //   title: "Business Trip",
  //   desc: "Traveling for work and meetings",
  //   icon: "briefcase",
  //   people: "1-2"
  // },
  {
    id: 7,
    title: "Group Tour",
    desc: "Exploring new places with a guided group",
    icon: "map",
    people: "6+"
  },
  // {
  //   id: 8,
  //   title: "Adventure Seekers",
  //   desc: "Thrill-seekers looking for adrenaline-pumping activities",
  //   icon: "airplane",
  //   people: "2-4"
  // }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: "apple-safari"
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balance between cost and comfort',
    icon: "account-cash"
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Experience the best of everything',
    icon: "diamond"
  },
  {
    id: 4,
    title: 'All-Inclusive',
    desc: 'Everything covered in one price',
    icon: "airplane"
  },
];

// export const AiPrompt = `Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNights} Night for {traveler} with a {budget}
// budget with a Flight details , Flight Price with Booking url, Hotels options list with HotelName,
// Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit
// nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to
// travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON Format `

export const AiPrompt = `
Generate a detailed travel plan for the location: {location}, from {startDate} to {endDate}, spanning {totalDays} days and {totalNights} nights, for {traveler} with a budget of {budget}.

The travel plan should include the following details:

1. **Flight Details**:
   - Flight information (airline, departure/arrival times, duration).
   - Flight price.
   - Booking URL.

2. **Hotel Options**:
   - List of hotels with:
     - Hotel name.
     - Hotel address.
     - Price per night.
     - Hotel image URL.
     - Geo coordinates (latitude, longitude).
     - Rating.
     - Description.

3. **Places to Visit**:
   - List of nearby attractions with:
     - Place name.
     - Place details (description).
     - Place image URL.
     - Geo coordinates (latitude, longitude).
     - Ticket pricing (if applicable).
     - Recommended time to visit.

4. **Daily Itinerary**:
   - A day-by-day plan for {totalDays} days, including:
     - Best time to visit each location.
     - Travel time between locations.
     - Activities and recommendations for each day.

5. **Budget Breakdown**:
   - A summary of estimated costs for flights, hotels, and activities within the specified budget.

Provide the output in a well-structured JSON format.
`;
