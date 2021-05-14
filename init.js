const mock_data = require("./action/mock_data")
const server = require("./action/server")

mock_data().then(data => start_mock_servers(data)).catch(err => { console.log("Could Not Load Data File " + err); })

function start_mock_servers(servers) { servers.forEach(server => { start_servers(server) }); }

function start_servers(props) { server.start(props) }