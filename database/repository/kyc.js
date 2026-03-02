const {KycModel, UserModel } = require('../model')
const mongoose = require('mongoose');


const create = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const instance = new KycModel(data);
        const created = await instance.save()
        await User.findByIdAndUpdate(
            created.kyc_user._id,
            { $set: { user_kyc: created._id } },
            { session }
        );
        await session.commitTransaction();
        session.endSession();
        return created
    } catch (error) {
        console.log('Error create : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await KycModel.findByIdAndUpdate(id, {...data});
        const result = await KycModel.findOne({_id: id});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await KycModel.findOne(query)
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await KycModel.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
        
    }
}

const remove = async (id) => {
    try {
        const result = await KycModel.findOneAndDelete({_id: id});
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
