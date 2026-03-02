const HyperExpress = require('hyper-express');

const todo_router = new HyperExpress.Router()

const routePath = '/db_todos'

const {TodoCtrl: {getAll, getOne, post, put, remove}} = require("../controller")

// const {authenticate} = require('../middlewares')


todo_router.post(`${routePath}`, post);

todo_router.get(`${routePath}`, getAll)

todo_router.get(`${routePath}/:id`, getOne)

todo_router.put(`${routePath}/:id`, put)

todo_router.delete(`${routePath}/:id`, remove)


module.exports = todo_router