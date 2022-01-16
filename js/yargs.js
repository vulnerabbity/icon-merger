const yargs = require("yargs");

yargs.options({
  "i": {
    alias: "input",
    type: "string",
    describe: "Indicate icons directory",
    demandOption: true,
    nargs: 1
  }
})

yargs.options({
  "o": {
    alias: "output",
    type: "string",
    describe: "Indicates icons bundle file",
    default: "bundle.svg",
    nargs: 1
  }
})

yargs.options({
  "l": {
    alias: "logging",
    type: "boolean",
    default: false,
    nargs: 0
  }
})

module.exports = yargs