const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
var fs = require("fs");

// command line jaunt
var execSync = require("child_process").execSync;
var child;

const app = express();

// Use temp file path so vanilla song files dont get saved
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const port = process.env.PORT || 5000;
const router = express.Router();

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/download-from-link", async (req, res) => {
  try {
    if (!req.body) {
      return res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Upload song endpoint
app.post("/upload-song", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(500).json({ message: "No file uploaded" });
    } else {
      //save song in server temporarily
      let song = req.files.song;

      //get the option values
      let speed = req.body.speed;
      let reverb = req.body.reverb;
      let advancedChecked = req.body.advancedChecked;
      let hF = req.body.hFDamping;
      let roomScale = req.body.roomScale;
      let stereoDepth = req.body.stereoDepth;
      let preDelay = req.body.preDelay;
      let wetGain = req.body.wetGain;
      let bitrate = req.body.bitrate;

      //determine file type
      var type;

      //cant use switch statement bc it uses strict "===" comparison :(
      if (req.body.fileType == "audio/wav") {
        type = "wav";
      } else if (req.body.fileType == "audio/mpeg") {
        type = "mp3";
      } else if (req.body.fileType == "audio/ogg") {
        type = "ogg";
      } else {
        return res.status(500).json({
          message:
            "Could not determine file type: " +
            req.body.fileType +
            " Supported File Types: mp3, wav, ogg",
        });
      }

      var tempSongFilePath = Math.random().toString(16).slice(2) + ".mp3";

      //Add modifications to audio file and save it
      try {
        console.log(
          `adding slow: ${speed} reverb: ${reverb} advance: ${advancedChecked}`
        );
        if (advancedChecked == "false" && reverb == 0) {
          // Add just slowed effects
          // Use --norm to reduce clipping and normalize audio
          child = execSync(
            `sox --norm -t ${type} ${song.tempFilePath} ./SlowedSongs/${tempSongFilePath} speed ${speed}`
          );
        } else {
          console.log(
            `speed ${speed} reverb ${reverb} ${hF} ${roomScale} ${stereoDepth} ${preDelay} ${wetGain} bitrate: ${bitrate}`
          );
          // Add slowed and reverb effects
          // Use --norm to reduce clipping and normalize audio
          child = execSync(
            `sox --norm -t ${type} ${song.tempFilePath} -C ${bitrate} ./SlowedSongs/${tempSongFilePath} speed ${speed} reverb ${reverb} ${hF} ${roomScale} ${stereoDepth} ${preDelay} ${wetGain}`
          );
        }
        // this runs if sox returns an error
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message:
            "Failed to modify audio file, make sure your file is not corrupt",
        });
      }

      res.download("./SlowedSongs/" + tempSongFilePath, song.name, function (
        err
      ) {
        if (err) {
          console.log("download failed");
        } else {
          fs.unlink("./SlowedSongs/" + tempSongFilePath, function (err) {
            if (err) {
              console.log("could not delete temp song file");
            }
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
