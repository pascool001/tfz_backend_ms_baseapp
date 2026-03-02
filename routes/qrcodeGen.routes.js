const HyperExpress = require('hyper-express');
const { gen_qrcode } = require('../services')
const { trustedGateway: { gatewayAndUser} } = require('../middlewares');

const qrcode_gen_router = new HyperExpress.Router()

const routePath = '/gen_qrcode'

const { genQrcodeGrid } = require('../controller/qrGrid.controller');

qrcode_gen_router.use(`${routePath}`, gatewayAndUser) 

qrcode_gen_router.post(`${routePath}`, async (request, response) => {
    const body = await request.json()
    const base64String = await gen_qrcode(body);
    const dataUri = `data:image/png;base64,${base64String}`;
    return response.send(dataUri)
});


qrcode_gen_router.post(`${routePath}/gridocx`, genQrcodeGrid);




module.exports = qrcode_gen_router

