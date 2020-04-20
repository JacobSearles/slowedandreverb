import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#8c2fa8",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider({ speed }) {
  const classes = useStyles();

  const handleSliderChange = (event, value) => {
    speed = value;
    this.setState({ percent: value * 100 + "%" });
    if (speed >= 0.9) {
      this.setState({ message: "Recommended" });
    } else if (speed >= 0.8) {
      this.setState({ message: "Hypnotizing" });
    } else {
      this.setState({ message: "Grab the lean my nigga" });
    }
  };

  return (
    <PrettoSlider
      aria-label="Choose your speed"
      defaultValue={1}
      valueLabelDisplay="on"
      step={0.01}
      min={0.7}
      max={1}
      onChange={handleSliderChange}
    />
  );
}
