import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";

const personrunning = () => {
  return (
    <div>
      <span className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center">
        <FontAwesomeIcon
          icon={faPersonRunning}
          className="w-4 h-4 text-black"
        />
      </span>
    </div>
  );
};

export default personrunning;
