"use client";

import Head from "next/head";
import { useState } from "react";
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
    clothes: 13,
  };

  function handleSelection(category, index) {
    const fileIndex = index < 10 ? `0${index}` : index;
    const formattedCategory = category.replace(/\s/g, "-").toLowerCase();
    const path = `/assets/${formattedCategory}/${formattedCategory}-${fileIndex}.png`;
    setSelections((prev) => ({ ...prev, [category]: path }));
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
    <div className="flex flex-col items-center justify-center h-screen bg-[#ffd3b4]">
      {/* <Head>
        <title>Character Customizer</title>
        <link rel="icon" href="/favicon.png" />
      </Head> */}

      <div className="flex w-full md:w-11/12">
        <div className="flex flex-col bg-[#ffa07a] p-5 rounded-lg mr-5 overflow-auto h-auto md:h-full">
          {Object.keys(categories).map((category) => (
            <div key={category} className="mb-5">
              <h3 className="mb-2.5 text-lg font-bold">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="flex flex-wrap">
                {[...Array(categories[category])].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelection(category, index + 1)}
                    className="p-1.5"
                  >
                    <img
                      src={`/assets/${category
                        .replace(/\s/g, "-")
                        .toLowerCase()}/${category
                        .replace(/\s/g, "-")
                        .toLowerCase()}-${
                        index + 1 < 10 ? `0${index + 1}` : index + 1
                      }.png`}
                      alt={`${category} ${index + 1}`}
                      className="w-12 h-12 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex-grow flex justify-center items-center relative w-96 h-auto md:h-full"
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

      <div className="mt-4 space-x-4">
        <button
          className="bg-[#ffa07a] text-white py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-[#ffa07a]"
          onClick={resetSelections}
        >
          Reset
        </button>
        <button
          className="bg-[#ffa07a] text-white py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-[#ffa07a]"
          onClick={generateRandomSelection}
        >
          Randomize
        </button>
        <button
          className="bg-[#ffa07a] text-white py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-[#ffa07a]"
          onClick={downloadResult}
        >
          Download
        </button>
      </div>
    </div>
  );
}

