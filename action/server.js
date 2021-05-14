const express = require("../server/express_server")

function start(server_props) {
    start_server_log(server_props)
    create_server(server_props)
}

function create_server(props){
    express.create_express_server(props)
}

function start_server_log(props){
    const {name,port} = props
    if(name) console.log("Starting "+name+" Sever on "+port);
    else throw "Please Specify Application Name"
}

module.exports = { start }
