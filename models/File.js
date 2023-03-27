const mongoose = require("mongoose");

const File = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    minLength: 6,
  },
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("File", File);
