const { UserRepo} = require("../../database/repository");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const SignIn = async (credentials) => {

    const SECRET = process.env.JWT_SECRET;

    const expiresIn = process.env.TOKEN_EXPIRES_IN;

    const {user_email, user_password} = credentials;


    let connectingUser;

    try {
      connectingUser = await UserRepo.findOne({user_email}); // check if the user exists
    } catch (error) {
      console.log('Error getting user: ', error)
    }

    if(!connectingUser) {
      return {status: 401,  message: "Utilisateur inconu",  data: null   }
    }

    let isPasswordValid = false;

    try {
      isPasswordValid = await bcrypt.compare(user_password, connectingUser.user_password);
    } catch (error) {
      console.log('bcrypt.compare error : ', error.message)
    }

    if (!isPasswordValid) {
      return { status: 401, message: "Infos. d'identification incorrect, email ou password invalid ",  data:null }
    }

    try {
      if (connectingUser.user_isActive) {
        //generate access token
        const accessToken = jwt.sign({userId: connectingUser._id, email: connectingUser.user_email}, SECRET, {expiresIn});
        //generate access token
        const refreshToken = jwt.sign({userId: connectingUser._id, email: connectingUser.user_email}, SECRET, {expiresIn: '7d'});
        
        return {status: 200,  message: 'vous êtes connectés', data: {accessToken, refreshToken}  }

      } else {
        console.log("Login Echec, compte désactivé")
        return {status: 401,  message: 'Votre compte est désactivé, veuillez contacter l`\'administrateur du systeme. ', data: null }
      }
        
    } catch (error) {
        console.log('Server login Error: ', error)
        return { status:500, message: 'Server error', data: null }
    }
  
}

module.exports = SignIn