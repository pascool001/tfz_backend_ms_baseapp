const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const transfer_type_router = new HyperExpress.Router()

const routePath = '/transfer_type'

const {TransferTypeCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


transfer_type_router.use(`${routePath}`, gatewayAndUser) 

transfer_type_router.post(`${routePath}`, post);

transfer_type_router.get(`${routePath}`, getAll)

transfer_type_router.get(`${routePath}/:id`, getOne)

transfer_type_router.put(`${routePath}/:id`, put)

transfer_type_router.delete(`${routePath}/:id`, remove)


module.exports = transfer_type_router