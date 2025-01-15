"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCamera } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ProfileCard = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setPreviewUrl(savedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 flex items-center justify-center">
      <Card className="w-full max-w-3xl h-auto bg-zinc-900/50 border-zinc-800 p-8 flex flex-col sm:flex-row sm:h-[600px]">
        <div className="w-full sm:w-1/3 flex flex-col items-center space-y-4 mb-6 sm:mb-0">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-red-500">
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
                {(() => {
                  if (previewUrl) {
                    return (
                      <div className="w-full h-full relative">
                        <Image
                          src={previewUrl}
                          alt="Profile"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-zinc-400 text-lg">
                        No Image
                      </div>
                    );
                  }
                })()}
              </div>
            </div>

            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <FontAwesomeIcon
                icon={faCamera}
                className="text-white text-xl"
              />
            </label>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-zinc-100">John Doe</h2>
            <div className="flex items-center justify-center space-x-2 text-zinc-400 mt-2">
              <FontAwesomeIcon icon={faEnvelope} size="sm" />
              <span className="text-sm">xyz@email.com</span>
            </div>
          </div>
        </div>

        <div className="w-full sm:flex-1 sm:ml-8">
          <div className="h-40 sm:h-full bg-zinc-800/30 rounded-lg"></div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
