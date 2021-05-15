const express = require("../server/express_server");
const fetch_mock_data = require("../action/mock_data");
var servers = [];
async function start(server_props) {
    server_props.forEach(async (server) => {
        await mock_server(server)
    })
};
const mock_server = (server_props) => {
    return new Promise(async (resolve) => {
        start_server_log("Mock Server", server_props);
        const server = await create_server(server_props);
        servers.push(server);
        resolve(true)
    })
};
const create_server = (props) => {
    return new Promise(async (resolve) => {
        const created_server = await express.create_express_server(props);
        resolve(created_server)
    })
};
const start_server_log = (message, props) => {
    const { name, port } = props;
    if (name) {
        console.log(message + " on " + port)
    } else {
        throw "Please Specify Correct Server Props"
    }
};
const restart = async () => {
    return new Promise(async (resolve) => {
        servers.forEach(async (server, index) => {
            await server.close()
        });
        servers = [];
        setTimeout(async () => {
            const new_mock_data = await fetch_mock_data();
            await start(new_mock_data);
        }, 30_000)
        resolve(true)
    })
};
function update_mock() {
    express.create_mock_update_server(restart)
};
module.exports = {
    start,
    update_mock,
    restart
};