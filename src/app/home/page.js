"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [selections, setSelections] = useState({
    background: null,
    face: null,
    handAccessories: null,
    clothes: null,
  });

  const categories = {
    background: 8,
    face: 7,
    handAccessories: 8,
    clothes: 13,
  };

  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setItemsPerPage(mobile ? 4 : 7); // Adjust items per page based on screen size
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentPage, setCurrentPage] = useState(
    Object.keys(categories).reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {})
  );

  function handleSelection(category, index) {
    const fileIndex = index < 10 ? `0${index}` : index;
    const formattedCategory = category.replace(/\s/g, "-").toLowerCase();
    const path = `/assets/${formattedCategory}/${formattedCategory}-${fileIndex}.png`;
    setSelections((prev) => ({ ...prev, [category]: path }));
  }

  function scroll(category, direction) {
    const maxPages = Math.ceil(categories[category] / itemsPerPage);
    const newPage =
      direction === "left"
        ? Math.max(currentPage[category] - 1, 0)
        : Math.min(currentPage[category] + 1, maxPages - 1);
    setCurrentPage((prev) => ({ ...prev, [category]: newPage }));
  }

  function resetSelections() {
    setSelections({
      background: null,
      face: null,
      handAccessories: null,
      clothes: null,
    });
  }

  function generateRandomSelection() {
    Object.keys(categories).forEach((category) => {
      const maxItems = categories[category];
      const randomIndex = Math.floor(Math.random() * maxItems) + 1;
      handleSelection(category, randomIndex);
    });
  }

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
    <div className="flex flex-col items-center justify-center min-h-full bg-[#96D4E1] p-4">
      <Head>
        <title>Character Customizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Image */}
      <div className="w-full flex justify-center mb-4">
        <img
          src="/make-molang.png"
          alt="Make Molang Header"
          className="w-1/2 sm:w-1/3 lg:w-1/4 object-contain"
        />
      </div>

      <div
        className={`flex ${
          isMobile ? "flex-col" : "flex-row"
        } w-10/12 mx-auto my-2 gap-4`}
      >
        {/* Preview Area */}
        <div
          className={`bg-white p-2 rounded-lg shadow-md ${
            isMobile ? "w-full h-64" : "w-1/2 h-auto"
          } relative`}
          id="previewArea"
        >
          {selections.background && (
            <img
              src={selections.background}
              alt="Background"
              className="absolute w-full h-full object-contain z-1"
            />
          )}
          {selections.clothes && (
            <img
              src={selections.clothes}
              alt="Clothes"
              className="absolute w-full h-full object-contain z-20"
            />
          )}
          {selections.face && (
            <img
              src={selections.face}
              alt="Face"
              className="absolute w-full h-full object-contain z-40"
            />
          )}
          {selections.handAccessories && (
            <img
              src={selections.handAccessories}
              alt="Hand Accessories"
              className="absolute w-full h-full object-contain z-30"
            />
          )}
          <img
            src="/assets/base/base.png"
            alt="Base Character"
            className="absolute w-full h-full object-contain z-10"
          />
        </div>

        {/* Items Selection */}
        <div
          className={`bg-[#FFE173] p-4 rounded-lg shadow-md ${
            isMobile ? "w-full" : "w-1/2"
          } overflow-hidden`}
        >
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
                  {[...Array(itemsPerPage)].map((_, index) => {
                    const itemIndex =
                      currentPage[category] * itemsPerPage + index;
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
                    Math.ceil(categories[category] / itemsPerPage) - 1
                  }
                >
                  &#9654;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 mb-4 space-x-4">
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
