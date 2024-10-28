"use client";

import Head from "next/head";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [selections, setSelections] = useState({
    background: null,
    face: null,
    handAccessories: null,
    clothes: null,
  });

  const categories = {
    background: 3,
    face: 7,
    handAccessories: 4,
    clothes: 13, // More than 7 items to test pagination
  };

  const ITEMS_PER_PAGE = 7; // Number of items shown per page
  const [currentPage, setCurrentPage] = useState(
    Object.keys(categories).reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {})
  );

  // Handle item selection
  function handleSelection(category, index) {
    const fileIndex = index < 10 ? `0${index}` : index;
    const formattedCategory = category.replace(/\s/g, "-").toLowerCase();
    const path = `/assets/${formattedCategory}/${formattedCategory}-${fileIndex}.png`;
    setSelections((prev) => ({ ...prev, [category]: path }));
  }

  // Navigate between pages
  function scroll(category, direction) {
    const maxPages = Math.ceil(categories[category] / ITEMS_PER_PAGE);
    const newPage =
      direction === "left"
        ? Math.max(currentPage[category] - 1, 0)
        : Math.min(currentPage[category] + 1, maxPages - 1);
    setCurrentPage((prev) => ({ ...prev, [category]: newPage }));
  }

  // Reset selections
  function resetSelections() {
    setSelections({
      background: null,
      face: null,
      handAccessories: null,
      clothes: null,
    });
  }

  // Generate random selection
  function generateRandomSelection() {
    Object.keys(categories).forEach((category) => {
      const maxItems = categories[category];
      const randomIndex = Math.floor(Math.random() * maxItems) + 1;
      handleSelection(category, randomIndex);
    });
  }

  // Download result as PNG
  function downloadResult() {
    const captureElement = document.getElementById("previewArea");
    html2canvas(captureElement).then((canvas) => {
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = "customized-character.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#96D4E1]">
      <Head>
        <title>Character Customizer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* Header Image */}
      <div className="w-full flex justify-center">
        <img
          src="/make-molang.png"
          alt="Make Molang Header"
          className="w-1/3 md:w-1/4 object-contain"
        />
      </div>

      {/* Content Container */}
      <div className="flex w-full md:w-10/12 mx-auto my-2 space-x-4 h-4/6">
        {/* Items Selection */}
        <div className="flex flex-col bg-[#FFE173] p-4 rounded-lg shadow-md w-1/2 overflow-hidden">
          {Object.keys(categories).map((category) => (
            <div key={category} className="mb-3">
              <h3 className="mb-1 text-md font-bold">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>

              <div className="flex items-center">
                <button
                  onClick={() => scroll(category, "left")}
                  className="p-2 rounded-full bg-[#E09E61] text-white mr-2"
                  disabled={currentPage[category] === 0}
                >
                  &#9664;
                </button>

                <div className="flex space-x-2 overflow-hidden">
                  {[...Array(ITEMS_PER_PAGE)].map((_, index) => {
                    const itemIndex =
                      currentPage[category] * ITEMS_PER_PAGE + index;
                    if (itemIndex >= categories[category]) return null;

                    return (
                      <div
                        key={itemIndex}
                        className="p-1 m-1.5 rounded-lg border-2"
                        style={{
                          borderColor: "#E09E61",
                          backgroundColor: "#F7ECD6",
                        }}
                      >
                        <button
                          onClick={() =>
                            handleSelection(category, itemIndex + 1)
                          }
                        >
                          <img
                            src={`/assets/${category
                              .replace(/\s/g, "-")
                              .toLowerCase()}/${category
                              .replace(/\s/g, "-")
                              .toLowerCase()}-${
                              itemIndex + 1 < 10
                                ? `0${itemIndex + 1}`
                                : itemIndex + 1
                            }.png`}
                            alt={`${category} ${itemIndex + 1}`}
                            className="w-12 h-12 object-cover"
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => scroll(category, "right")}
                  className="p-2 rounded-full bg-[#E09E61] text-white ml-2"
                  disabled={
                    currentPage[category] ===
                    Math.ceil(categories[category] / ITEMS_PER_PAGE) - 1
                  }
                >
                  &#9654;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Area */}
        <div
          className="flex-grow flex justify-center items-center relative w-1/2 bg-white p-2 rounded-lg shadow-md"
          id="previewArea"
        >
          {selections.background && (
            <img
              src={selections.background}
              alt="Background"
              className="absolute w-full h-full object-cover z-1"
            />
          )}
          {selections.clothes && (
            <img
              src={selections.clothes}
              alt="Clothes"
              className="absolute w-full h-full object-cover z-20"
            />
          )}
          {selections.face && (
            <img
              src={selections.face}
              alt="Face"
              className="absolute w-full h-full object-cover z-40"
            />
          )}
          {selections.handAccessories && (
            <img
              src={selections.handAccessories}
              alt="Hand Accessories"
              className="absolute w-full h-full object-cover z-30"
            />
          )}
          <img
            src="/assets/base/base.png"
            alt="Base Character"
            className="absolute w-full h-full object-cover z-10"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-2 space-x-4">
        <button
          className="bg-[#ffa07a] text-white py-2 px-3 rounded border-2 border-white hover:bg-white hover:text-[#ffa07a]"
          onClick={resetSelections}
        >
          Reset
        </button>
        <button
          className="bg-[#ffa07a] text-white py-2 px-3 rounded border-2 border-white hover:bg-white hover:text-[#ffa07a]"
          onClick={generateRandomSelection}
        >
          Randomize
        </button>
        <button
          className="bg-[#ffa07a] text-white py-2 px-3 rounded border-2 border-white hover:bg-white hover:text-[#ffa07a]"
          onClick={downloadResult}
        >
          Download
        </button>
      </div>
    </div>
  );
}
