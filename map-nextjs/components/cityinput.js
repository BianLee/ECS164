"use client";
import { useState } from "react";

const CityInput = ({ onCityAdded }) => {
  const [city, setCity] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleAddCity();
    }
  };
  const handleAddCity = () => {
    if (city.trim() !== "") {
      onCityAdded(city.trim());
      setCity("");
    }
  };

  return (
    <header aria-label="Site Header" className="shadow-sm bg-gray-100">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex w-0 flex-1 lg:hidden">
          <button
            className="rounded-full bg-gray-100 p-2 text-gray-600"
            type="button"
          >
            <span className="sr-only">Account</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewbox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              className="h-10 rounded-lg border-gray-200 pe-10 text-sm focus:outline-none placeholder-gray-300 px-4"
              placeholder="Add City"
              type="text"
              value={city}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />

            <button
              className="absolute inset-y-0 end-0 rounded-r-lg p-2 text-gray-400"
              onClick={handleAddCity}
            >
              +
            </button>
          </div>
        </div>
        {/* 
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#"
            className="rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-600"
          >
            Log in
          </a>

          <a
            href="#"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
          >
            Sign up
          </a>
        </div>
        */}
      </div>
    </header>
  );
};

export default CityInput;
