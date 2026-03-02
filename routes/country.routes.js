const HyperExpress = require('hyper-express');
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const country_router = new HyperExpress.Router()

const routePath = '/country'

const {CountryCtrl: {getAll, getOne, post, put, remove, getCountryByCode}} = require("../controller")


country_router.get(`${routePath}`, getAll)

country_router.get(`${routePath}/:id`, getOne)

country_router.get(`${routePath}/code/:code`, getCountryByCode)

country_router.use(`${routePath}`, gatewayAndUser) 

country_router.post(`${routePath}`, post);

country_router.put(`${routePath}/:id`, put)

country_router.delete(`${routePath}/:id`, remove)


module.exports = country_router