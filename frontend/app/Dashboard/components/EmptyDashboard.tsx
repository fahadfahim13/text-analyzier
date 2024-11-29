import { FilePlus2 } from "lucide-react";
import React from "react";
import CreateResumeCarousel from "./CreateResumeCarousel";

const EmptyDashboard = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <CreateResumeCarousel
        triggerElement={
          <div className="w-96 bg-gray-100 border-2 border-dashed border-gray-200 h-48 flex justify-center items-center cursor-pointer flex-col gap-2 hover:border-gray-500">
            <span>
              {" "}
              <FilePlus2 />{" "}
            </span>
            <p className="text-bold">No Text Analysis Found</p>
            <p className="text-2xl">Create Text Analysis</p>
          </div>
        }
      />
    </div>
  );
};

export default EmptyDashboard;
