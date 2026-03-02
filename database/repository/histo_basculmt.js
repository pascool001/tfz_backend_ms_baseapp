const {HistoBasculmtModel } = require('../model')



const create = async (data) => {
    try {
        const instance = new HistoBasculmtModel(data);
        const created = await instance.save()
        return created
    } catch (error) {
        console.log('Error create : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await HistoBasculmtModel.findByIdAndUpdate(id, {...data});
        const result = await HistoBasculmtModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await HistoBasculmtModel.findOne(query) //.populate('country');
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await HistoBasculmtModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await HistoBasculmtModel.findOneAndDelete({_id: id});
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
