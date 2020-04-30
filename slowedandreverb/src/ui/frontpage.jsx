import React from "react";
import "../App.css";
import { StyledDropzone, currFile } from "./dragAndDrop";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CustomizedSlider } from "./slider";

var download = require("downloadjs");

let formData = new FormData();

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedMessage: "Slow it down some",
      reverbMessage: "Recommended",
      speed: 1,
      reverb: 0,
      reverbChecked: false,
      blob: undefined,
      blobUrl: undefined
    };
    this.sendFileToServer = this.sendFileToServer.bind(this);
    this.reverbCheckbox = this.reverbCheckbox.bind(this);
    this.handleSpeedSliderChange = this.handleSpeedSliderChange.bind(this);
    this.handleReverbSliderChange = this.handleReverbSliderChange.bind(this);
  }


  reverbCheckbox() {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      this.setState({ reverbChecked: !checked });
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
    this.setState({ blob: blob });
    //download(blob, "Slowed " + currFile.path);
    this.setState({ blobUrl: URL.createObjectURL(blob)});
    formData = new FormData();
  };

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
    if (this.state.blobUrl === undefined) {
      audioPlayer = <></>;
    } else {
      console.log("blob url: " + this.state.blobUrl);
      audioPlayer = (
        <audio src={this.state.blobUrl} controls style={{ width: "500px" }}></audio>
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
        <div style={{float: "left"}}>
        {audioPlayer}
        </div>
        <div style={{float: "left"}}>
        {this.state.blob && <Button style={{backgroundColor: "#8c2fa8"}} variant="contained" color="primary" onClick={() => download(this.state.blob, "Slowed " + currFile.path)}>Download</Button>}
        </div>
      </div>
    );
  }
}

export default FrontPage;
