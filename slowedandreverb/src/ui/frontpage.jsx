import React from "react";
import "../App.css";
import { StyledDropzone, currFile } from "./dragAndDrop";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

let formData = new FormData();

// speed of the desired audio file
var speed = 0.94;
// reverb option
var reverb = false;

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

const onSubmit = async (acceptedFiles) => {
  formData.append("song", currFile);
  formData.append("speed", speed);
  formData.append("reverb", reverb);

  console.log("submit files: " + currFile);

  fetch("/upload-song", {
    method: "POST",
    body: formData,
  });
  formData = new FormData();
};

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Recommended", value: 1, percent: "100%" };
    this.customizedSlider = this.customizedSlider.bind(this);
  }

  customizedSlider() {
    const classes = useStyles();

    const handleSliderChange = (event, value) => {
      speed = value;
      this.setState({ percent: value * 100 + "%" });
      if (speed >= 0.9) {
        this.setState({ message: "Recommended" });
      } else if (speed >= 0.8) {
        this.setState({ message: "Chilled" });
      } else {
        this.setState({ message: "Hypnotizing" });
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

  reverbCheckbox() {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      reverb = !checked;
    };

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{
              color: "#8c2fa8",
            }}
          />
        }
        label="Add Reverb"
      />
    );
  }

  render() {
    return (
      <div className="Dropzone">
        <StyledDropzone />
        <Card
          style={{
            backgroundColor: "#bdbdbd",
            paddingTop: 30,
            alignItems: "center",
          }}
        >
          <CardContent>
            <div className="cardContents">
              <this.customizedSlider />
              <Typography fontWeight="fontWeightBold">
                Speed: {this.state.percent}
              </Typography>
              <Typography fontWeight="fontWeightBold">
                {this.state.message}
              </Typography>
              <this.reverbCheckbox />
              <Button
                style={{
                  backgroundColor: "#8c2fa8",
                }}
                variant="contained"
                color="primary"
                onClick={(acceptedFiles) => onSubmit(acceptedFiles)}
              >
                Slow it Down
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default FrontPage;
