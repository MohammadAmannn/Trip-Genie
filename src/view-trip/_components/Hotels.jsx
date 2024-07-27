import React from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}+${encodeURIComponent(hotel.address)}`}
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img
                src={hotel.image || "/mylogo.jpeg"}
                alt="no image found"
                className="rounded-lg"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel.name}</h2>
                <h2 className="text-xs text-gray-500">📍{hotel.address}</h2>
                <h2 className="text-xs text-black-500">💰{hotel.price}</h2>
                <h2 className="text-md text-gray-500">⭐{hotel.rating}</h2>
                <h2 className="text-md text-blue-500">📰{hotel.description}</h2>
                {/* Add other hotel details here if needed */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
