const express = require("express");
const cors = require("cors");

const connectDb = require("./config/dbConnection");
//for download
const multer = require("multer");
const bcrypt = require("bcrypt");
const File = require("./models/File");
//for download
const dotenv = require("dotenv").config();
const router = express.Router();
const app = express();

app.set("view engine", "ejs"); // for download page
const errorHandler = require("./middleware/errorHandler");
const fileRoute = require("./routes/fileRoute");
const userRoutes = require("./routes/userRoutes");
app.use(express.urlencoded({ extended: true })); //for
app.use(cors());
app.use(express.json());
connectDb();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/file", fileRoute);
app.use("/users", userRoutes);

app.route("/download/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const file = await File.findById(req.params.id);
  // console.log(req.body, "45");
  if (file.code != null) {
    if (req.body.code == null) {
      res.render("password");
      // res.status(401).json({ error: "enter code" });
      return;
    }
    if (!(await bcrypt.compare(req.body.code, file.code))) {
      res.render("password", { error: true });
      // res.status(401).json({ error: true });
      return;
    }
  } else {
    res.send("password not entered");
  }
  file.downloadCount++;
  await file.save();
  console.log(file.downloadCount);
  res.download(file.path, file.originalName);
}
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port);
