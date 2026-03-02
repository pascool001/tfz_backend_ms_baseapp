// const smsSender = require('../../utils/sms/sendSMS');

const smsService = async (payload) => {
    const {phone, message} = payload
    // en mode simulation on va retouner un http.response contenant
    return {status: 200, message: 'Message OTP envoyé avec success! ', data: {phoneNumber, sms_msg}  }
}

module.exports = smsService