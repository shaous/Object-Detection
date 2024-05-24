import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utlties";

function App()
{
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () =>
  {
    const net = await cocossd.load();

    setInterval(() =>
    {
      detect(net);
    }, 10);
  };

  const detect = async (net) =>
  {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    )
    {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video)
      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx)
    }
  };

  useEffect(() =>
  {
    runCoco()
  }, []);

  return (
    <div className="App">
      <header className="App-container">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="webcam-output"        
        />

        <canvas
          ref={canvasRef}
          className="webcam-canvas"          
        />
      </header>
    </div>
  );
}

export default App;
