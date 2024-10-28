import React from "react";

const Homepage = () => {
  return (
    <div
      className="py-20 relative flex flex-grow flex-col px-12 justify-end"
      style={{ backgroundColor: "#e5ddd5" }}
    >
      <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
        <p className="">
          Do you still have that car from gone in 60 seconds? Can I borrow it
          please.
        </p>
        <p className="text-gray-600 text-xs text-right leading-none">8:00 AM</p>
      </div>
      <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
        <p>Yeah dude for sure</p>
        <p className="text-gray-600 text-xs text-right leading-none">8:45 AM</p>
      </div>
      <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
        <p className="">Dude WTF was up with that plane you were on!!!?</p>
        <p className="text-gray-600 text-xs text-right leading-none">8:00 AM</p>
      </div>
      <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
        <p>LOL I Know right </p>
        <p className="text-gray-600 text-xs text-right leading-none">8:45 AM</p>
      </div>
      <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
        <p className="">Hey man what should we do this weekend?</p>
        <p className="text-gray-600 text-xs text-right leading-none">8:00 AM</p>
      </div>
      <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
        <p>Steal the declaration of independence?...</p>
        <p className="text-gray-600 text-xs text-right leading-none">8:45 AM</p>
      </div>
    </div>
  );
};

export default Homepage;
