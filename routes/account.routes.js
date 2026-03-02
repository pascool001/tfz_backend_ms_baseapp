const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');
const account_router = new HyperExpress.Router()


const routePath = '/account'
const {AccountCtrl: {getAll, getOne, post, put, remove, getByUserId}} = require("../controller")


account_router.use(`${routePath}`, gatewayAndUser) 

account_router.post(`${routePath}`, post);


account_router.get(`${routePath}`, getAll)

account_router.get(`${routePath}/:id`, getOne)

account_router.get(`${routePath}/user/:id`, getByUserId)

account_router.put(`${routePath}/:id`, put)

account_router.delete(`${routePath}/:id`, remove)


module.exports = account_router