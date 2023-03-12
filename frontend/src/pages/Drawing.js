// Import dependencies

import React from "react";
import "../styles/Drawing.css";
import { useEffect, useRef, useState } from "react";


function Drawing() {
  const canvasRef = useRef(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState("#000000"); // Default color is black
  const [size, setSize] = useState(10); // Default size is 10
  // Set the canvas ctx as the state
  useEffect(() => {
    const canvas = canvasRef.current; // Select the canvas element
    const ctx = canvas.getContext("2d"); // The canvas context
    canvas.width = window.innerWidth*0.811; // Set width of the canvas to the width of the screen
    canvas.height = window.innerHeight*0.755;// Set height of the canvas to the height of the screen
    setCanvasCTX(ctx); // Finally, set the state
  }, [canvasRef]); // Do this everytime the canvas element is changed

  const SetPos = (e) => {
    // The e variable is the event
    setMouseData({
        x: e.clientX-336, // Mouse X position
        y: e.clientY-205, // Mouse Y position
    });
  };
  const Draw = (e) => {
    if (e.buttons !== 1) return; // The left mouse button should be pressed
    const ctx = canvasCTX; // Our saved context
    ctx.beginPath(); // Start the line
    ctx.moveTo(mouseData.x, mouseData.y); // Move the line to the saved mouse location
    setMouseData({
        x: e.clientX-336, // Update the mouse location
        y: e.clientY-205, // ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    });
    ctx.lineTo(e.clientX-336, e.clientY-205); // Again draw a line to the mouse postion
    ctx.strokeStyle = color; // Set the color as the saved state
    ctx.lineWidth = size; // Set the size to the saved state
    // Set the line cap to round
    ctx.lineCap = "round";
    ctx.stroke(); // Draw it!
  };
  return (
    <div>
      <div>
      </div>
      <div className="drawing_toolbar" >
        {/* Add drawing tool bar components here */}
        <button className="tool1">*Drawing tool</button>
      </div>
      <div className="prompt_bar">
        <div className="prompt">
          *This is where the prompt goes
        </div>
      </div>
      <div className="canvas">
        <canvas
          ref={canvasRef}
          onMouseEnter={(e) => SetPos(e)}
          onMouseMove={(e) => SetPos(e)}
          onMouseDown={(e) => SetPos(e)}
          onMouseMove={(e) => Draw(e)}

        ></canvas>
        <div
          className="controlpanel"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
          }}
        >
          <input
            type="range"
            value={size}
            max={40}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const ctx = canvasCTX;
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }}
          >
            Clear
          </button>
        </div>
        <div className="time">
          *Time here
        </div>

      </div>
    </div>
  );
}

export default Drawing;
