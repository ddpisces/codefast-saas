"use client";

import { useState } from "react";

export default function RandomCatImage() {
  const [status, setStatus] = useState("Idle");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn2.thecatapi.com/images/b5f.gif"
  );

  const getNewImage = async () => {
    setStatus("Loading...");

    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();

      setImageUrl(data[0].url);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-lg font-bold">Async/Await Demo</h1>

      <div>STATUS: {status}</div>

      <button onClick={getNewImage} className="btn btn-primary">
        Fetch Cat Image
      </button>

      {imageUrl && <img src={imageUrl} alt="random cat" className="max-w-80" />}
    </div>
  );
}
