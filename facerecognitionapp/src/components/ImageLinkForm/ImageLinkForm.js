import React from "react";

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try"}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5">
          <input type="tex" className="f4 pa2 w-70 center" />
          <button className="w-30 grow f4 link ph3 pv3 dib white bg-light-purpel">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
