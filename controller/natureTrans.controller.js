const {NatureTransRepo } = require('../database/repository')

const { getImage, delImage} = require('../services/file/fileService')

const post = async (request, response) => {
    response.type('json')
    const body = await request.json();
    let created = await NatureTransRepo.create({...body});
    const image = await getImage(created, 'ntu_img_filename');
    return response.json({...created.toJSON(), ntu_image: image});
}

const getAll = async (request, response) => {
    response.type('json')
    let List = await NatureTransRepo.getAll()
    for (let index = 0; index < List.length; index++) {
        const image = await getImage(List[index], 'ntu_img_filename')
        List[index] = {...List[index].toJSON(), ntu_image: image}
    }
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const result = await NatureTransRepo.findOne({_id: id});
     const image = await getImage(result, 'ntu_img_filename');
    return response.json({...Data.toJSON(), ntu_image: image})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
     const OldNatureTrans = await NatureTransRepo.findOne({_id: id}); // obtenir l'ancien image filename
    // suppression de l'ancien logo file, s'il y a eu modification
    if (OldNatureTrans.ntu_img_filename !== body.ntu_img_filename) await delImage(OldNatureTrans, 'ntu_img_filename')
    const UpdatedData = await NatureTransRepo.update(body, id) 
    const image = await getImage(UpdatedData, 'ntu_img_filename');
    return response.send(JSON.stringify({...UpdatedData.toJSON(), ntu_image: image}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await NatureTransRepo.remove(id)
    await delImage(result, 'ntu_img_filename')
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove
}

