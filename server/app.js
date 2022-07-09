const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Grid = require("gridfs-stream");

const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./Routes/index");
const upload = require("./Routes/upload");
const port = 8085;
const hostname = "localhost";
const dburl = `mongodb+srv://Vombol654:Vombol_654@cluster0.gemvk.mongodb.net/Mentor?retryWrites=true&w=majority`;
const Razorpay = require("razorpay");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use("/file", upload);

let gfs, gridfsBucket;

const conn = mongoose.connection;
// conn.once("open", function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("photos");
// });

conn.once("open", () => {
  //Init Stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

// media router
app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    // console.log(file);
    const readStream = gridfsBucket.openDownloadStream(file._id); //gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    // console.log(error);
    res.send("Not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.json({ message: "Successfully deleted..." });
  } catch (error) {
    // console.log(error);
    res.json({ message: "An error occured..." });
  }
});

mongoose
  .connect(dburl)
  .then((res) => {
    app.listen(port, hostname, () => {
      console.log(`server is running on ${hostname}:${port}`);
    });
  })
  .catch((err) => console.log(err));
