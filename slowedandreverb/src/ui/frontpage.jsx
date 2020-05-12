import React from "react";
import "../App.css";
import { StyledDropzone } from "./dragAndDrop";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CustomizedSlider } from "./slider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ReactGA from "react-ga";

var download = require("downloadjs");

let formData = new FormData();

var speed;
var reverb;
var songName;

let donateButton = (
  <form
    action="https://www.paypal.com/cgi-bin/webscr"
    method="post"
    target="_top"
  >
    <input type="hidden" name="cmd" value="_donations" />
    <input type="hidden" name="business" value="7BJVYZ6MYY952" />
    <input type="hidden" name="currency_code" value="USD" />
    <input
      type="image"
      src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
      border="0"
      name="submit"
      title="PayPal - The safer, easier way to pay online!"
      alt="Donate with PayPal button"
    />
    <img
      alt=""
      border="0"
      src="https://www.paypal.com/en_US/i/scr/pixel.gif"
      width="1"
      height="1"
    />
  </form>
);

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedMessage: "Slow it down some",
      reverbMessage: "None",
      speed: 1,
      reverb: 0,
      reverbChecked: false,
      file: undefined,
      blob: undefined,
      blobUrl: undefined,
      inProgress: false,
      showControls: true,
    };
    this.sendFileToServer = this.sendFileToServer.bind(this);
    this.reverbCheckbox = this.reverbCheckbox.bind(this);
    this.handleSpeedSliderChange = this.handleSpeedSliderChange.bind(this);
    this.handleReverbSliderChange = this.handleReverbSliderChange.bind(this);
    this.setDropzoneFile = this.setDropzoneFile.bind(this);
    this.setControls = this.setControls.bind(this);
  }

  componentDidMount() {
    // Set up Google Analytics
    ReactGA.initialize("UA-166259701-1");
    ReactGA.pageview("/");
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

  // Sends HTTP request for drag and dropped file
  sendFileToServer = async () => {
    formData.append("song", this.state.file);
    formData.append("speed", this.state.speed);
    formData.append("reverb", this.state.reverb);
    formData.append("fileType", this.state.file.type);

    ReactGA.event({
      category: "Slow Button",
      action: `Song: ${this.state.file.path}  Speed: ${this.state.speed}  Reverb: ${this.state.reverb}`,
    });

    this.setState({ inProgress: true });
    const res = await fetch("/upload-song", {
      method: "POST",
      body: formData,
    });
    this.setState({ inProgress: false });
    if (res.status === 200) {
      speed = this.state.speed;
      reverb = this.state.reverb;
      songName = this.state.file.path;
      const blob = await res.blob();
      this.setState({ blob: blob });
      this.setState({ blobUrl: URL.createObjectURL(blob) });
      this.setState({ showControls: false });
      formData = new FormData();
    } else {
      let body = await res.json();
      alert(body.message);
      formData = new FormData();
    }
  };

  handleSpeedSliderChange(value) {
    this.setState({ speed: value });
    if (value >= 0.91) {
      this.setState({ speedMessage: "Slow it down some" });
    } else if (value >= 0.8) {
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

  setDropzoneFile(file) {
    this.setState({ file: file });
  }

  setControls() {
    this.setState({ showControls: true });
  }

  render() {
    return (
      <>
        <div className="Dropzone">
          <StyledDropzone setFile={this.setDropzoneFile} />
        </div>
        <div className="center">
          <Card
            style={{
              backgroundColor: "#bdbdbd",
              opacity: 0.8,
              paddingTop: 0,
              alignItems: "center",
              width: 390,
            }}
          >
            <CardContent>
              <div className="cardContents">
                <div className="center">
                  <Box fontWeight="fontWeightBold" m={0} p={0}>
                    <Typography>Speed: {this.state.speed * 100}%</Typography>
                  </Box>
                </div>
                <CustomizedSlider
                  defaultValue={1}
                  step={0.01}
                  min={0.6}
                  max={1}
                  onChange={this.handleSpeedSliderChange}
                />
                <div className="center">
                  <Box fontStyle="oblique" m={0} p={0}>
                    <Typography>{this.state.speedMessage}</Typography>
                  </Box>
                </div>
                <this.reverbCheckbox />
                <div>
                  {this.state.reverbChecked ? (
                    <>
                      <div className="center">
                        <Box fontWeight="fontWeightBold" m={0} p={0}>
                          <Typography>Reverb: {this.state.reverb}</Typography>
                        </Box>
                      </div>
                      <CustomizedSlider
                        value={this.state.reverb}
                        step={1}
                        min={0}
                        max={100}
                        onChange={this.handleReverbSliderChange}
                      />
                      <div className="center">
                        <Box fontStyle="oblique" m={0} p={0}>
                          <Typography>{this.state.reverbMessage}</Typography>
                        </Box>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="center">
                  <Box m={1}>
                    <Button
                      disabled={this.state.file === undefined}
                      style={{
                        backgroundColor: "#8c2fa8",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={(acceptedFiles) => this.sendFileToServer()}
                    >
                      Slow it Down
                    </Button>
                  </Box>
                </div>
              </div>
              {this.state.blob && (
                <>
                  <Divider />
                  <div className="center">
                    <Box m={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          download(
                            this.state.blob,
                            "Slowed " + this.state.file.path
                          )
                        }
                      >
                        Download
                      </Button>
                    </Box>
                  </div>
                  <div className="center">
                    <Box m={1}>
                      <audio
                        src={this.state.blobUrl}
                        controls
                        style={{ width: "380px" }}
                      ></audio>
                    </Box>
                  </div>
                  <Box mb={1}>
                    <Divider />
                  </Box>
                </>
              )}
              <div className="center">{donateButton}</div>
            </CardContent>
          </Card>
        </div>
        {this.state.inProgress && (
          <div className="center">
            <LinearProgress style={{ width: 390 }} />
          </div>
        )}
        {this.state.blob ? (
          <>
            <div className="center">
              <Typography>{songName}</Typography>
            </div>
            <div className="center">
              <Typography>
                Speed: {speed * 100}% Reverb: {reverb}
              </Typography>
            </div>
          </>
        ) : (
          <Typography className="center">
            Slow a song down and you'll be able to test it out
          </Typography>
        )}
      </>
    );
  }
}

export default FrontPage;
