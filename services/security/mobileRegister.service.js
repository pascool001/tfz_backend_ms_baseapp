const { UserRepo, ProfilRepo } = require("../../database/repository");

const { hashedPwd } = require("../../utils");

async function profileClientID() {
  const profileClient = await ProfilRepo.findOne({profil_code: "CLIENT"})
  if (profileClient._id) {
    return profileClient._id
  }
  return null
}

const MobileRegister = async (userData) => {
  const { user_email, user_password, user_phoneNumber, user_type } = userData;

  const existingUser = await UserRepo.findOne({ user_email });

  const hashedPassword = await hashedPwd(user_password);

  if (existingUser) {
    try {
      existingUser.user_password = hashedPassword

      await UserRepo.update( existingUser, existingUser._id)

      return {status: 200, message: "Compte mise à jour avec succès", data: {ok: true} };
      
    } catch (error) {
      console.log("Updated Data ERROR : ", error)
        return {status: 422, message: `Erreur à la mise à jour de compte : ${error}`, data: {ok:false}
      };
    }

  } else {
    
    try {
     
      let createdUser = await UserRepo.create({
        user_email,
        user_password: hashedPassword,
        user_phoneNumber,
        user_type,
        user_isActive: true,
        user_isVerified: true,
      });
       const profileId = await profileClientID()
      if (profileId) createdUser.user_profils = [...createdUser.user_profils, profileId]
      await UserRepo.update(createdUser, createdUser._id)

      return {
        status: 200,
        message: "Compte crée avec succès",
        data: { ok: true },
      };
    } catch (err) {
      return {
        status: 422,
        message: `Erreur à la création du compte : ${err}`,
        data: { ok: false },
      };
    }

  }



};

module.exports = MobileRegister;
