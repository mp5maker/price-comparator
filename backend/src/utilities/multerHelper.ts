import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    const LOCATION = path.join(__dirname, "..", "static");
    if (!fs.existsSync(LOCATION)) {
      // @ts-ignore
      fs.mkdirSync(LOCATION, { recursive: true });
    }
    callback(null, LOCATION);
  },
  filename: function (_request, file, callback) {
    const FILE_NAME = `${Date.now()}${path.extname(file.originalname)}`;
    callback(null, FILE_NAME);
  },
});

const imageFilter = (_request, file, callback) => {
  const fileTypes = ["image/jpeg", "image/png"];

  if (fileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else callback(null, false);
};

export default {
  uploadImage: multer({ storage, fileFilter: imageFilter }),
};
