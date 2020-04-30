const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
var fs = require("fs");
// ffmpeg
var ffmpeg = require("fluent-ffmpeg");
var command = ffmpeg();

//sox
var sox = require("sox-stream");

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

// Upload song endpoint
app.post("/upload-song", async (req, res) => {
  try {
    if (!req.files) {
      console.log("reached");
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //save song in server temporarily
      let song = req.files.song;
      console.log(song.name);

      //get the speed and reverb values
      let speed = req.body.speed;
      let reverb = req.body.reverb;

      var tempSongFilePath = Math.random().toString(16).slice(2) + ".mp3";

      //Add modifications to audio file and save it
      try {
        // convert to ogg because sox mp3 support is fucked
        child = execSync(
          `ffmpeg -i ${song.tempFilePath} -f ogg ${song.tempFilePath}.ogg`
        );

        console.log(`adding slow: ${speed} reverb: ${reverb}`);
        if (reverb != 0) {
          // Add slowed and reverb effects
          // Use --norm to reduce clipping and normalize audio
          child = execSync(
            `sox --norm ${song.tempFilePath}.ogg ./SlowedSongs/${tempSongFilePath} speed ${speed} reverb ${reverb}`
          );
        } else {
          // Add just slowed effects
          // Use --norm to reduce clipping and normalize audio
          child = execSync(
            `sox --norm ${song.tempFilePath}.ogg ./SlowedSongs/${tempSongFilePath} speed ${speed}`
          );
        }
      } catch (err) {
        console.log(err);
      }

      console.log(
        req.files.song.name +
          " has been uploaded | Size: " +
          req.files.song.size
      );

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

      // remove temp song file
      //fs.unlink("./SlowedSongs/" + tempSongFilePath);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
