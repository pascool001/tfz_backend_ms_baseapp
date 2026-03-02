const {SpmRepo } = require('../database/repository')

const {spm_serial , id_generator: { generateId }, genOtp} = require('../utils')

const post = async (request, response) => {
    response.type('json')
    try {
        const {ntu_id} = await request.json();
        let data = {
            spm_code: generateId('nanoid-long'), 
            smp_serialNumber: await spm_serial(), 
            spm_admin_code: await genOtp(), 
            spm_driver_code: await genOtp(),
            spm_createdBy: request.user, 
            spm_ntu: ntu_id,  
        }
        let created = await SpmRepo.create(data);
        return response.send(JSON.stringify({...created.toJSON()}));
    } catch (error) {
        console.error('Erreur serveur:', error);
        return response.send(`Erreur serveur : ${error}`)
    }
}


// const spmGenerate = async (request, response) => {
//     response.type('json')
    
//     const user = request.user
//     const {ntu_id} = await request.json();
//     let data = {spm_createdBy: user,
//         spm_ntu: ntu_id
//     }
//     let created = await SpmRepo.create({...data});
//     return response.send(JSON.stringify({...created.toJSON()}));
// }

const getAll = async (request, response) => {
    response.type('json')
    let List = await SpmRepo.getAll()
    return response.json(List)
}

const getOne = async (request, response) => {
    let id = request.path_parameters.id;
    const Data = await SpmRepo.findOne({_id: id});
    return response.json( {...Data.toJSON()})
}

const put = async (request, response) => {
    let id = request.path_parameters.id;
    let body = await request.json();
    const UpdatedData = await SpmRepo.update(body, id)
    return response.send(JSON.stringify({...UpdatedData.toJSON()}));
}

const remove =  async (request, response) => {
    let id = request.path_parameters.id;
    const result = await SpmRepo.remove(id)
    return response.json(result.toJSON())
}


module.exports = {
    post,
    getAll,
    getOne,
    put,
    remove,
}

