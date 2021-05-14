const mock_data = require("./action/mock_data")
const server = require("./action/server")

mock_data().then(data => { start_mock_servers(data); create_update_mock_data_server(data); }).catch(err => { console.log("Could Not Load Data File " + err); })

// Mock Server
const start_mock_servers = (servers) => { servers.forEach(server => { start_servers(server) }); }

const start_servers = (props) => { server.mock_server(props) }

// Server, that Updates Mock Data
const create_update_mock_data_server = (props) => { server.update_sever(props) }