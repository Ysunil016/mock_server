const fs = require("fs")

const readMockData = async () => {
    const fileData = await read_file("./data.json")
    const jsonData = JSON.parse(fileData)
    return jsonData
}

async function read_file(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, (err, data) => {
            if (err) throw reject(err)
            resolve(data)
        })
    })
}

module.exports = readMockData