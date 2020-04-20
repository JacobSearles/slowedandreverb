const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
var ffmpeg = require("fluent-ffmpeg");
var command = ffmpeg();

const app = express();

// Use temp file path so vanilla song files dont get saved
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

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
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      console.log(req.body);
      //save song in server temporarily
      let song = req.files.song;

      //get the speed and reverb values
      let speed = req.body.speed;
      let reverb = req.body.reverb;

      console.log("reverb: " + reverb);

      //Add modifications to audio file and save it
      if (reverb) {
        ffmpeg()
          .input(song.tempFilePath)
          .input("./IRReverbFiles/WireGrind_m_0.3s_06w_100Hz_02m.wav")
          .outputOptions(`-lavfi afir,atempo=${speed},asetrate=44100*${speed}`)
          .save("./SlowedSongs/" + song.name);
      } else {
        ffmpeg()
          .input(song.tempFilePath)
          .outputOptions([`-af atempo=${speed}`, `-af asetrate=44100*${speed}`])
          .save("./SlowedSongs/" + song.name);
      }

      console.log(
        req.files.song.name +
          " has been uploaded | Size: " +
          req.files.song.size
      );
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: song.name,
          mimetype: song.mimetype,
          size: song.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
