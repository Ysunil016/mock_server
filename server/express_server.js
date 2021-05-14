const express = require("express")
const update_mock = require("../action/update_mocks")

function create_express_server(props) {
    return new Promise((resolve) => {
        const { port, apis } = props
        const app = express()

        add_router_to_server(app, apis)

        resolve(app.listen(port, () => {
            console.log(`Success! Your application is running on port ${port}.`);
        }).on('close', () => { console.log("Closing Server on " + port); }))
    })
}

function add_router_to_server(server, apis) {
    apis.forEach(api => {
        create_route(server, api)
    });
}

function create_route(server, api) {
    const { endpoint, response, status } = api
    server.get(endpoint, (req, res) => {
        res.json(response).status(status)
    })
}

function create_mock_update_server(restart_server) {
    const app = express()
    const port = 7890

    app.get("/update_mocks", async (req, res) => {
        try{
            await update_mock.update()
            await restart_server()
            res.send("Updated").status(200)
        }catch(err){
            res.send("Failed").status(500)
        }        
    })

    app.listen(port, () => {
        console.log(`Success! Your application is running on port ${port}.`);
    }).on('close', () => { console.log("Closing Server on " + port); })
}

module.exports = { create_express_server, create_mock_update_server }