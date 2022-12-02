var express = require('express');
var cors = require('cors');
require('dotenv').config()
// const bodyParser = require('body-parser');
const multer = require("multer");

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

// ---------------------------------------------------------
// You can submit a form that includes a file upload.
// When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
// Eg. {"name":"index.js","type":"text/javascript","size":6217}
// ---------------------------------------------------------

//set file storage 
const upload = multer({ dest: "public/uploadFiles" });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    console.log(req.file);
    var result = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };
    res.send(result);
});
