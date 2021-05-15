const express = require("express");
const update_mock = require("../action/update_mocks");
const router = require("./routes");
const { json } = require("body-parser");
function create_express_server(props) {
    return new Promise((resolve) => {
        const {port, apis, prefix} = props;
        const app = express();
        app.use(json())
        app.use(prefix, router.handle(apis));
        resolve(app.listen(port, () => {
            console.log(`Success! Your application is running on port ${port}.`)
        }).on('close', () => {
            console.log("Closing Server on " + port)
        }))
    })
};
function create_mock_update_server(restart_server) {
    const app = express();
    const port = 7890;
    app.get("/update_mocks", async(req, res) => {
        try {
            await update_mock.update();
            await restart_server();
            res
                .send("Updated")
                .status(200)
        } catch (err) {
            res
                .send("Failed")
                .status(500)
        }
    });
    app.listen(port, () => {
        console.log(`Success! Your application is running on port ${port}.`)
    }).on('close', () => {
        console.log("Closing Server on " + port)
    })
};
module.exports = {
    create_express_server,
    create_mock_update_server
};