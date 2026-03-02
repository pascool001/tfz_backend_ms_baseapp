
const { UserRepo } = require("../../database/repository");
const sendEmail = require('../Senders/email_sender')

const  smsService = require('../Senders/sms_sender')
const Cache = require('../cache/keyv_singleton')
const { hashedPwd, genToken, genOtp } = require('../../utils')

const Register = async (userData) => {
    
    const {user_email} = userData;

    const existingUser = await UserRepo.findOne({user_email});

    if (existingUser) {
      return { status: 422, message: `Ce compte est déjà existant et actif`,  data:null } 
    }
  
    const existingTmpUser = await Cache.getTokenData(user_email)

    if (existingTmpUser) {
      return {
        status: 422, 
        message: `Un processus de creation de compte est déjà en cours pour cet eMail ${user_email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
        data: null
       }
    }
  
    try {
        const ToCache = {...userData, id: crypto.randomUUID(), user_password: (await hashedPwd(userData.user_password)) , token: await genToken(), otp: await genOtp()}
        const User = await  Cache.setTokenData(
            ToCache.id, 
            ToCache
        )
        
        const emailPayload = {
        name: User.user_name, 
        otp: User.otp, 
        link: `${process.env.CLIENT_DOMAIN}${process.env.ACTIVATION_PATH}?token=${User.token}&id=${User.id}`
        }
        const smsPayload = {
            userid: User.id, 
            phoneNumber: User.user_phoneNumber, 
            sms_msg: `Ceci est votre code otp d\'activation: ${User.otp} `
        }
        const emailOrSmsResult = (ToCache.userType === "WEB") ?
        (await sendEmail(
            User.user_email, 
            "Réinitialisation du mot de passe", 
            emailPayload,
            "./template/requestResetPassword.handlebars",
            `Un lien de re-initialisation de mot de passe a été envoyé à l'addresse: ${User.user_email} `
        )) :  (await smsService(smsPayload))
        return emailOrSmsResult;
    } catch (error) {
      return {status: 422, message: error.message,  data:  null }
    }

}

module.exports = Register;