const {AssoSpmDriverModel } = require('../../model')



const create = async (data) => {
    try {
        const instance = new AssoSpmDriverModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create AssoSpmDriver  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await AssoSpmDriverModel.findByIdAndUpdate(id, {...data});
        const result = await AssoSpmDriverModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await AssoSpmDriverModel.findOne(query) //.populate('country');
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await AssoSpmDriverModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await AssoSpmDriverModel.findOneAndDelete({_id: id});
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
