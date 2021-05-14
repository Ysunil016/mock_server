const fs = require('fs')
const axios = require('axios');
const fetch_mock_data = require("./mock_data")

async function update() {
    return new Promise(async (resolve, reject) => {
        const new_mock_data = await fetch_mock_data()
        new_mock_data.forEach(async (server_prop, server_index) => {

            const { apis } = server_prop
            apis.forEach(async (api, api_index) => {

                const { update } = api

                if (update == undefined) return;

                const response = await make_update_request(update).catch(() => { console.log("Error While Fetching Data from External Service"); return null })
                if (response === undefined || response === null) { reject(); return; };

                api.response = response.data; api.status = response.status; apis.splice(api_index, 1, api); server_prop.apis = apis; new_mock_data.splice(server_index, 1, server_prop)

                await update_json_mock_file(new_mock_data)
                resolve(true)
            })
        });
    })
}

const make_update_request = async (update_props) => {
    const { uri, headers = {}, method, request_data } = update_props
    return new Promise(async (resolve, reject) => {
        switch (method) {
            case 'GET': await get_request(uri, headers).then(res => resolve(res)).catch((err) => reject(err)); break;
            case 'POST': await post_request(uri, headers, request_data).then(res => resolve(res)).catch((err) => reject(err)); break;
            case 'PUT': await put_request(uri, headers, request_data).then(res => resolve(res)).catch((err) => reject(err)); break;
            case 'DELETE': await delete_request(uri, headers).then(res => resolve(res)).catch((err) => reject(err)); break;
            default: reject(); break;
        }
    })
}

const update_json_mock_file = (data) => {
    return new Promise((resolve) => {
        fs.writeFileSync("./mock_data/data.json", JSON.stringify(data))
        resolve(true)
    })
}

const get_request = async (uri, headers) => {
    return await axios.get(uri, { headers: headers }).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}
const post_request = async (uri, headers, request_data) => {
    return await axios.post(uri, request_data, { headers: headers }).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}
const put_request = async (uri, headers, request_data) => {
    return await axios.put(uri, request_data, { headers: headers }).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}
const delete_request = async (uri, headers) => {
    return await axios.delete(uri, { headers: headers }).then(response => { return { data: response.data, status: response.status } }).catch(err => { throw err })
}




module.exports = { update }