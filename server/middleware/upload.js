const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

const storage = new GridFsStorage({
  url: "mongodb+srv://Vombol654:Vombol_654@cluster0.gemvk.mongodb.net/Mentor?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-MentorOnDemand-${file.originalname.replaceAll(
        " ",
        "_"
      )}`;
      console.log(filename);
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-MentorOnDemand-${file.originalname.replaceAll(
        " ",
        "_"
      )}`,
    };
  },
});

module.exports = multer({ storage });
