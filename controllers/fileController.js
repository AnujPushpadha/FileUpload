const File = require("../models/File");
const multer = require("multer");
const bcrypt = require("bcrypt");
const check = (req, res) => {
  res.send("working");
};

const getData = async (req, res) => {
  try {
    const items = await File.find({ user_id: req.user.id });
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (req, res) => {
  console.log(req.body);
  //   res.send("post");
  try {
    if (!req.body.code) {
      res.status(400);
      throw new Error("Enter code");
    }
    // console.log(req.file.path);
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname,
    };
    // console.log(fileData);
    fileData.name = req.body.name;
    if (req.body.code != null && req.body.code !== "") {
      fileData.code = await bcrypt.hash(req.body.code, 10);
    }
    fileData.user_id = req.user.id;

    // console.log(fileData);
    const file = await File.create(fileData);

    console.log(file);

    //   res.send(file.originalName);
    res
      .status(200)
      .json({ path: `http://${req.headers.host}/download/${file._id}` });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: error.message });
  }
};

const deleteFile = async (req, res) => {
  console.log("hi");
  try {
    const file = await File.findByIdAndDelete(req.params.id);

    // await file.save();

    res.send("deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const file = await File.deleteMany();

    // await file.save();

    res.send("deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// const handleDownload = async (req, res) => {
//   const file = await File.findById(req.params.id);
//   console.log(req.body, "45");
//   if (file.code != null) {
//     if (req.body.code == null) {
//       res.render("password");
//       // res.status(401).json({ error: "enter code" });
//       return;
//     }
//     if (!(await bcrypt.compare(req.body.code, file.code))) {
//       res.render("password", { error: true });
//       // res.status(401).json({ error: true });
//       return;
//     }
//   } else {
//     res.send("password not entered");
//   }
//   file.downloadCount++;
//   await file.save();
//   console.log(file.downloadCount);
//   res.download(file.path, file.originalName);
// };

module.exports = {
  check,
  getData,
  uploadFile,
  deleteFile,
  deleteData,
  // handleDownload,
};
