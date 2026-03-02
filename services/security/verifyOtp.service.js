// const Cache = require('../cache/keyv_singleton')

const verifyOtp = async (payload) => {
    const { code, phoneNumber } = payload;
    const storedOtp = '123456'
    // const otp = await  Cache.getTokenData(userId)
    if (storedOtp === otp) {
        return { status: 200, message: "OTP Validé",  data: true }
    } 
    return { status: 500, message: "OTP invalide ",  data: false }
}

module.exports = verifyOtp