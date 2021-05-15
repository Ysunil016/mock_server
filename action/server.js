const express = require("../server/express_server");
const fetch_mock_data = require("../action/mock_data");
var servers = [];
function start(server_props) {
    server_props.forEach(server => {
        mock_server(server)
    })
};
const mock_server = (server_props) => {
    start_server_log("Mock Server", server_props);
    const server = create_server(server_props);
    servers.push(server);
};
const create_server = (props) => {
    const created_server = express.create_express_server(props);
    return created_server
};
const start_server_log = (message, props) => {
    const { name, port } = props;
    if (name) {
        console.log(message + " on " + port)
    } else {
        throw "Please Specify Correct Server Props"
    }
};
const restart = () => {
    const new_mock_data = fetch_mock_data();
    servers.forEach(server => {
        server.close()
    });
    servers = [];
    start(new_mock_data);
};
function update_mock() {
    express.create_mock_update_server(restart)
};
module.exports = {
    start,
    update_mock,
    restart
};