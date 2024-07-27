import React from 'react';

function PlacesToVisit({ trip }) {
  return (
    <div className="bg-gray-100 p-6 md:p-10 rounded-lg shadow-lg w-full max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">Places To Visit</h2>
      <div className="space-y-4">
        {trip?.tripData?.bestTimeToVisit && (
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h3 className="font-medium text-lg md:text-xl text-blue-800">Best Time to Visit</h3>
            <p className="text-gray-700">{trip.tripData.bestTimeToVisit}</p>
          </div>
        )}
        {trip?.tripData?.itinerary?.length ? (
          trip.tripData.itinerary.map((day, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-lg md:text-xl text-gray-700 mb-4">Day {day.day}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {day.plan.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow transition transform hover:bg-gray-100 hover:shadow-md hover:scale-105 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold text-gray-800">{place.location}</h4>
                      <p className="text-gray-600 mt-1 md:mt-2">{place.details}</p>
                      <div className="mt-2 md:mt-4 space-y-1 text-gray-500">
                        <p>⏰ Time: {place.time}</p>
                        <p>💵 Ticket Pricing: {place.ticketPricing}</p>
                        <p>🕒 Time to Travel: {place.timeToTravel}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(place.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium transition"
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
          <p className="text-center text-gray-600">No places to visit listed in the itinerary.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
