const mongoose = require('mongoose')

const Schema = mongoose.Schema

const singleFileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileData: {
      type: String,
      require: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    filePathJs: {
      type: String,
      require: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('SingleFile', singleFileSchema)
