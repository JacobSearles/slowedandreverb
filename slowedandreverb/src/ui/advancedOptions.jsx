import React from "react";
import "../App.css";
import Typography from "@material-ui/core/Typography";
import { CustomizedSlider } from "./slider";
import Box from "@material-ui/core/Box";

export class AdvancedOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hF: 50,
      roomScale: 100,
      stereoDepth: 100,
      preDelay: 0,
      wetGain: 0,
    };
    this.handleHF = this.handleHF.bind(this);
    this.handleRoomScale = this.handleRoomScale.bind(this);
    this.handleStereoDepth = this.handleStereoDepth.bind(this);
    this.handlePreDelay = this.handlePreDelay.bind(this);
    this.handleWetGain = this.handleWetGain.bind(this);
  }

  handleHF(value) {
    this.setState({ hF: value });
    this.props.onChangeHF(value);
  }

  handleRoomScale(value) {
    this.setState({ roomScale: value });
    this.props.onChangeRoomScale(value);
  }

  handleStereoDepth(value) {
    this.setState({ stereoDepth: value });
    this.props.onChangeStereoDepth(value);
  }

  handlePreDelay(value) {
    this.setState({ preDelay: value });
    this.props.onChangePreDelay(value);
  }

  handleWetGain(value) {
    this.setState({ wetGain: value });
    this.props.onChangeWetGain(value);
  }

  render() {
    return (
      <>
        <div className="center">
          <Box mb={-1} p={0}>
            <Typography
              style={{
                fontFamily: "Courier New",
                fontWeight: "bold",
              }}
            >
              HF Damping: {this.state.hF}%
            </Typography>
          </Box>
        </div>
        <CustomizedSlider
          defaultValue={this.state.hF}
          step={1}
          min={0}
          max={100}
          onChange={this.handleHF}
        />
        <div className="center">
          <Box m={-4} p={0}>
            <Typography
              style={{
                fontFamily: "Courier New",
                fontWeight: "bold",
              }}
            >
              Room Scale: {this.state.roomScale}%
            </Typography>
          </Box>
        </div>
        <CustomizedSlider
          defaultValue={this.state.roomScale}
          step={1}
          min={0}
          max={100}
          onChange={this.handleRoomScale}
        />
        <div className="center">
          <Box m={-4} p={0}>
            <Typography
              style={{
                fontFamily: "Courier New",
                fontWeight: "bold",
              }}
            >
              Stereo Depth: {this.state.stereoDepth}%
            </Typography>
          </Box>
        </div>
        <CustomizedSlider
          defaultValue={this.state.stereoDepth}
          step={1}
          min={0}
          max={100}
          onChange={this.handleStereoDepth}
        />
        <div className="center">
          <Box m={-4} p={0}>
            <Typography
              style={{
                fontFamily: "Courier New",
                fontWeight: "bold",
              }}
            >
              Pre-Delay: {this.state.preDelay}ms
            </Typography>
          </Box>
        </div>
        <CustomizedSlider
          defaultValue={this.state.preDelay}
          step={1}
          min={0}
          max={200}
          onChange={this.handlePreDelay}
        />
        <div className="center">
          <Box m={-4} p={0}>
            <Typography
              style={{
                fontFamily: "Courier New",
                fontWeight: "bold",
              }}
            >
              Wet Gain: {this.state.wetGain}dB
            </Typography>
          </Box>
        </div>
        <CustomizedSlider
          defaultValue={this.state.wetGain}
          step={1}
          min={-10}
          max={10}
          onChange={this.handleWetGain}
        />
      </>
    );
  }
}
