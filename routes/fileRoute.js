const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "uploads" });

const {
  check,
  getData,
  uploadFile,
  deleteFile,
  deleteData,
  // handleDownload,
} = require("../controllers/fileController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/check").get(check);
router.route("/data").get(getData).delete(deleteData);
router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/delete/:id").delete(deleteFile);
// router.route("/download/:id").get(handleDownload).post(handleDownload);

module.exports = router;
