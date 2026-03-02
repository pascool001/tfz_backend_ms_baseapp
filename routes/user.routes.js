const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const user_router = new HyperExpress.Router()

const routePath = '/user'

const {UserCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

const {authenticate} = require('../middlewares')

user_router.use(`${routePath}`, gatewayAndUser) 

user_router.post(`${routePath}`, post);

user_router.get(`${routePath}`, getAll)

user_router.get(`${routePath}/:id`, getOne)

user_router.put(`${routePath}/:id`, put)

user_router.delete(`${routePath}/:id`, remove)


module.exports = user_router