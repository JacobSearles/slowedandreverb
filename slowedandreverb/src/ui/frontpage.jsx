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
import ReactPlayer from "react-player";
import { CustomizedSlider } from "./slider";

var download = require("downloadjs");

let formData = new FormData();
var blobUrl = undefined;

// speed of the desired audio file
var speed = 0.95;
// reverb option
var reverb = 0;

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

// const sendFileToServer = async () => {
//   formData.append("song", currFile);
//   formData.append("speed", speed);
//   formData.append("reverb", reverb);

//   console.log("reverb: " + reverb);

//   const res = await fetch("/upload-song", {
//     method: "POST",
//     body: formData,
//   });
//   const blob = await res.blob();
//   download(blob, "Slowed " + currFile.path);
//   blobUrl = URL.createObjectURL(blob);
//   formData = new FormData();
//   return blobUrl;
// };

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedMessage: "Slow it down some",
      reverbMessage: "Recommended",
      value: 1,
      percentSpeed: "100%",
      reverbLevel: "0",
      speed: 1,
      reverb: 0,
      url: undefined,
      reverbChecked: false,
    };
    //this.speedSlider = this.speedSlider.bind(this);
    //this.reverbSlider = this.reverbSlider.bind(this);
    this.sendFileToServer = this.sendFileToServer.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.reverbCheckbox = this.reverbCheckbox.bind(this);
    this.handleSpeedSliderChange = this.handleSpeedSliderChange.bind(this);
    this.handleReverbSliderChange = this.handleReverbSliderChange.bind(this);
  }

  // speedSlider() {
  //   const classes = useStyles();

  //   const handleSliderChange = (event, value) => {
  //     speed = value;
  //     this.setState({ percentSpeed: value * 100 + "%" });
  //     if (speed >= 0.87) {
  //       this.setState({ speedMessage: "Slow it down some" });
  //     } else if (speed >= 0.75) {
  //       this.setState({ speedMessage: "Recommended" });
  //     } else {
  //       this.setState({ speedMessage: "Hypnotizing" });
  //     }
  //   };

  //   return (
  //     <PrettoSlider
  //       aria-label="Choose your speed"
  //       defaultValue={1}
  //       valueLabelDisplay="off"
  //       step={0.01}
  //       min={0.6}
  //       max={1}
  //       onChange={handleSliderChange}
  //     />
  //   );
  // }

  // reverbSlider() {
  //   const classes = useStyles();

  //   const handleSliderChange = (event, value) => {
  //     reverb = value;
  //     this.setState({ reverbLevel: value });
  //     if (reverb >= 100) {
  //       this.setState({ reverbMessage: "Max" });
  //     } else if (reverb >= 70) {
  //       this.setState({ reverbMessage: "A lot" });
  //     } else if (reverb >= 40) {
  //       this.setState({ reverbMessage: "Recommended" });
  //     } else if (reverb >= 1) {
  //       this.setState({ reverbMessage: "A Little" });
  //     } else {
  //       this.setState({ reverbMessage: "None" });
  //     }
  //   };

  //   return (
  //     <PrettoSlider
  //       aria-label="Choose your reverb"
  //       defaultValue={0}
  //       valueLabelDisplay="off"
  //       step={1}
  //       min={0}
  //       max={100}
  //       onChange={handleSliderChange}
  //     />
  //   );
  // }

  reverbCheckbox() {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      this.setState({ reverbChecked: !checked });
      if (!this.state.reverbChecked) {
        reverb = 0;
      } else {
        reverb = 60;
        this.setState({ reverbLevel: 60 });
        this.setState({ reverbMessage: "Recommended" });
      }
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

  sendFileToServer = async () => {
    formData.append("song", currFile);
    formData.append("speed", this.state.speed);
    formData.append("reverb", this.state.reverb);

    const res = await fetch("/upload-song", {
      method: "POST",
      body: formData,
    });
    const blob = await res.blob();
    download(blob, "Slowed " + currFile.path);
    blobUrl = URL.createObjectURL(blob);
    formData = new FormData();
    this.setState({ blob: blobUrl });
  };

  // async onSubmit(acceptedFiles) {
  //   var url = await sendFileToServer(acceptedFiles);
  //   this.setState({ blob: url });
  // }

  handleSpeedSliderChange(value) {
    this.setState({ speed: value });
    if (value >= 0.87) {
      this.setState({ speedMessage: "Slow it down some" });
    } else if (value >= 0.75) {
      this.setState({ speedMessage: "Recommended" });
    } else {
      this.setState({ speedMessage: "Hypnotizing" });
    }
  }

  handleReverbSliderChange(value) {
    this.setState({ reverb: value });
    if (value >= 100) {
      this.setState({ reverbMessage: "Max" });
    } else if (value >= 70) {
      this.setState({ reverbMessage: "A lot" });
    } else if (value >= 40) {
      this.setState({ reverbMessage: "Recommended" });
    } else if (value >= 1) {
      this.setState({ reverbMessage: "A Little" });
    } else {
      this.setState({ reverbMessage: "None" });
    }
  }

  render() {
    var audioPlayer;
    if (this.state.blob === undefined) {
      audioPlayer = <></>;
    } else {
      console.log("blob url: " + blobUrl);
      audioPlayer = (
        <audio src={blobUrl} controls style={{ width: "500px" }}></audio>
      );
    }
    var reverbChecked = this.state.reverbChecked;
    return (
      <div className="Dropzone">
        <StyledDropzone />
        <Card
          style={{
            backgroundColor: "#bdbdbd",
            opacity: 0.8,
            paddingTop: 0,
            alignItems: "center",
          }}
        >
          <CardContent>
            <div className="cardContents">
              <Typography fontWeight="fontWeightBold">
                Speed: {this.state.speed * 100}%
              </Typography>
              <CustomizedSlider
                defaultValue={1}
                step={0.01}
                min={0.6}
                max={1}
                onChange={this.handleSpeedSliderChange}
              />
              <Typography fontWeight="fontWeightBold">
                {this.state.speedMessage}
              </Typography>
              <this.reverbCheckbox />
              <div>
                {reverbChecked ? (
                  <>
                    <Typography fontWeight="fontWeightBold">
                      Reverb: {this.state.reverb}
                    </Typography>
                    <CustomizedSlider
                      defaultValue={this.state.reverb}
                      step={1}
                      min={0}
                      max={100}
                      onChange={this.handleReverbSliderChange}
                    />
                    <Typography fontWeight="fontWeightBold">
                      {this.state.reverbMessage}
                    </Typography>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <Button
                style={{
                  backgroundColor: "#8c2fa8",
                }}
                variant="contained"
                color="primary"
                onClick={(acceptedFiles) => this.sendFileToServer()}
              >
                Slow it Down
              </Button>
            </div>
          </CardContent>
        </Card>
        {audioPlayer}
      </div>
    );
  }
}

export default FrontPage;
