const express = require("express")

function create_express_server(props) {
    const { port, apis } = props
    const app = express()

    add_router_to_server(app, apis)

    app.listen(port, () => {
        console.log(`Success! Your application is running on port ${port}.`);
    }).on('close', () => { console.log("Closing Server on " + port); })

    return app
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

module.exports = { create_express_server }