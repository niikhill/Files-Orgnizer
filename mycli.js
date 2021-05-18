//input
let helpfileObj = require("./commands/help.js");
let viewfileObj = require("./commands/view.js");
let organizefileObj = require("./commands/organize.js");

let cmd_input = process.argv.slice(2);
//node  mycli.js view <dirname> tree
//node  mycli.js view <dirname> tree
//node  mycli.js organize <dirname> tree
//node  mycli.js help
let command = cmd_input[0];
let dirpath = cmd_input[1];
let mode = cmd_input[2];
switch (command) {
  case "view":
    viewfileObj.viewFun(dirpath, mode);
    break;
  case "organize":
    organizefileObj.organizeFn(dirpath);
    break;
  case "help":
    helpfileObj.helperFn();
    break;
  default:
    console.log(
      `Invalid input use "node mycli.js help" command to see the usage`
    );
}