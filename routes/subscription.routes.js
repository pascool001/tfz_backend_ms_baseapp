const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const subscription_router = new HyperExpress.Router()

const routePath = '/subscription'

const {SubscriptionCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

subscription_router.use(`${routePath}`, gatewayAndUser) 

subscription_router.post(`${routePath}`, post);

subscription_router.get(`${routePath}`, getAll)

subscription_router.get(`${routePath}/:id`, getOne)

subscription_router.put(`${routePath}/:id`, put)

subscription_router.delete(`${routePath}/:id`, remove)


module.exports = subscription_router