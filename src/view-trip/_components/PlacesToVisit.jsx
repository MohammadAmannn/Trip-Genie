import React from 'react';

function PlacesToVisit({ trip }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 md:p-10 rounded-lg shadow-lg w-full max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 glow-text">Places To Visit</h2>
      <div className="space-y-6">
        {trip?.tripData?.bestTimeToVisit && (
          <div className="p-4 border border-blue-300 rounded-lg bg-blue-700 shadow-lg">
            <h3 className="font-medium text-lg md:text-xl text-white">Best Time to Visit</h3>
            <p className="text-gray-200">{trip.tripData.bestTimeToVisit}</p>
          </div>
        )}
        {trip?.tripData?.itinerary?.length ? (
          trip.tripData.itinerary.map((day, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-800 shadow-lg">
              <h3 className="font-semibold text-lg md:text-xl text-white mb-4">Day {day.day}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {day.plan.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md transition-transform hover:bg-gray-800 hover:shadow-xl hover:scale-105 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold text-white">{place.location}</h4>
                      <p className="text-gray-400 mt-1 md:mt-2">{place.details}</p>
                      <div className="mt-2 md:mt-4 space-y-1 text-gray-300">
                        <p>💵 Price: {place.ticketPricing}</p>
                        <p>⏰Best Time To visit: {place.time}</p>
                        {/* <p>🕒 Time to Travel: {place.timeToTravel}</p> */}
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(place.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-medium transition"
                      >
                        View Image
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No places to visit listed in the itinerary.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
