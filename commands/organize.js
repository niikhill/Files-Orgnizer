let fs = require("fs");

let path = require("path");
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function dirCreator(dirpath) {
  if (fs.existsSync(dirpath) == false) {
    fs.mkdirSync(dirpath);
  }
}
function getFolderName(src) {
  let strArr = src.split(".");
  let ext = strArr.pop();
  for (let key in types) {
    for (let i = 0; i < types[key].length; i++) {
      if (types[key][i] == ext) {
        return key;
      }
    }
  }
  return "others";
}
function isFileorNOt(dirpath) {
  return fs.lstatSync(dirpath).isFile();
}
function listContent(dirpath) {
  return fs.readdirSync(dirpath);
}

function organizedFiles(src, organizedFilePath) {
  let isFile = fs.lstatSync(src).isFile();
  if (isFile == true) {
    let destFoldername = getFolderName(src);
    let destFolderPath = path.join(organizedFilePath, destFoldername);
    cptodest(src, destFolderPath);
  } else {
    let content = fs.readdirSync(src);
    for (let i = 0; i < content.length; i++) {
      let childpath = path.join(src, content[i]);
      organizedFiles(childpath, organizedFilePath);
    }
  }
}

function cptodest(dirpath, destfolderpath) {
  let originalname = path.basename(dirpath);
  let destfilepath = path.join(destfolderpath, originalname);
  fs.copyFileSync(dirpath, destfilepath);
  console.log("Done");
}

function OrganizeFn(dirpath) {
  let organizedFilePath = path.join(dirpath, "organized_files");
  dirCreator(organizedFilePath);
  for (let key in types) {
    let innerDirPath = path.join(organizedFilePath, key);
    //fs.mkdirSync(innerDirPath);
    dirCreator(innerDirPath);
  }
  let otherPath = path.join(organizedFilePath, "others");
  dirCreator(otherPath);
  organizedFiles(dirpath, organizedFilePath);
}

module.exports = {
  organizeFn: OrganizeFn,
};
