const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const api_account_router = new HyperExpress.Router()

const routePath = '/api_account'
const {Api_AccountCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

api_account_router.use(`${routePath}`, gatewayAndUser) 

api_account_router.post(`${routePath}`, post);


api_account_router.get(`${routePath}`, getAll)

api_account_router.get(`${routePath}/:id`, getOne)

api_account_router.put(`${routePath}/:id`, put)

api_account_router.delete(`${routePath}/:id`, remove)


module.exports = api_account_router