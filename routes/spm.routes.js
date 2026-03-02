const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');
const spm_router = new HyperExpress.Router()

const routePath = '/spm'

const {SpmCtrl: {getAll, getOne, post, put, remove }} = require("../controller")

spm_router.use(`${routePath}`, gatewayAndUser) 

spm_router.post(`${routePath}`, post);

spm_router.get(`${routePath}`, getAll)

spm_router.get(`${routePath}/:id`, getOne)

spm_router.put(`${routePath}/:id`, put)

spm_router.delete(`${routePath}/:id`, remove)


module.exports = spm_router