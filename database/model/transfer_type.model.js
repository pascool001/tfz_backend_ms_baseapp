const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transferTypeSchema = new Schema({
  tt_code:{type: String, require: true, unique: true }, // FEES, SUBS, MBACK --- A generer automatiquement au lancement du serveur
  tt_desi: {type: String, require: true, unique: true },
})

module.exports = mongoose.model("transferType", transferTypeSchema);

// exemple de type transfert:
// -------------------------
// - transfert / paiement des frais de transport (FEES)
// - transfert / souscription (SUBS)
// - transfert / Money back (MBACK) retour monnaie electronique au client (monnaie ou trop percu)





