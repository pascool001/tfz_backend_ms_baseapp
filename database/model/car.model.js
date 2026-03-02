const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    car_regisNumber: {type: String, required: true }, // car registration Number (Numéro d'immatriculation)
    car_regisDocRef: {type: String }, // image de la carte grise
    car_imageRef: {type: String }, // ref image du vehicule
    car_ntu: {type: Schema.Types.ObjectId, ref: 'nature_trans',  autopopulate: true} , // nature de transport urbain (ntu) dans lequel ce vehicule opere
  }
);

carSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("car", carSchema);
