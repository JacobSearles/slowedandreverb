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
import Link from "@material-ui/core/Link";
import ReactGA from "react-ga";
import { AdvancedOptions } from "./advancedOptions";
import { SelectBitrate } from "./dropDown";

var download = require("downloadjs");

let formData = new FormData();

let eventNum = 1;

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
      hF: 50,
      roomScale: 100,
      stereoDepth: 100,
      preDelay: 0,
      wetGain: 0,
      bitrate: 128,
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
    this.handleHFChange = this.handleHFChange.bind(this);
    this.handleRoomScaleChange = this.handleRoomScaleChange.bind(this);
    this.handleStereoDepthChange = this.handleStereoDepthChange.bind(this);
    this.handlePreDelayChange = this.handlePreDelayChange.bind(this);
    this.handleWetGainChange = this.handleWetGainChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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
            size="small"
            style={{
              color: "#8c2fa8",
            }}
          />
        }
        label="Advanced Options"
      />
    );
  }

  // Sends HTTP request for drag and dropped file
  sendFileToServer = async () => {
    // add file and options to form data
    formData.append("song", this.state.file);
    formData.append("speed", this.state.speed);
    formData.append("reverb", this.state.reverb);
    formData.append("advancedChecked", this.state.reverbChecked);
    formData.append("hFDamping", this.state.hF);
    console.log(this.state.roomScale);
    formData.append("roomScale", this.state.roomScale);
    formData.append("stereoDepth", this.state.stereoDepth);
    formData.append("preDelay", this.state.preDelay);
    formData.append("wetGain", this.state.wetGain);
    formData.append("bitrate", this.state.bitrate);
    formData.append("fileType", this.state.file.type);

    // Save event
    ReactGA.event({
      category: "Slow Button",
      action: `Song: ${this.state.file.path}  Speed: ${this.state.speed}  Reverb: ${this.state.reverb}  Advanced: ${this.state.reverbChecked}`,
      value: eventNum,
    });
    eventNum++;

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
    if (value >= 0.93) {
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

  // handle bitrate drop down
  handleDropdownChange(value) {
    this.setState({ bitrate: value });
  }

  // advanced options slider callbacks
  handleHFChange(value) {
    this.setState({ hF: value });
  }
  handleRoomScaleChange(value) {
    this.setState({ roomScale: value });
  }
  handleStereoDepthChange(value) {
    this.setState({ stereoDepth: value });
  }
  handlePreDelayChange(value) {
    this.setState({ preDelay: value });
  }
  handleWetGainChange(value) {
    this.setState({ wetGain: value });
  }

  render() {
    return (
      <>
        <div align="center">
          <div className="sidebarAds">
            {/* Ezoic - sidebar - sidebar */}
            <div id="ezoic-pub-ad-placeholder-104"> </div>
            {/* End Ezoic - sidebar - sidebar */}
            {/* Ezoic - sidebar_bottom - sidebar_bottom */}
            <div id="ezoic-pub-ad-placeholder-106"> </div>
            {/* End Ezoic - sidebar_bottom - sidebar_bottom */}

          </div>

          <div className="sidebarAds">
            {/* Ezoic - top_of_page - top_of_page */}
            <div id="ezoic-pub-ad-placeholder-101"> </div>
            {/* End Ezoic - top_of_page - top_of_page */}
            <div className="center">
              <Typography
                variant="h3"
                style={{ fontFamily: "Courier New", color: "#ffffff" }}
                gutterBottom
              >
                Slow + Reverb Generator
              </Typography>
            </div>
            <Typography
              className="center"
              style={{ fontFamily: "Courier New", color: "#ffffff" }}
            >
              Add high quality Slow + Reverb effects to any song, and try it out
              before downloading
            </Typography>
            {/* Ezoic - under_page_title - under_page_title */}
            <div id="ezoic-pub-ad-placeholder-102"> </div>
            {/* End Ezoic - under_page_title - under_page_title */}
            <div className="Dropzone">
              <StyledDropzone setFile={this.setDropzoneFile} />
            </div>
            {/* Ezoic - under_first_paragraph - under_first_paragraph */}
            <div id="ezoic-pub-ad-placeholder-103"> </div>
            {/* End Ezoic - under_first_paragraph - under_first_paragraph */}
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
                      <Box fontWeight="fontWeightBold" mb={-1} p={0}>
                        <Typography
                          style={{ fontFamily: "Courier New", fontWeight: "bold" }}
                        >
                          Speed: {this.state.speed * 100}%
                        </Typography>
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
                      <Box mt={-1} p={0}>
                        <Typography style={{ fontFamily: "Courier New" }}>
                          {this.state.speedMessage}
                        </Typography>
                      </Box>
                    </div>
                    <div className="center">
                      <Box mb={-1} p={0}>
                        <Typography
                          style={{
                            fontFamily: "Courier New",
                            fontWeight: "bold",
                          }}
                        >
                          Reverb: {this.state.reverb}%
                        </Typography>
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
                      <Box mt={-1} p={0}>
                        <Typography style={{ fontFamily: "Courier New" }}>
                          {this.state.reverbMessage}
                        </Typography>
                      </Box>
                    </div>
                    <div className="left">
                      <this.reverbCheckbox />
                    </div>
                    {this.state.reverbChecked && (
                      <>
                        <AdvancedOptions
                          onChangeHF={this.handleHFChange}
                          onChangeRoomScale={this.handleRoomScaleChange}
                          onChangeStereoDepth={this.handleStereoDepthChange}
                          onChangePreDelay={this.handlePreDelayChange}
                          onChangeWetGain={this.handleWetGainChange}
                        />
                        <SelectBitrate onChange={this.handleDropdownChange} />
                      </>
                    )}
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
                  <Typography
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Help me cover server costs so I can keep the site up
                  </Typography>
                  <div className="center">{donateButton}</div>
                </CardContent>
              </Card>
            </div>
            {this.state.inProgress && (
              <div className="center">
                <LinearProgress style={{ width: 390 }} />
              </div>
            )}
            <div className="center">
              <Typography
                style={{
                  fontFamily: "Courier New",
                  color: "#ffffff",
                }}
              >
                Add song to your&nbsp;
                <Link
                  target="_blank"
                  href="https://support.spotify.com/us/using_spotify/features/listen-to-local-files/"
                  underline="always"
                  style={{
                    fontFamily: "Courier New",
                    color: "#ffffff",
                  }}
                >
                  Spotify
                </Link>
                &nbsp;or&nbsp;
                <Link
                  target="_blank"
                  href="https://support.apple.com/guide/music/import-items-already-on-your-computer-mus3081/mac"
                  underline="always"
                  style={{
                    fontFamily: "Courier New",
                    color: "#ffffff",
                  }}
                >
                  Apple Music
                </Link>
              </Typography>
            </div>
            {this.state.blob && (
              <>
                <div className="center">
                  <Typography
                    style={{ fontFamily: "Courier New", color: "#ffffff" }}
                  >
                    {songName}
                  </Typography>
                </div>
                <div className="center">
                  <Typography
                    style={{ fontFamily: "Courier New", color: "#ffffff" }}
                  >
                    Speed: {speed * 100}% Reverb: {reverb}%
                  </Typography>
                </div>
                {/* Ezoic - bottom_of_page - bottom_of_page */}
                <div id="ezoic-pub-ad-placeholder-108"> </div>
                {/* End Ezoic - bottom_of_page - bottom_of_page */}
              </>
            )}
          </div>
          <div className="sidebarAds">
            {/* Ezoic - sidebar_middle - sidebar_middle */}
            <div id="ezoic-pub-ad-placeholder-105"> </div>
            {/* End Ezoic - sidebar_middle - sidebar_middle */}
            {/* Ezoic - sidebar_floating_1 - sidebar_floating_1 */}
            <div id="ezoic-pub-ad-placeholder-107"> </div>
            {/* End Ezoic - sidebar_floating_1 - sidebar_floating_1 */}
          </div>
        </div>
      </>
    );
  }
}

export default FrontPage;
