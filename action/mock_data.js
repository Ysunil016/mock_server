const fs = require("fs");
const readMockData = async() => {
    return new Promise(async(resolve) => {
        const fileData = await read_file("./data/config.json");
        const jsonData = JSON.parse(fileData);
        resolve(jsonData)
    })
};
async function read_file(file_path) {
    return new Promise(async(resolve, reject) => {
        fs.readFile(file_path, (err, data) => {
            if (err) {
                throw reject(err)
            }
            resolve(data)
        })
    })
};
module.exports = readMockData;