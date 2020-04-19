const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
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

app.post("/test", (req, res) => {
  if (!req.body) {
    console.log("req.body is null");
    return res.sendStatus(400);
  }
  console.log(req.body);
  res.send({ message: `you sent: ${req.body.message}` });
});

app.post("/upload-song", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let song = req.files.song;
      song.mv("./songs/" + song.name);

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
