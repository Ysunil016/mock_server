const fetch_mock_data = require("./action/mock_data");
const server = require("./action/server");
require("dotenv").config()
function start() {
    const server_props = fetch_mock_data();
    start_mock_servers(server_props);
    start_update_mock_server()
};
const start_mock_servers = (servers_props) => {
    server.start(servers_props)
};
const start_update_mock_server = () => {
    server.update_mock()
};

start();