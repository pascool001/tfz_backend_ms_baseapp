const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const profil_router = new HyperExpress.Router()

const routePath = '/profil'

const {ProfilCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

profil_router.use(`${routePath}`, gatewayAndUser) 

profil_router.post(`${routePath}`, post);

profil_router.get(`${routePath}`, getAll)

profil_router.get(`${routePath}/:id`, getOne)

profil_router.put(`${routePath}/:id`, put)

profil_router.delete(`${routePath}/:id`, remove)


module.exports = profil_router