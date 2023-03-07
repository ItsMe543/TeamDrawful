import React from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField } from "@mui/material";

export default function Test() {

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
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
        })}
      >
        Save
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
      <div style={{ textAlign: "left" }}>Settings Page!</div>
      <br></br>
      <Alert onClose={() => { }}>Its working!</Alert>
      <br></br>
      <LinearProgress variant="determinate" value={progress} />
      <br></br>
      <TextField id="outlined-basic" color="secondary"
        label="Enter your username" variant="outlined" />
      <br></br>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Changes saved"
        key={vertical + horizontal}
      />
    </div>
  )
}