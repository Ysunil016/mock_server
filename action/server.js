function start(server_props) {
    start_server_log(server_props.name)
}



function start_server_log(name){
    if(name) console.log("Starting "+name+" Sever");
    else throw "Please Specify Application Name"
}

module.exports = { start }
