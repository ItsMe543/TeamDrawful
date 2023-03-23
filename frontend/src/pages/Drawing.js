// Import dependencies

import React from "react";
import "../styles/Drawing.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';











var the_canvas ;
var the_canvas_context ;

var original_color;
var x;
var y;
var boundary_pixels;
var linear_cords;

function flood_fill( original_x, original_y, color ) {
    original_color = the_canvas_context.getImageData( original_x, original_y, 1, 1 ).data ;
    console.log(original_color);
    original_color = { r:original_color[0],
                        g:original_color[1],
                        b:original_color[2],
                        a:original_color[3] } ;

    x = original_x ;
    y = original_y ;
    boundary_pixels = the_canvas_context.getImageData( 0, 0, the_canvas.width, the_canvas.height ) ;

    // first we go up until we find a boundary
    linear_cords = (y * the_canvas.width + x) * 4 ;
    var done = false ;
    while( y>=0 && !done ) {
        var new_linear_cords = ( (y-1) * the_canvas.width + x ) * 4 ;
        if( boundary_pixels.data[new_linear_cords]==original_color.r &&
            boundary_pixels.data[new_linear_cords+1]==original_color.g &&
            boundary_pixels.data[new_linear_cords+2]==original_color.b &&
            boundary_pixels.data[new_linear_cords+3]==original_color.a ) {
            y = y - 1 ;
            linear_cords = new_linear_cords ;
        } else {
            done = true ;
        }
    }
    // then we loop around until we get back to the starting point
    var path = [{x:x, y:y}] ;
    var first_iteration = true ;
    var iteration_count = 0 ;
    var orientation = 1 ; // 0:^, 1:<-, 2:v, 3:->
    while( !(path[path.length-1].x==path[0].x && path[path.length-1].y==path[0].y) || first_iteration ) {
        iteration_count++ ;
        first_iteration = false ;
        var got_it = false ;

        if( path.length>=2 ) {
            if( path[path.length-1].y-path[path.length-2].y<0 ) {
                orientation = 0 ;
                //console.log( "^" ) ;
            } else if( path[path.length-1].x-path[path.length-2].x<0 ) {
                orientation = 1 ;
                //console.log( "<-" ) ;
            } else if( path[path.length-1].y-path[path.length-2].y>0 ) {
                orientation = 2 ;
                //console.log( "v" ) ;
            } else if( path[path.length-1].x-path[path.length-2].x>0 ) {
                orientation = 3 ;
                //console.log( "->" ) ;
            } else {
                //console.log( "we shouldn't be here" ) ;
            }
        }

        for( var look_at=0 ; !got_it && look_at<=3 ; look_at++ ) {
            var both = (orientation + look_at) % 4 ;
            if( both==0 ) {
                // we try right
                if( !got_it && (x+1)<the_canvas.width ) {
                    linear_cords = (y * the_canvas.width + (x+1)) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        x = x + 1 ;
                    }
                }
            } else if( both==1 ) {
                // we try up
                if( !got_it && (y-1)>=0 ) {
                    linear_cords = ((y-1) * the_canvas.width + x) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        y = y - 1 ;
                    }
                }
            } else if( both==2 ) {
                // we try left
                if( !got_it && (x-1)>=0 ) {
                    linear_cords = (y * the_canvas.width + (x-1)) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        x = x - 1 ;
                    }
                }
            } else if( both==3 ) {
                // we try down
                if( !got_it && (y+1)<the_canvas.height ) {
                    linear_cords = ((y+1) * the_canvas.width + x) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        y = y + 1 ;
                    }
                }
            }
        }

        if( got_it ) {
            path.push( {x:x, y:y} ) ;
        }
    }

    draw_quadratic_curve( path, the_canvas_context, color, 1, color ) ;
}

function draw_quadratic_curve( path, ctx, color, thickness, fill_color ) {
    color = "rgba( " + color.r + "," + color.g + ","+ color.b + ","+ color.a + ")" ;
    fill_color = "rgba( " + fill_color.r + "," + fill_color.g + ","+ fill_color.b + ","+ fill_color.a + ")" ;
    ctx.strokeStyle = color ;
    ctx.fillStyle = fill_color ;
    ctx.lineWidth = thickness ;
    ctx.lineJoin = "round" ;
    ctx.lineCap = "round" ;
    //ctx.fillStyle = fill_color ;

    if( path.length>0 ) { // just in case
        if( path.length<3 ) {
            var b = path[0] ;
            ctx.beginPath() ;
            ctx.arc( b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0 ) ;
            ctx.fill() ;
            ctx.closePath();

            //return ;
        } else {
            ctx.beginPath() ;
            ctx.moveTo( path[0].x, path[0].y ) ;
            for( var i = 1; i<path.length-2; i++ ) {
                var c = (path[i].x + path[i + 1].x) / 2 ;
                var d = (path[i].y + path[i + 1].y) / 2 ;
                ctx.quadraticCurveTo( path[i].x, path[i].y, c, d ) ;
            }

            // the last 2 points are special
            ctx.quadraticCurveTo( path[i].x, path[i].y, path[i + 1].x, path[i + 1].y ) ;
            ctx.stroke() ;
        }
    }
    if( fill_color!==false ) {
        ctx.fill() ;
    }
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
  //Mode.setMode('pen');
  const canvasRef = useRef(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState("#000000"); // Default color is black
  const [size, setSize] = useState(10); // Default size is 10

  //Accessing prompt contents:
  //var promptObj = {
  //  id: 0,
  //  prompt: "",
  //  promptGenre: "",
  //  alreadyUsed: false,
  //  previousWinner: "",
  //};
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

    //-----------------------------------------------------
  };

  //Code for prompt getting
  /*const getPrompt = () => {
    axios
      .get("/api/prompts/1/")
      .then((res) => console.log(res.data))
      //.then((res) => promptObj = res.data)
      .catch((err) => console.log(err))
    console.log(promptObj);
    return (  
      <span>{promptObj.prompt}</span>
    )
  }

  const showPrompt = () => {
    getPrompt();
    //console.log("Prompt = " + promptObj);
    //return ()
  };*/

  useEffect(() => {
    axios.get("/api/prompts/1/").then((data) => {
      console.log(data);
      setPost(data?.data);
    });
  }, []);

  return (
    <div>
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
