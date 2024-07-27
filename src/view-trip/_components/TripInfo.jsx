import React from "react";

function TripInfo({ trip }) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg rounded-lg overflow-hidden">
      {/* Display a static image */}
      <img src="/mylogo.jpeg" alt="Trip image" className="h-[300px] w-full object-cover rounded-t-lg"/>
      <div className="p-4 flex flex-col gap-4 bg-black bg-opacity-60 rounded-b-lg">
        {/* Display the destination name if available */}
        <h2 className="text-3xl font-semibold">{trip?.userChoice?.Destination}</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 text-white font-medium">
            <span className="text-xl mr-2">📅</span>{trip?.userChoice?.NoOfDays} Days
          </div>
          <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 text-white font-medium">
            <span className="text-xl mr-2">🏩</span>{trip?.userChoice?.Members}
          </div>
          <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 text-white font-medium">
            <span className="text-xl mr-2">💸</span>{trip?.userChoice?.Budget} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripInfo;
