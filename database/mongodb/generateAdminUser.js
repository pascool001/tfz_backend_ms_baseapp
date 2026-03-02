const {UserRepo} = require("../repository");


const { hashedPwd } = require('../../utils')

const GenAdminUser = async () => {

    let existingUser;

    const adminUserData = {
        user_email: process.env.ADMIN_EMAIL ,
        user_password: await hashedPwd(process.env.ADMIN_PASSWORD),
        user_name: process.env.ADMIN_NAME,
        user_isActive: true,
        user_isVerified: true,
        user_isAdmin: true,
        user_phoneNumber: process.env.ADMIN_PHONE_NUMBER,
        user_type: process.env.ADMIN_USERTYPE
    }
    

    try { 
        existingUser = await UserRepo.findOne({email: adminUserData.email});  
    } catch (error) {}

    if (!existingUser) {
        try {
            await UserRepo.create(adminUserData)
            console.log('Admin user successfully created!')
        } catch (error) {
            console.log('Could not create Admin User.')
        }
    } else {
        console.log('Admin user already exist!')
    }
}

module.exports = GenAdminUser


