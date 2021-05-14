const fetch_mock_data = require("./action/mock_data")
const server = require("./action/server")

async function start(){
    const server_props = await fetch_mock_data()
    start_mock_servers(server_props); 
    start_update_mock_server(); 
}

// Mock Server
const start_mock_servers = (servers_props) => { server.start(servers_props); }

// Server, that Updates Mock Data
const start_update_mock_server = () => { server.update_mock() }

// Starting Server
start()