"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKitchenSet,
  faPlane,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import HotelRecommendations from "@/components/Hotels";
import FlightCard from "@/components/Flights";
import { useParams } from "next/navigation";

const TripPlanner = () => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flightVisible, setFlightVisible] = useState(false);
  const params = useParams();
  const api=process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await fetch(
          `${api}/iterate/${params.tripId}`
        );
        const tripDataFetched = await response.json();
        if (tripDataFetched.success) {
          setTripData(tripDataFetched.data);
        } else {
          console.error("Failed to fetch trip data");
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTripData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tripData) {
    return <div>Failed to load trip data.</div>;
  }

  const shareBtnFun = async()=>{
    const shareData = {
      title: 'Tanny Travels',
      text: `Check out my trip to ${tripData.destination}!`,
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
      console.log('Trip shared successfully');
    } catch (error) {
      console.error('Error sharing trip:', error);
    }
    
  }

  const saveBtnFun = async () => {
    window.print();
  };

  return (
    <div id="page-content" className="max-w-3xl mx-auto bg-black text-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-light">Trip Planner</h1>
        </div>
        <p className="text-red-500 text-sm mb-2">Plan your dream trip.</p>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <div>{tripData.travelDays || "N/A"} days</div>
          <div>•</div>
          <div>{tripData.destination || "N/A"}</div>
          <div>•</div>
          <div>{tripData.travelStyle || "N/A"}</div>
        </div>
      </div>

      <div className="border border-gray-700 p-2 relative">
        <div className="absolute top-4 right-4 flex space-x-4 z-10">
        <button
onClick={saveBtnFun}

              className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Save</span>
            </button>
            <button
            onClick={shareBtnFun}
              className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Share</span>
            </button>
        </div>

        <Image src={tripData.image || '/chile1.jpeg'} alt="Chile" height={1080} width={1920} />

        <div
  className={`mt-5 flex space-x-2 border border-gray-700 p-3 rounded-2xl ${
    flightVisible ? "pb-5" : ""
  }`}
>
  <div className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center">
    <FontAwesomeIcon icon={faPlane} className="w-4 h-4 text-black" />
  </div>
  <div className="flex-1">Find Flights</div>
  <button
    className={`${
      flightVisible ? "bg-red-800 text-lg px-6 py-3" : "bg-red-600 px-4 py-2"
    } rounded-lg text-white transition-all duration-300`}
    onClick={() => setFlightVisible(!flightVisible)}
  >
    {flightVisible ? "Hide" : "Show"}
  </button>
  <div className="w-full mt-3">
    {flightVisible && <FlightCard flights={tripData.flights} />}
  </div>
</div>


        { tripData.modelResponse && tripData.modelResponse.map((dayPlan) => (
          <div key={dayPlan.day} className="mt-5">
            <div className="mt-2 font-bold text-xl">Day {dayPlan.day}:</div>
            <div className="flex flex-col">
              {dayPlan.activities.map((activity, index) => (
                <div
                  key={index}
                  className="mt-5 border border-gray-700 p-3 flex flex-col rounded-2xl"
                >
                  <span className="mb-2 text-gray-300 text-sm">
                    {activity.time}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faKitchenSet}
                        className="w-4 h-4 text-black"
                      />
                    </span>
                    <span className="font-bold text-xl">
                      {activity.activity_name}
                    </span>
                  </div>
                  <div className="mt-2 text-gray-300 text-sm">
                    {activity.activity_description}
                  </div>
                  {activity.redirect_link && (
                    <div className="flex items-center space-x-2 text-red-700 mt-5">
                      <span>
                        <FontAwesomeIcon icon={faTicket} className="w-5" />
                      </span>
                      <a
                        href={activity.redirect_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-700 text-sm"
                      >
                        Book a Tour
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
         {tripData.hotels && <HotelRecommendations hotels={tripData.hotels} />} 
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
