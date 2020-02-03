const fs = require("fs");

let textByLine = fs
  .readFileSync("./text.txt")
  .toString()
  .split("\n");

let users = [];

for (let i = 0; i < textByLine.length; i += 4) {
  let user = {
    name: textByLine[i],
    x: textByLine[i + 1],
    y: textByLine[i + 2],
    z: textByLine[i + 3]
  };
  users.push(user);
}

fs.writeFileSync(__dirname + "/data", JSON.stringify(users, null, 1), "utf-8");
