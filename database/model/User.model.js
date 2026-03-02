const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_email: {type: String, required: true, unique: true },
    user_password: {type: String, required: true },
    user_name: {type: String },
    user_isActive: {type: Boolean, default: false },
    user_isVerified: {type: Boolean, default: false },
    user_isAdmin: {type: Boolean, default: false},
    user_phoneNumber: {type: String, required: true },
    user_type: {type: String, enum: ['WEB', 'MOBILE'], default: "MOBILE"},
    user_imageRef: {type: String },
    user_spms: [{type: Schema.Types.ObjectId, ref: 'spm', autopopulate: true }], // liste des SPM dont est propriétaire ce user
    user_profils: [{type: Schema.Types.ObjectId, ref: 'profil', autopopulate: true }], // référencement des profils du user
    user_country: {type: Schema.Types.ObjectId, ref: 'country', autopopulate: true}, // référencement du pays du user
    user_accounts: [{type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}], // référencement des comptes du user
    user_asso_spms: [{type: Schema.Types.ObjectId, ref: 'spm', autopopulate: true}], // référencement des spm auquels ce user associé
    user_kyc: {type: Schema.Types.ObjectId, ref: 'kyc', autopopulate: true},
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.user_password;
          delete ret.__v;
      }
    },
    timestamps: true
  }
);


userSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("user", userSchema);
