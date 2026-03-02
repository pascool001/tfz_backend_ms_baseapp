const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const services_router = new HyperExpress.Router()

const routePath = '/service'

const {ServiceCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

services_router.use(`${routePath}`, gatewayAndUser) 

services_router.post(`${routePath}`, post);

services_router.get(`${routePath}`, getAll)

services_router.get(`${routePath}/:id`, getOne)

services_router.put(`${routePath}/:id`, put)

services_router.delete(`${routePath}/:id`, remove)


module.exports = services_router