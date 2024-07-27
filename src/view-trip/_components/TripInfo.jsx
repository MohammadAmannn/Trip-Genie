import React from "react";

// This functional component receives a 'trip' object as a prop and displays the trip's information
function TripInfo({ trip }) {
  return (
    <div>
      {/* Display a static image */}
      <img src="/mylogo.jpeg" alt="Trip image" className="h-[300px] w-full object-cover rounded-xl"/>
      <div className="my-5 flex flex-col gap-2">
        {/* Display the destination name if available */}
        <h2 className="font-bold text-2xl">{trip?.userChoice?.Destination}</h2>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black-200">📅{trip?.userChoice?.NoOfDays} Days</h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black-200">🏩{trip?.userChoice?.Members} </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black-200">💸{trip?.userChoice?.Budget} $</h2>
        </div>
      </div>
    </div>
  );
}

export default TripInfo;
