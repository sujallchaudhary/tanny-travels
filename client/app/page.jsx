"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Combobox from "@/components/ui/Combobox";
import Radar from "radar-sdk-js";
import TourRecommendation from "@/components/Tour";

const Page = () => {
  const router = useRouter();
  const radarOriginAutocompleteRef = useRef(null);
  const radarDestinationAutocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState(null);
  const api="http://localhost:4500";

  const travelDaysOptions = [
    { value: "3", label: "1-3 days" },
    { value: "5", label: "4-7 days" },
    { value: "10", label: "8-14 days" },
    { value: "15", label: "15+ days" },
  ];

  const transportOptions = [
    { value: "car", label: "Car" },
    { value: "train", label: "Train" },
    { value: "plane", label: "Plane" },
    { value: "bus", label: "Bus" },
  ];

  const travelStyleOptions = [
    { value: "luxury", label: "Luxury" },
    { value: "budget", label: "Budget" },
    { value: "adventure", label: "Adventure" },
    { value: "relaxation", label: "Relaxation" },
  ];

  const [formData, setFormData] = useState({
    travelDays: "",
    origin: "",
    destination: "",
    transport: "",
    travelStyle: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.travelDays ||
      !formData.origin ||
      !formData.destination ||
      !formData.transport ||
      !formData.travelStyle ||
      !formData.date
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(api+"/iterate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setLoading(false);
        router.push("/iterate/" + data.tripId);
      } else {
        setLoading(false);
        alert("Failed to submit form data");
      }
    } catch (error) {
      setLoading(false);
      alert("Error submitting form data:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    Radar.initialize("prj_test_pk_bcd614c2d83a5c7f78c21d512edeb19dba1627cf");

    radarOriginAutocompleteRef.current = Radar.ui.autocomplete({
      container: "origin-autocomplete",
      placeholder: "Search Origin...",
      onSelection: (address) => {
        const { addressLabel } = address;
        handleChange("origin", addressLabel);
      },
    });
    radarDestinationAutocompleteRef.current = Radar.ui.autocomplete({
      container: "destination-autocomplete",
      placeholder: "Search Destination...",
      onSelection: (address) => {
        const { addressLabel } = address;
        handleChange("destination", addressLabel);
      },
    });

    return () => {
      radarOriginAutocompleteRef.current?.remove();
      radarDestinationAutocompleteRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api+"/iterate");
      const data = await response.json();
      if (data.success) {
        setTripData(data.data);
      } else {
        console.error("Failed to fetch trips data");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="relative min-h-[75vh] w-full">
          <Image
            src="/homepagebg.jpeg"
            alt="Homepage background"
            className="absolute h-full w-full object-cover"
            priority
            width={1920}
            height={1080}
          />
          <div className="absolute top-4 md:top-10 left-1/2 transform -translate-x-1/2 text-center z-20 w-full px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Tanny Travels
            </h1>
            <p className="text-base md:text-lg text-red-500 mt-2">
              Plan your dream trip.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute top-1/2 left-1/2 w-[90%] md:w-[85%] lg:w-[70%] transform -translate-x-1/2 -translate-y-1/3 p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>

            <div className="relative z-10 h-full flex items-center justify-center flex-col space-y-6 md:space-y-8 lg:space-y-16 py-6 md:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="text-black flex flex-col items-center">
                  <Combobox
                    options={travelDaysOptions}
                    placeholder="Travel days"
                    searchPlaceholder="Search travel days..."
                    onChange={(value) => handleChange("travelDays", value)}
                  />
                </div>
                <div className="text-black bg-white flex flex-col items-center relative">
                  <div
                    className="absolute bg-white z-50  text-center w-full  rounded-md"
                    id="origin-autocomplete"
                  ></div>
                </div>
                <div className="text-black bg-white flex flex-col items-center relative">
                  <div
                    className="absolute bg-white z-50 text-center w-full  rounded-md"
                    id="destination-autocomplete"
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-black flex flex-col items-center">
                  <Combobox
                    options={transportOptions}
                    placeholder="Means of transport"
                    searchPlaceholder="Search transport..."
                    onChange={(value) => handleChange("transport", value)}
                  />
                </div>
                <div className="text-black flex flex-col items-center">
                  <Combobox
                    options={travelStyleOptions}
                    placeholder="Travel style"
                    searchPlaceholder="Search travel style..."
                    onChange={(value) => handleChange("travelStyle", value)}
                  />
                </div>
                <div className="text-black flex flex-col items-center">
                  <input
                    required={true}
                    type="date"
                    className="px-4 py-2 rounded-lg w-full"
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-4 md:px-6 py-2 md:py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition text-sm md:text-base w-full md:w-auto"
              >
                {loading ? "Loading..." : "✨Plan Trip"}
              </button>
              {loading && (
                <div className="text-white">
                  Our AI model is generating a trip plan for you this might take
                  30-35 seconds. please wait...
                </div>
              )}
            </div>
          </form>
        </div>
        {tripData && <TourRecommendation tours={tripData} />}
      </div>
    </>
  );
};

export default Page;
