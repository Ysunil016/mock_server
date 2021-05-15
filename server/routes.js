
function handle(apis) {
    const express = require('express');
    const router = express.Router();

    const make_get_route = (api) => {
        const { endpoint, response, status } = api

        router.get(endpoint, (req, res) => {
            res.json(response).status(status)
        })
    }

    const make_post_route = (api) => {
        const { endpoint, response, status, request_body = {} } = api

        router.post(endpoint, request_body, (req, res) => {
            res.json(response).status(status)
        })
    }
    const make_put_route = (api) => {
        const { endpoint, response, status, request_body = {} } = api

        router.get(endpoint, request_body, (req, res) => {
            res.json(response).status(status)
        })
    }
    const make_delete_route = (api) => {
        const { endpoint, response, status } = api

        router.delete(endpoint, (req, res) => {
            res.json(response).status(status)
        })
    }

    const create_route = (api) => {
        const { method } = api
        switch (method) {
            case 'GET': make_get_route(api); break;
            case 'POST': make_post_route(api); break;
            case 'PUT': make_put_route(api); break;
            case 'DELETE': make_delete_route(api); break;
            default: break;
        }
    }

    apis.forEach(api => {
        create_route(api)
    });

    return router
}



module.exports = { handle }