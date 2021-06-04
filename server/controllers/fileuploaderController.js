'use strict'
const SingleFile = require('../models/singlefile')
const MultipleFile = require('../models/multiplefile')
const fs = require('fs')

const singleFileUpload = async (req, res, next) => {
  try {
    const { spawn } = require('child_process')
    // let pos = filePath.lastIndexOf(".");

    const file = new SingleFile({
      fileName: req.file.originalname,
      filePath: req.file.path,
      filePathJs: req.file.path.replace(/\.[^.]+$/, '.js'),
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 0.00,
    })
    await file.save()
    res.status(201).send('File Uploaded Successfully')
    const bat = await spawn('cmd.exe', ['/c', `cd uploads &&  node cli.js ${file.fileName}`])

    bat.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    bat.stderr.on('data', (data) => {
      console.error(data.toString())
    })

    bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`)
    })
    var initialTime = Date.now()
    const timeOut = setTimeout(
      (t) => {
        file.fileData = setTimeout(
          fs.readFile(`${file.filePathJs}`, (data) => {
            console.log(data)
          })
        )
      },
      1000,
      initialTime
    )
    clearTimeout(timeOut)

    await file.save()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const multipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = []
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      }
      filesArray.push(file)
    })
    const multipleFiles = new MultipleFile({
      title: req.body.title,
      files: filesArray,
    })
    await multipleFiles.save()
    res.status(201).send('Files Uploaded Successfully')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await SingleFile.find()
    res.status(200).send(files)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await MultipleFile.find()
    res.status(200).send(files)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const dm = decimal || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
  const index = Math.floor(Math.log(bytes) / Math.log(1000))
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
}

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
}
