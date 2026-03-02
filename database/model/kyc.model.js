

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const kycSchema = new Schema({
  // infos. perso
  kyc_user_lastname: { type: String, required: true },
  kyc_user_firstname: { type: String, required: true },
  kyc_user_birthdate: { type: Date, required: true },
  kyc_user_birthplace: { type: String, required: true },
  kyc_user_nationality: { type: String, required: true },
  kyc_user_gender: { type: String, required: true }, // genre M/F
  kyc_user_image: { type: String, required: true },
//  infos. contact
  kyc_user_email: { type: String, required: true }, // veritable email du user, vu que le user_email du mobile_app user est du type: mail2250759803031@gmail.com
  kyc_user_phonenumber: { type: String, required: true },
  kyc_user_town: { type: String, required: true },
  // infos officielles
  kyc_user_idDoc_Type: { type: String, required: true }, // CNI, PERMIS, PASSPORT
  kyc_user_idDoc_issueDate: { type: Date, required: true },
  kyc_user_idDoc_expireDate: { type: Date, required: true },
});

kycSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("kyc", kycSchema);
