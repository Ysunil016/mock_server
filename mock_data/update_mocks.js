const fs = require('fs')
const axios = require('axios');

function update(server_props,restartServers) {

    // Process Each Server
    server_props.forEach((server_prop, server_index) => {
        const { apis } = server_prop
        apis.forEach((api, api_index) => {

            // Values to Update -> Response, Status
            const { update } = api

            if (update == undefined) return;

            // Get Response and StatusCode for Update API
            make_update_request(update).then(response => {
                console.log(response);

                api.response = response.data
                api.status = response.status
                apis.splice(api_index, 1, api)
                server_prop.apis = apis
                server_props.splice(server_index, 1, server_prop)

                update_json_mock_file(server_props)

            }).catch(err => console.log("Could Not Update Mock " + err))
        })
    });

}

const make_update_request = async (update_props) => {
    const { uri, token, method, request_data } = update_props
    return new Promise((resolve, reject) => {
        switch (method) {
            case 'GET': resolve(get_request(uri, token)); break;
            case 'POST': resolve(post_request(uri, token, request_data)); break;
            case 'PUT': resolve(put_request(uri, token, request_data)); break;
            case 'DELETE': resolve(delete_request(uri, token)); break;
            default: reject("Issue Occured While Making Request at " + uri); break;
        }
    })
}

const update_json_mock_file = (data) => {
    fs.writeFileSync("./data.json", JSON.stringify(data))
}


const get_request = async (uri, token) => {
    return await axios.get(uri).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}
const post_request = async (uri, token, request_data) => {
    return await axios.post(uri, request_data).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}
const put_request = async (uri, token, request_data) => {
    return await axios.put(uri, request_data).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}
const delete_request = async (uri, token) => {
    return await axios.delete(uri).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}




module.exports = { update }