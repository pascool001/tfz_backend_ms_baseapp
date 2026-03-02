const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const wallet_router = new HyperExpress.Router()

const routePath = '/wallet'

const {WalletCtrl: {getAll, getOne, post, put, remove, findWalletsByCountry}} = require("../controller")

wallet_router.use(`${routePath}`, gatewayAndUser) 

wallet_router.post(`${routePath}`, post);

wallet_router.get(`${routePath}`, getAll)

wallet_router.get(`${routePath}/country/:countryId`, findWalletsByCountry) 

wallet_router.get(`${routePath}/:id`, getOne)

wallet_router.put(`${routePath}/:id`, put)

wallet_router.delete(`${routePath}/:id`, remove)


module.exports = wallet_router