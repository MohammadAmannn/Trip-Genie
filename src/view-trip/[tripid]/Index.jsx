import { db } from "@/service/firebaseConfig"; // Import the Firestore database configuration
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods to interact with documents
import React, { useEffect, useState } from "react"; // Import React hooks
import { useParams } from "react-router-dom"; // Import hook to get URL parameters
import TripInfo from "../_components/TripInfo"; // Import the TripInfo component
import Hotels from "../_components/Hotels"; // Import the Hotels component
import PlacesToVisit from "../_components/PlacesToVisit";

function Viewtrip() {
  const { tripid } = useParams(); // Get the 'tripid' parameter from the URL
  const [trip, setTrip] = useState(); // State to hold the trip data

  useEffect(() => {
    if (tripid) {
      GetTripData(); // Fetch trip data when 'tripid' changes
    }
  }, [tripid]); // Dependency array includes 'tripid' to trigger useEffect when it changes

  // Function to fetch trip data from Firestore
  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripid); // Reference to the specific document
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
      if (docSnap.exists()) {
        const data = docSnap.data(); // Get the document data
        console.log("Document data:", data); // Log the data object, not call it as a function
        setTrip(data); // Set the trip state with the fetched data
      } else {
        console.log("No such document!"); // Document does not exist
      }
    } catch (error) {
      console.error("Error fetching trip data:", error); // Log any errors that occur during fetching
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl">
      {/* Render the TripInfo component with the trip data */}
      <TripInfo trip={trip} />

      {/* Render the Hotels component with the trip data*/}
      <Hotels trip={trip} />
      {/* daily paln */}
      <PlacesToVisit trip={trip}/>
    </div>
  );
}

export default Viewtrip;