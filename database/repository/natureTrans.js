const {NatureTransModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new NatureTransModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await NatureTransModel.findByIdAndUpdate(id, {...data});
        const result = await NatureTransModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await NatureTransModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await NatureTransModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await NatureTransModel.findOneAndDelete({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}


module.exports = {
    create,
    update,
    findOne,
    getAll,
    remove
}
