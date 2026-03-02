const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const params_router = new HyperExpress.Router()

const routePath = '/params'

const {ParamCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

params_router.use(`${routePath}`, gatewayAndUser) 

params_router.post(`${routePath}`, post);

params_router.get(`${routePath}`, getAll)

params_router.get(`${routePath}/:id`, getOne)

params_router.put(`${routePath}/:id`, put)

params_router.delete(`${routePath}/:id`, remove)


module.exports = params_router