import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Chile from "../Assets/chile1.jpeg";

const AdventureCard = () => {
  return (
    <Card className="relative w-72 overflow-hidden bg-black text-white rounded-xl">
      <div className="relative h-80 w-full">
        <Image
          src={Chile}
          className="h-60 object-cover opacity-90"
        />
      </div>
      <CardContent className="absolute bottom-0 left-0 right-0 p-4 ">
        <h2 className="text-xl font-semibold mb-3">
          6 Days Adventure in Chile
        </h2>
        
        <div className="flex gap-2 justify-center">
          <Badge variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
            6 days
          </Badge>
          <Badge variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700">
            Chile
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdventureCard;