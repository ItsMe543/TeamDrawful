import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField } from "@mui/material";

export default function Test() {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState, message) => () => {
    setState({ ...state, open: true, ...newState, message });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  const buttons = (
    <React.Fragment>
      <Button
        onClick={handleClick({
          vertical: 'bottom',
          horizontal: 'left',
        }, "Changes saved")}
        style={{
          borderRadius: "5px", color: "white", backgroundColor: "rgba(0,120,255,255)",
          border: "1px solid black", marginTop: "8px", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
        }}
      >
        Save
      </Button>
      <Button
        onClick={handleClick({
          vertical: 'bottom',
          horizontal: 'left',
        }, "Changes cancelled")}
        style={{
          borderRadius: '5px',
          color: 'white',
          backgroundColor: 'rgba(246,71,71,1)',
          border: '1px solid black',
          marginTop: '8px',
          marginLeft: '8px',
          textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        }}
      >
        Cancel
      </Button>
    </React.Fragment>
  );

  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    }
  })

  return (
    <div style={{ textAlign: "center" }}>
      <style>
        {`body{background-color: rgba(0,0,5, 0.85)}`}
      </style>
      <div style={{
        textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
        textAlign: "left", color: "white"
      }}>Settings</div>
      <br></br>
      <LinearProgress variant="determinate" value={progress} />
      <br></br>
      <TextField id="outlined-basic" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: "white" } }}
        style={{
          borderRadius: "8px", backgroundColor:
            "rgba(255, 255, 255, 0.08)", border: "1px solid black", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
        }}
        label="Enter your username" variant="outlined" />
      <br></br>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={state.message}
        key={vertical + horizontal}
      />
      <br></br>
      <TextField id="outlined-basic" color="secondary"
        label="Testing screen reader" InputProps={{ style: { color: 'white' } }}
        style={{
          borderRadius: "8px", marginTop: "100px", backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid black", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
        }}
        InputLabelProps={{ style: { color: "white" } }} variant="outlined"
        inputProps={{ "aria-label": "The ting goes skrrrahh, pap pap kah-kah-kah Skidiki-pap-pap, and a puu-puu-puurrr-boom Skiya, du-du-ku-ku-doom doom Poom poom, you dun now." }} />
    </div>
  );
}