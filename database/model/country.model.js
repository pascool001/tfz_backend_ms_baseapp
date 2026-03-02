const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    country_indic: {type: String, required: true, unique: true}, // indicatif du pays (+225) = dialcode
    country_code: {type: String, unique: true, required: true}, // code du pays (CI: Cote d'Ivoire)
    country_name: {type: String, unique: true, required: true},  // nom du pays
    country_flag: {type: String}, // image du drapeau
    country_currency: {type: String, required: true, default: 'XOF'}, // monnaie du pays
    country_phone_mask: {type: String, required: true, default: "00.00.00.00.00/'.'"}, // Mask ou format de n° tel dans le pays
    country_tfz_deployed: {type: Boolean, required: true, default: false}, // le service de transfert d'argent TFZ est-il deployé dans ce pays?
    country_wallets: [{type: Schema.Types.ObjectId, ref: 'wallet',  autopopulate: true}] // liste des operateurs mobiles disponibles dans le pays
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    }
  }
);

countrySchema.pre("save", (next) => {
  this.country_flag = `https://flagsapi.com/${this.country_code}/flat/64.png`
  next()
})


countrySchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("country", countrySchema);
