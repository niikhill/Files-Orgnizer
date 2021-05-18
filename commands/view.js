const fs = require("fs");
const p = require("path");

function view(dirpath, mode) {
  if (mode == "tree") {
    viewTree(dirpath, "");
  } else if (mode == "flat") {
    viewFlat(dirpath);
  } else {
    console.log("wrong mode");
  }
}

function isFileorNot(dirpath) {
  return fs.lstatSync(dirpath).isFile();
}

function getContent(dirpath) {
  return fs.readdirSync(dirpath);
}

function viewTree(dirpath, indent) {
  let isFile = isFileorNot(dirpath);
  if (isFile == true) {
    //let stArr= dirpath.split("\\");
    //let toprint = stArr.pop();
    //console.log(indent,toprint);
    console.log(indent, p.basename(dirpath));
  } else {
    //let stArr= dirpath.split("\\");
    //let toprint = stArr.pop();
    //console.log(indent,toprint);
    console.log(indent, p.basename(dirpath));
    //recursion
    let content = getContent(dirpath);
    //console.log(content);
    for (let i = 0; i < content.length; i++) {
      //let childpath = dirpath + "\\" + content[i];
      let childpath = p.join(dirpath, content[i]);
      viewTree(childpath, indent + "\t");
    }
  }
}

function viewFlat(dirpath) {
  let isFile = isFileorNot(dirpath);
  if (isFile == true) {
    console.log(dirpath + "*");
  } else {
    console.log(dirpath);
    //recursion
    let content = getContent(dirpath);
    //console.log(content);
    for (let i = 0; i < content.length; i++) {
      let childpath = p.join(dirpath, content[i]);
      viewFlat(childpath);
    }
  }
}

module.exports = {
  viewFun: view,
};
