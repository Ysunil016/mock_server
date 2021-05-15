const fs = require('fs');
const axios = require('axios');
const fetch_mock_data = require("./mock_data");
async function update() {
    const new_mock_data = fetch_mock_data();
    new_mock_data.forEach((server_prop, server_index) => {
        const { apis } = server_prop;
        apis.forEach((api, api_index) => {
            const { update } = api;
            if (update == undefined) { return }
            make_update_request(update).then(response => {
                if (response === undefined || response === null) return;
                api.response = response.data;
                api.status = response.status;
                apis.splice(api_index, 1, api);
                server_prop.apis = apis;
                new_mock_data.splice(server_index, 1, server_prop);
                update_json_mock_file(new_mock_data);
            }).catch(() => { throw "Fetching Problem" })
        })
    })
};
const make_update_request = (update_props) => {
    const {
        uri,
        headers = {},
        method,
        request_data
    } = update_props;
    switch (method) {
        case 'GET':
            return get_request(uri, headers)
                .then(res => { return res })
                .catch((err) => { throw err });
        case 'POST':
            return post_request(uri, headers, request_data)
                .then(res => { return res })
                .catch((err) => { throw err });
        case 'PUT':
            return put_request(uri, headers, request_data)
                .then(res => { return res })
                .catch((err) => { throw err });
        case 'DELETE':
            return delete_request(uri, headers)
                .then(res => { return res })
                .catch((err) => { throw err });
        default:
            reject();
            break
    }
};
const update_json_mock_file = (data) => {
    fs.writeFileSync("./data/config.json", JSON.stringify(data));
};
const get_request = (uri, headers) => {
    return axios
        .get(uri, { headers: headers })
        .then(response => {
            return { data: response.data, status: response.status }
        })
        .catch(err => {
            throw err
        })
};
const post_request = (uri, headers, request_data) => {
    return axios
        .post(uri, request_data, { headers: headers })
        .then(response => {
            return { data: response.data, status: response.status }
        })
        .catch(err => {
            throw err
        })
};
const put_request = (uri, headers, request_data) => {
    return axios
        .put(uri, request_data, { headers: headers })
        .then(response => {
            return { data: response.data, status: response.status }
        })
        .catch(err => {
            throw err
        })
};
const delete_request = (uri, headers) => {
    return axios
        .delete(uri, { headers: headers })
        .then(response => {
            return { data: response.data, status: response.status }
        })
        .catch(err => {
            throw err
        })
};
module.exports = {
    update
};