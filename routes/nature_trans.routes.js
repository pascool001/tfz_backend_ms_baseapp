const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');
const nature_trans_router = new HyperExpress.Router()

const routePath = '/nature_trans'

const {NatureTransCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


nature_trans_router.use(`${routePath}`, gatewayAndUser) 

nature_trans_router.post(`${routePath}`, post);

nature_trans_router.get(`${routePath}`, getAll)

nature_trans_router.get(`${routePath}/:id`, getOne)

nature_trans_router.put(`${routePath}/:id`, put)

nature_trans_router.delete(`${routePath}/:id`, remove)


module.exports = nature_trans_router