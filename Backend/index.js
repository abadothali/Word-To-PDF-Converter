const express = require('express');
const multer = require('multer');
const docxTopdf = require('docx-pdf');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

app.use(cors());

// SETTING THE FILE STORAGE -
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }

});

const upload = multer({ storage: storage })

app.post('/convertFile', upload.single('file'), (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(404).json({
        message: "No File Uploaded..",
      });
    }

    // DEFINED THE FILE PATH -
    let outputPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`);

    docxTopdf(req.file.path, outputPath, (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error Occurred..",
        });

      }

      res.download(outputPath, () => {
        console.log('File downloaded..');
      });

    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mesasage: "Internall Server Error..",
    });
  }

});


app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
