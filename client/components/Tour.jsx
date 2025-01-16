import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const TourRecommendation = ({ tours }) => {
  return (
    <div className="w-full px-4 py-8  bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Recommended Tours
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <Link key={tour._id} href={`/iterate/${tour._id}`}>
              <div className="transform transition-transform hover:scale-105">
                <Card className="flex flex-col md:flex-row items-center md:items-start overflow-hidden rounded-xl shadow-lg bg-gray-800 text-white">
                  <div className="relative h-48 w-full md:h-64 md:w-1/2">
                    <Image
                      src={tour.image || '/shimla.jpg'}
                      alt={`${tour.destination} Tour`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                    />
                  </div>
                  <CardContent className="flex flex-col justify-between p-6 w-full md:w-1/2">
                    <h2 className="font-bold text-xl mb-4 text-center md:text-left">
                      {tour.destination} Tour
                    </h2>
                    <div className="text-sm text-gray-300 space-y-2">
                      <p>
                        <span className="font-medium">Origin:</span> {tour.origin}
                      </p>
                      <p>
                        <span className="font-medium">Days:</span> {tour.travelDays}
                      </p>
                      <p>
                        <span className="font-medium">Transport:</span> {tour.transport}
                      </p>
                      <p>
                        <span className="font-medium">Style:</span> {tour.travelStyle}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span> {tour.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourRecommendation;
