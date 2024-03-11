import React, { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.svg";

function ImageGenerator() {
  const [image_url, setImage_url] = useState("/");
  const [loading, setloading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setloading(true)
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setloading(false)
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div>
          </div>
        </div>
      </div>
      <div className="searchbox">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Deescribe What you want to see"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
