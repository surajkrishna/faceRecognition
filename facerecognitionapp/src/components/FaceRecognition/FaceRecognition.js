import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          src={imageUrl}
          id="inputImage"
          alt="face"
          width="500"
          height="auto"
        />
        <div
          className="borderBox"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
