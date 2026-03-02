const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const histo_basculmt_router = new HyperExpress.Router()

const routePath = '/histo_basculmt'

const {HistoBasculmtCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


histo_basculmt_router.use(`${routePath}`, gatewayAndUser) 

histo_basculmt_router.post(`${routePath}`, post);

histo_basculmt_router.get(`${routePath}`, getAll)

histo_basculmt_router.get(`${routePath}/:id`, getOne)

histo_basculmt_router.put(`${routePath}/:id`, put)

histo_basculmt_router.delete(`${routePath}/:id`, remove)


module.exports = histo_basculmt_router