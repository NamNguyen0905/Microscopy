const fs = require("fs");
const util = require("util");
const copyFile = util.promisify(fs.copyFile);
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);
const path = require("path");

let buffer = fs.readFileSync(__dirname + "/data");
var users = JSON.parse(buffer);

function moveFileTo(file, dest) {
  // get the file name of the path
  const fileName = path.basename(file);

  // combine the path of destination directory and the filename
  const destPath = path.join(dest, fileName);

  try {
    await fs.rename(file, destPath);
  } catch (err) {
    if (err.code === "EXDEV") {
      // we need to copy if the destination is on another parition
      await copyFile(file, destPath);

      // delete the old file if copying was successful
      await unlink(file);
    } else {
      // re throw the error if it is another error
      throw err;
    }
  }
}

for (let i = 0; i < users.length; i++) {
  if (!fs.existsSync("./A7/" + users.y)) {
    fs.mkdir("./0/" + users.y, callback);
  }
  moveFileTo(
    "./0/" + users.y + "/" + users.name + ".jpg",
    "./0/" + users.y + "/" + users.x + ".jpg"
  );
}
