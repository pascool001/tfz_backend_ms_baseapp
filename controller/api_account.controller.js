
const {Api_AccountRepo} = require('../database/repository')

const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await Api_AccountRepo.create({...body})
    return response.send(JSON.stringify({...created.toJSON()}));
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await Api_AccountRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const resultData = await Api_AccountRepo.findOne({_id: id})
    return response.json({...resultData.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const UpdatedData = await Api_AccountRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}


const remove = async (request, response) => {
    const id = request.path_parameters.id;
    const result = await Api_AccountRepo.remove(id)
    return response.json(result.toJSON())
}

module.exports = {
    remove,
    put,
    getOne,
    getAll,
    post
}