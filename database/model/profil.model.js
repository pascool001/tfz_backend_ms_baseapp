const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilSchema = new Schema(
  {
    profil_code: {type: String, required: true, unique: true, enum: ["GERANT", "CHAUFFEUR", "CLIENT", "BO", "BO-ADMIN", "SPM"]},
    profil_desi: {type: String, unique: true },
    profil_desc: {type: String, unique: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    },
    timestamps: true
  }
);


module.exports = mongoose.model("profil", ProfilSchema);
