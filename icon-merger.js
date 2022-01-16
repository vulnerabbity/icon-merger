const fs = require("fs")
const path = require("path")
const svgstore = require("svgstore")
const yargs = require("./js/yargs")
const { getFilenamesByExtensions, getCurrentDirectory } = require("./js/filesystem")

const consoleArgs = yargs.argv

// directory where util was called
const callerDirectory = getCurrentDirectory()

const iconsDirectory = `${callerDirectory}/${consoleArgs.input}`
const iconsFilenames = getFilenamesByExtensions(iconsDirectory, ["svg"])
const iconsBundleFilename = `${callerDirectory}/${consoleArgs.output}`

function mergeIcons() {
  const sprite = svgstore()

  iconsFilenames.forEach((iconFilename) => {
    const iconFile = fs.readFileSync(iconFilename, "utf-8")

    const iconFilenameWithoutPath = path.parse(iconFilename).base
    const iconName = iconFilenameWithoutPath.split(".").at(0)

    // icon name will be id for icon in sprite
    sprite.add(iconName, iconFile)
  })

  fs.writeFileSync(iconsBundleFilename, sprite)
}


function main () {
  mergeIcons()

  if (consoleArgs.logging) {
    console.log(`Merged ${iconsFilenames.length} icons in ${iconsBundleFilename}`)
  }
}

main()