const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const spmSchema = new Schema(
  {
    spm_code: {type: String, required: true, unique: true}, // code à générer 
    smp_serialNumber: {type: String, required: true, unique: true}, // numéro de série (les 3 dernier chiffre de l'annee + le mois en 2chiffres + - n° d'ordre sur 5chiffres )
    spm_isActive: {type: Boolean, default: false}, // Activation/désactivation par l'Administrateur -- remis à true au terme du processus de l'acquisition (car la souscription est différée) et à false au terme de la période d'essaie
    spm_isUsageActive: {type: Boolean, default: false}, //Activation/désactivation par le propriétaire du spm -- remis à true au terme du processus de l'acquisition (car la souscription est différée) et à false au terme de la période d'essaie
    spm_admin_code: {type: String, required: true, unique: true}, // ??? code (otp) d'administrateur du spm generé à, l'édition
    spm_driver_code: {type: String, required: true, unique: true}, // ??? code (otp) d'invitation / association de , generé à, l'édition
    
    spm_owner: {type: Schema.Types.ObjectId, ref: 'user', autopopulate: true}, // user qui a la propriété su SPM
    spm_acquisition: {type: Schema.Types.ObjectId, ref: 'subscription', autopopulate: true}, // reférencement de la souscription pour l'acquisition du spm
    spm_courrent_account: {type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}, // Référencement du compte sur lequel le spm dirige les paiements
    spm_drivers: [{type: Schema.Types.ObjectId, ref: 'user', autopopulate: true}], // Ids des chauffeurs associés
    spm_createdBy: {type: Schema.Types.ObjectId, ref: 'user', autopopulate: true}, // referencement du user générateur du spm
    spm_user_controller: {type: Schema.Types.ObjectId, ref: 'user', autopopulate: true}, // reference du user qui a le control du system (spm)
    spm_attached_car: {type: Schema.Types.ObjectId, ref: 'car', autopopulate: true}, // référence du vehicule auquel ce spm est attaché
    spm_ntu: {type: Schema.Types.ObjectId, ref: 'nature_trans', autopopulate: true}, // référence de la nature de transport pour lequel ce spm est generé
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
// souscription_differe: {type: Boolean, default: true}, // ?? periode différée de souscription, remise à false à la souscription

spmSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model("spm", spmSchema);
