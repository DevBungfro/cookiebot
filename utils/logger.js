const chalk = require('chalk');
const moment = require("moment");
  const timestamp = `[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`;

   function log(content){
    console.log(`${chalk.cyan(timestamp)} ${chalk.blue.underline(('[LOG]'))} ${content}`)
  }

  function loader(content){
    console.log(`${chalk.cyan(timestamp)} ${chalk.green.underline(('[LOADER]'))} ${content}`)
  }

  function error(content){
    console.log(`${chalk.cyan(timestamp)} ${chalk.red.underline(('[ERROR]'))} ${content}`)
  }

  function warn(content){
    console.log(`${chalk.cyan(timestamp)} ${chalk.yellow.underline(('[WARN]'))} ${content}`)
  }

  function info(content){
    console.log(`${chalk.cyan(timestamp)} ${chalk.magenta.underline(('[INFO]'))} ${content}`)
  }

  function database(content){
    console.log(`${chalk.cyan(timestamp)} ${chalk.yellowBright.underline(('[DATABASE]'))} ${content}`)
  }

module.exports = {
  log,
  loader,
  error,
  warn,
  info,
  database
};