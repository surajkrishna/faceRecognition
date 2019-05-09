import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";
import "./App.css";
import "tachyons";
import Particles from "react-particles-js";

const particleOption = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: "f578abb2bdf64967b50534af4bd1e278"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputs: "",
      imageUrl: "",
      box: {}
    };
  }

  calculateFaceLocation = data => {
    const clarifaiface =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - clarifaiface.right_col * width,
      bottomRow: height - clarifaiface.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ inputs: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.inputs });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.inputs)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(error => console.log(error));
  };

  render() {
    const { imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOption} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {imageUrl && <FaceRecognition imageUrl={imageUrl} box={box} />}
      </div>
    );
  }
}

export default App;
