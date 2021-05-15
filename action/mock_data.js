const fs = require("fs");
const readMockData = () => {
    return JSON.parse(fs.readFileSync("./data/config.json"))
};
function read_file(file_path) {
    return new Promise(async (resolve) => {
        resolve(fs.readFileSync(file_path))
    })
};
module.exports = readMockData;