const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const transfer_router = new HyperExpress.Router()

const routePath = '/transfer'

const {TransferCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


transfer_router.use(`${routePath}`, gatewayAndUser) 

transfer_router.post(`${routePath}`, post);

transfer_router.get(`${routePath}`, getAll)

transfer_router.get(`${routePath}/:id`, getOne)

transfer_router.put(`${routePath}/:id`, put)

transfer_router.delete(`${routePath}/:id`, remove)


module.exports = transfer_router