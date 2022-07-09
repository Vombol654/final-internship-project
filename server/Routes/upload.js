const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (req.file === undefined) return res.send("You must select a file.");
  const imgUrl = `http://localhost:8085/file/${req.file.filename}`;
  console.log(imgUrl);
  return res.json({ imageUrl: imgUrl });
});

module.exports = router;
