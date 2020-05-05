import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import React from "react";

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

//const classes = useStyles();

export class CustomizedSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <PrettoSlider
        aria-label="Choose your speed"
        defaultValue={this.props.defaultValue}
        valueLabelDisplay="off"
        step={this.props.step}
        min={this.props.min}
        max={this.props.max}
        onChange={this.handleChange}
      />
    );
  }
}
