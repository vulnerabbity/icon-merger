const fs = require("fs")
const path = require("path")


function getCurrentDirectory() {
  return process.cwd()
}

exports.getCurrentDirectory = getCurrentDirectory

function getAllFilenames(dir, filenamesArray = []) {
  const currentDirectoryContent = fs.readdirSync(dir)
  const currentDirectoryFilenames = addDirectoryToFilenames(dir, currentDirectoryContent)

  currentDirectoryFilenames.forEach(filename => {
    const filenameIsDir = isDirectory(filename)

    if(filenameIsDir) {
      getAllFilenames(filename, filenamesArray)
    } else {
      filenamesArray.push(filename)
    }
  })

  return filenamesArray
}

exports.getAllFilenames = getAllFilenames

function getFilenamesByExtensions(dir, extensions) {
  extensions = new Set(extensions)
  const allFilenames = getAllFilenames(dir)
  return allFilenames.filter(filename => {
    const fileExtension = filename.split(".").at(-1)
    return extensions.has(fileExtension)
  })
}

function isDirectory(path) {
  return fs.statSync(path).isDirectory()
}

function addDirectoryToFilenames(dir, filenames) {
  return filenames.map(filename => `${dir}/${filename}`)
}

exports.getFilenamesByExtensions = getFilenamesByExtensions