const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const car_router = new HyperExpress.Router()

const routePath = '/car'

const {CarCtrl: {getAll, getOne, post, put, remove}} = require("../controller")


car_router.use(`${routePath}`, gatewayAndUser) 

car_router.post(`${routePath}`, post);

car_router.get(`${routePath}`, getAll)

car_router.get(`${routePath}/:id`, getOne)

car_router.put(`${routePath}/:id`, put)

car_router.delete(`${routePath}/:id`, remove)


module.exports = car_router