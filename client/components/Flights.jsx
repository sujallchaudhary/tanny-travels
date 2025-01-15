"use client";
import React from "react";
import Image from "next/image";

const FlightCard = ({ flights }) => {
  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Flight Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={flight.airLine.logo}
                  alt={flight.airLine.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{flight.airLine.name}</h2>
                <span className="text-sm text-gray-400">Code: {flight.airLine.code}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Flight Number: {flight.flightInfo.flightNumber}</p>
              <p className="text-sm text-gray-400">
                Operating Carrier: {flight.flightInfo.carrierInfo.operatingCarrier}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Departure</p>
                <p className="text-lg font-semibold">
                  {new Date(flight.departureTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Arrival</p>
                <p className="text-lg font-semibold">
                  {new Date(flight.arrivalTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="text-sm text-gray-400">
              <p>
                Duration:{" "}
                {Math.floor(
                  (new Date(flight.arrivalTime) - new Date(flight.departureTime)) /
                    (1000 * 60)
                )}{" "}
                minutes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightCard;
