const path = require("path");
const fs = require("fs");

const dirName = path.join(__dirname, "/ddd");

const base64ToText = (dirName) => {
  fs.readdirSync(dirName).forEach((file) => {
    let fileName = file;
    let buff = Buffer.from(fileName, "base64");
    let text = buff.toString("ascii");

    fs.renameSync(`${dirName}/${file}`, `${dirName}/${text}.txt`);
  });
};

const print = (dirName) => {
  fs.readdirSync(dirName)
    .sort((a, b) => +a.split(".")[0] - +b.split(".")[0])
    .forEach((file) => {
      const data = fs.readFileSync(`${dirName}/${file}`, "utf8");
      console.log(data);
    });
};

base64ToText(dirName);
print(dirName);
