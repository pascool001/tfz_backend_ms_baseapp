const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const kyc_router = new HyperExpress.Router()

const routePath = '/kyc'

const {KycCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


kyc_router.use(`${routePath}`, gatewayAndUser) 

kyc_router.post(`${routePath}`, post);

kyc_router.get(`${routePath}`, getAll)

kyc_router.get(`${routePath}/:id`, getOne)

kyc_router.put(`${routePath}/:id`, put)

kyc_router.delete(`${routePath}/:id`, remove)


module.exports = kyc_router