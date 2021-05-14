const fs = require('fs')
const axios = require('axios');
const fetch_mock_data = require("../action/mock_data")

function update() {
    return new Promise(async (resolve) => {
        const new_mock_data = await fetch_mock_data()
        new_mock_data.forEach(async (server_prop, server_index) => {
            // Process Each Server
            const { apis } = server_prop
            apis.forEach(async (api, api_index) => {

                const { update } = api

                if (update == undefined) return;

                const response = await make_update_request(update)

                api.response = response.data; api.status = response.status; apis.splice(api_index, 1, api); server_prop.apis = apis; new_mock_data.splice(server_index, 1, server_prop)

                await update_json_mock_file(new_mock_data)

                resolve(true)
            })
        });
    })
}

const make_update_request = async (update_props) => {
    const { uri, token, method, request_data } = update_props
    return new Promise(async (resolve, reject) => {
        switch (method) {
            case 'GET': resolve(await get_request(uri, token)); break;
            case 'POST': resolve(await post_request(uri, token, request_data)); break;
            case 'PUT': resolve(await put_request(uri, token, request_data)); break;
            case 'DELETE': resolve(await delete_request(uri, token)); break;
            default: reject("Issue Occured While Making Request at " + uri); break;
        }
    })
}

const update_json_mock_file = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFileSync("./mock_data/data.json", JSON.stringify(data))
        resolve(true)
    })
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