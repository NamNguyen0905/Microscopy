const fs = require("fs");
const util = require("util");
const copyFile = util.promisify(fs.copyFile);
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);
const path = require("path");

let buffer = fs.readFileSync(__dirname + "/data");
var users = JSON.parse(buffer);

for (let i = 0; i < users.length; i++) {
  if (!fs.existsSync("./0/" + users[i].y)) {
    fs.mkdir("./0/" + users[i].y, error => {});
  }

  fs.rename(
    "./A7/" + users[i].name + ".jpg",
    "./0/" + users[i].y + "/" + users[i].x + ".jpg",
    function(err) {
      if (err) throw err;
      console.log("Move complete.");
    }
  );
}
