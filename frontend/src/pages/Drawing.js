// Import dependencies

import React from "react";
import "../styles/Drawing.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



var imageParcel = {
  timeTaken:1,
  date:2,
  difficulty:3,
  drawing:4,
  prompt:5,
  timeCompleted:6
}








var the_canvas ;
var the_canvas_context ;

var original_color;
var x;
var y;
var boundary_pixels;
var linear_cords;
var pixels;
var new_pixel;
var pixel_stack;

function flood_fill( x, y, color ) {
    pixel_stack = [{x:x, y:y}] ;
    pixels = the_canvas_context.getImageData( 0, 0, the_canvas.width, the_canvas.height ) ;
    var linear_cords = ( y * the_canvas.width + x ) * 4 ;
    original_color = {r:pixels.data[linear_cords],
                      g:pixels.data[linear_cords+1],
                      b:pixels.data[linear_cords+2],
                      a:pixels.data[linear_cords+3]} ;

    while( pixel_stack.length>0 ) {
        new_pixel = pixel_stack.shift() ;
        x = new_pixel.x ;
        y = new_pixel.y ;

        //console.log( x + ", " + y ) ;

        linear_cords = ( y * the_canvas.width + x ) * 4 ;
        while( y-->=0 &&
                (pixels.data[linear_cords]==original_color.r &&
                pixels.data[linear_cords+1]==original_color.g &&
                pixels.data[linear_cords+2]==original_color.b &&
                pixels.data[linear_cords+3]==original_color.a) ) {
            linear_cords -= the_canvas.width * 4 ;
        }
        linear_cords += the_canvas.width * 4 ;
        y++ ;

        var reached_left = false ;
        var reached_right = false ;
        while( y++<the_canvas.height &&
                (pixels.data[linear_cords]==original_color.r &&
                pixels.data[linear_cords+1]==original_color.g &&
                pixels.data[linear_cords+2]==original_color.b &&
                pixels.data[linear_cords+3]==original_color.a) ) {
            pixels.data[linear_cords]   = color.r ;
            pixels.data[linear_cords+1] = color.g ;
            pixels.data[linear_cords+2] = color.b ;
            pixels.data[linear_cords+3] = color.a ;

            if( x>0 ) {
                if( pixels.data[linear_cords-4]==original_color.r &&
                    pixels.data[linear_cords-4+1]==original_color.g &&
                    pixels.data[linear_cords-4+2]==original_color.b &&
                    pixels.data[linear_cords-4+3]==original_color.a ) {
                    if( !reached_left ) {
                        pixel_stack.push( {x:x-1, y:y} ) ;
                        reached_left = true ;
                    }
                } else if( reached_left ) {
                    reached_left = false ;
                }
            }

            if( x<the_canvas.width-1 ) {
                if( pixels.data[linear_cords+4]==original_color.r &&
                    pixels.data[linear_cords+4+1]==original_color.g &&
                    pixels.data[linear_cords+4+2]==original_color.b &&
                    pixels.data[linear_cords+4+3]==original_color.a ) {
                    if( !reached_right ) {
                        pixel_stack.push( {x:x+1,y:y} ) ;
                        reached_right = true ;
                    }
                } else if( reached_right ) {
                    reached_right = false ;
                }
            }

            linear_cords += the_canvas.width * 4 ;
        }
    }
    the_canvas_context.putImageData( pixels, 0, 0 ) ;
}

function is_in_pixel_stack( x, y, pixel_stack ) {
    for( var i=0 ; i<pixel_stack.length ; i++ ) {
        if( pixel_stack[i].x==x && pixel_stack[i].y==y ) {
            return true ;
        }
    }
    return false ;
}


// adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function color_to_rgba( color ) {
    if( color[0]=="#" ) { // hex notation
        color = color.replace( "#", "" ) ;
        var bigint = parseInt(color, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return {r:r,
                g:g,
                b:b,
                a:255} ;
    } else if( color.indexOf("rgba(")==0 ) { // already in rgba notation
        color = color.replace( "rgba(", "" ).replace( " ", "" ).replace( ")", "" ).split( "," ) ;
        return {r:color[0],
                g:color[1],
                b:color[2],
                a:color[3]*255} ;
    } else {
        console.error( "warning: can't convert color to rgba: " + color ) ;
        return {r:0,
                g:0,
                b:0,
                a:0} ;
    }
}

function body_loaded() {
    the_canvas = document.getElementById( "canvasID" ) ;
    the_canvas_context = the_canvas.getContext( "2d" ) ;
}


class Mode {
  static mode ="none";
  static setMode(penMode) {
    this.mode =penMode;
  }
  static getMode() {
    return this.mode;
  }
}



class canFill {
  static mode ="none";
  static setMode(fillMode) {
    this.mode =fillMode;
  }
  static getMode() {
    return this.mode;
  }
}


function Drawing() {
    const [date,setName,difficulty] = useState({
    date: " ",difficulty: " "
  });

  const handleChange = (e) => {
    //e.preventDefault();
    setName({
      date: e.date,
      difficulty: e.difficulty
    });
  };

  const submitForm = (e) => {
    //e.preventDefault();

    axios
      .post(`/api/user_memories/`, { date,difficulty })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };




  //Mode.setMode('pen');
  const canvasRef = useRef(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState("#000000"); // Default color is black
  const [size, setSize] = useState(10); // Default size is 10

  const [post, setPost] = useState({
    id: 0,
    prompt: "",
    promptGenre: "",
    alreadyUsed: false,
    previousWinner: ""
  });

  // Set the canvas ctx as the state
  useEffect(() => {
    const canvas = canvasRef.current; // Select the canvas element
    const ctx = canvas.getContext("2d"); // The canvas context
    canvas.width = window.innerWidth * 0.811; // Set width of the canvas to the width of the screen
    canvas.height = window.innerHeight * 0.755;// Set height of the canvas to the height of the screen
    setCanvasCTX(ctx); // Finally, set the state
  }, [canvasRef]); // Do this everytime the canvas element is changed

  const SetPos = (e) => {
    // The e variable is the event
    const canvasRect = canvasRef.current.getBoundingClientRect(); // Get Boundaries of Canvas
    setMouseData({
      x: e.clientX - canvasRect.left, // Mouse X position
      y: e.clientY - canvasRect.top, // Mouse Y position
    });
    if(Mode.getMode() == 'fill'){
      if (e.buttons !== 1){
        canFill.setMode(1);
        return;

      }
      console.log(canFill.getMode());
      if(canFill.getMode() ==1){
        console.log(e.clientX - canvasRect.left, e.clientY - canvasRect.top);
        body_loaded();
        var canvasX =e.clientX - canvasRect.left;
        var canvasY =e.clientY - canvasRect.top;
        flood_fill(Math.round(canvasX),Math.round(canvasY),color_to_rgba(color));
        //flood_fill(100,100,color_to_rgba(generate_random_color()));
        canFill.setMode(0);
      }
    }
  };
  const Draw = (e) => {

    const canvasRect = canvasRef.current.getBoundingClientRect(); // Get Boundaries of Canvas
    setMouseData({
      x: e.clientX - canvasRect.left, // Update the mouse location
      y: e.clientY - canvasRect.top, // ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    });


    //----------------------------------------------------------------------
    //PEN

    if(Mode.getMode() == 'pen'){
      if (e.buttons !== 1) return;

      const ctx = canvasCTX; // Our saved context
      ctx.beginPath(); // Start the line
      ctx.moveTo(mouseData.x, mouseData.y); // Move the line to the saved mouse location
      ctx.globalCompositeOperation="source-over";
      ctx.lineTo(e.clientX - canvasRect.left, e.clientY - canvasRect.top); // Again draw a line to the mouse postion
      ctx.strokeStyle = color; // Set the color as the saved state
      ctx.lineWidth = size; // Set the size to the saved state
      // Set the line cap to round
      ctx.lineCap = "round";
      ctx.stroke(); // Draw it!
    }
    //ERASE
    else if(Mode.getMode() == 'erase'){
      if (e.buttons !== 1) return;

      const ctx = canvasCTX; // Our saved context
      ctx.moveTo(mouseData.x, mouseData.y);
      ctx.globalCompositeOperation="destination-out";
      //ctx.lineTo(e.clientX - canvasRect.left, e.clientY - canvasRect.top,false); // Again draw a line to the mouse postion

      ctx.arc(e.clientX - canvasRect.left, e.clientY - canvasRect.top,size*0.6,0,Math.PI*2,false);
      // Set the line cap to round
      ctx.lineCap = "round";
      ctx.fill();
    }
    //FILL
    else if(Mode.getMode() == 'fill'){
      if (e.buttons !== 1){
        canFill.setMode(1);
        return;

      }
      console.log(canFill.getMode());
      if(canFill.getMode() ==1){
        console.log(e.clientX - canvasRect.left, e.clientY - canvasRect.top);
        body_loaded();
        var canvasX =e.clientX - canvasRect.left;
        var canvasY =e.clientY - canvasRect.top;
        flood_fill(Math.round(canvasX),Math.round(canvasY),color_to_rgba(color));
        //flood_fill(100,100,color_to_rgba(generate_random_color()));
        canFill.setMode(0);
      }

    }
  };

  //Code for prompt getting
  // Change the value after /api/prompts/ to the ID of the prompt you want
  useEffect(() => {
    axios.get("/api/prompts/1/").then((data) => {
      console.log(data);
      setPost(data?.data);
    });
  }, []);

  return (
    <div className="Background">
      <div className="drawing_toolbar" >
        <div
          className="controlpanel"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
          }}
        >
          <input style={{ marginRight: '12%' }}
            type="range"
            value={size}
            max={40}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          <input
            style={{ width: '20%', height: '30px' }}
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);

            }}
          />
          <br></br>
          <br></br>
          <button style={{ fontSize: '150%', width: '50%', position: 'relative', left: '18%' }}
            onClick={() => {
              const ctx = canvasCTX;
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }}
          >
            Clear
          </button>

          <br></br>
          <br></br>

          <button style={{ fontSize: '150%', width: '50%', position: 'relative', left: '18%' }}
            id="eraseButton"
            onClick={() => {
              Mode.setMode('erase');
              document.getElementById("eraseButton").style.background='#aaaaaa';
              document.getElementById("penButton").style.background='#efefef';
              document.getElementById("fillButton").style.background='#efefef';


            }}
          >
            Erase
          </button>

          <br></br>
          <br></br>
          <button style={{ fontSize: '150%', width: '50%', position: 'relative', left: '18%' }}
            id="penButton"
            onClick={() => {
              Mode.setMode('pen');
              document.getElementById("eraseButton").style.background='#efefef';
              document.getElementById("penButton").style.background='#aaaaaa';
              document.getElementById("fillButton").style.background='#efefef';
            }}
          >
            Pen
          </button>

          <br></br>
          <br></br>
          <button style={{ fontSize: '150%', width: '50%', position: 'relative', left: '18%' }}
            id="fillButton"
            onClick={() => {
              Mode.setMode('fill');
              document.getElementById("eraseButton").style.background='#efefef';
              document.getElementById("penButton").style.background='#efefef';
              document.getElementById("fillButton").style.background='#aaaaaa';
            }}
          >
            Phil
          </button>

          <br></br>
          <br></br>

            <button style={{ fontSize: '150%', width: '50%', position: 'relative', left: '18%' }}
            id="submtButton"
            onClick={() => {
              handleChange(imageParcel);
              submitForm(imageParcel);
            }}
          >
            Submit
          </button>

          <br></br>


        </div>
      </div>
      <div className="prompt_bar">
        <div className="prompt">
          {post.prompt}
        </div>
      </div>
      <div className="canvas">


        <canvas
          ref={canvasRef}
          id="canvasID"
          background-color ="white"
          onMouseEnter={(e) => SetPos(e)}
          onMouseDown={(e) => SetPos(e)}
          onMouseMove={(e) => Draw(e)}
        ></canvas>

        <div className="time">
          *Time here
        </div>


      </div>
    </div >
  );
}

export default Drawing;
