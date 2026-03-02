const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const histoControl_router = new HyperExpress.Router()

const routePath = '/histo_control'

const {HistoControlCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


histoControl_router.use(`${routePath}`, gatewayAndUser) 

histoControl_router.post(`${routePath}`, post);

histoControl_router.get(`${routePath}`, getAll)

histoControl_router.get(`${routePath}/:id`, getOne)

histoControl_router.put(`${routePath}/:id`, put)

histoControl_router.delete(`${routePath}/:id`, remove)


module.exports = histoControl_router