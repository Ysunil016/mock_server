const express = require("../server/express_server")
const update_mocks = require("../mock_data/update_mocks")
const servers = []

function mock_server(server_props) { start_server_log("Mock Server", server_props); create_server(server_props); }

const create_server = (props) => { 
    const server = express.create_express_server(props)
    servers.push(server)
}

const start_server_log = (message, props) => { const { name, port } = props; if (name) console.log(message + " on " + port); else throw "Please Specify Correct Server Props" }

function restart_server(){
    console.log("Restart Server");
}

function update_sever(server_props) { update_mocks.update(server_props,restart_server) }


module.exports = { mock_server, update_sever }
