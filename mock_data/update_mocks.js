function update(server_props) {
    // Process Each Server
    server_props.forEach((server_prop, server_index) => {
        const { apis } = server_prop
        apis.forEach((api, api_index) => {
            // Values to Update -> Response, Status
            const { update } = api
            // Get Response and StatusCode for Update API
            make_update_request(update).then(response => {

                api.response = response.data
                api.status = response.status
                apis.splice(api_index, 1, api)
                server_prop.apis = apis
                server_props.splice(server_index, 1, server_prop)
                // Updating Server JSON
                update_json_mock_file(server_props)

            }).catch(err => console.log("Could Not Update Mock " + err))


        })

    });
}

const make_update_request = async (update_props) => {
    console.log("Updating Mock");
    return new Promise((resolve, reject) => {
        // Making Request
    })
}

const update_json_mock_file = async () => {
    return new Promise((resolve,reject)=>{
        // Update Mock File
    })
}

module.exports = { update }