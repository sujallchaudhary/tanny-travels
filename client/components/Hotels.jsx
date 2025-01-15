import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const HotelRecommendations = ({ hotels }) => {
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8">Recommended Hotels</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {hotels.map((hotel) => (
            <Card
              key={hotel.hotelId}
              className="relative w-60 overflow-hidden text-white rounded-xl"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={hotel.photoUrl}
                  alt={hotel.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardContent className="absolute bottom-0 left-0 right-0 p-2 bg-black">
                <h2 className="font-bold mb-3 text-center">{hotel.name}</h2>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="text-center">
                    <p>
                      <span className="line-through">
                      ₹{hotel.price.strikethroughPrice?.value.toFixed(2)}
                      </span>{" "}
                      <span className="font-bold">
                      ₹{hotel.price.grossPrice.value.toFixed(2)}
                      </span>
                    </p>
                    {hotel.price.benefitBadges &&
                      hotel.price.benefitBadges.map((badge, index) => (
                        <span
                          key={index}
                          className="bg-green-500 text-xs px-2 py-1 rounded-full"
                        >
                          {badge.text}
                        </span>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelRecommendations;
