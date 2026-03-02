const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// sub_dateEffet: {type: Date, required: true},// ça ne sert à rien de différer la date d'utilisation de SPM
const subscriptionSchema = new Schema(
  {
    sub_user: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true },
    sub_service: { type: Schema.Types.ObjectId, ref: 'service', autopopulate: true}, 
    sub_transfert: {type: Schema.Types.ObjectId, ref: 'transfer',  autopopulate: true}, // rféférence du transfer s'il ya transferr (cas ou le service est payant)
    sub_periodicity: {type: String}, //Periodicité choisi: Mensuelle / Trimestrielle / Semestrielle / Annuelle
    sub_nbPeriod: {type: Number, required: true}, // temps ( en en nombre de jours) de la souscription payée ou essai; Recuperé  calculé depuis le service
    sub_dateExp: {type: Date, required: true}, // date d'expiration calculée sur la base du "sub_period"
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
/*
  Le service auquel l'on souscrit defini lui même son cout mensuel/semestriel/ annuel à travers son sous schema "servicePricingSchema",
  mais aussi un délai d'essai "srv_trial_days".
  Au moment donc de la souscription on a un choix à faire dans une liste pareil à ceci
  ===mode de souscription===
  * Mensuelle -- nbMois: ___
  * Semestrielle -- nbSemestres: ___
  * Annuelle -- nbAnnee: ___
  * Essai -- nbJours : 30 // le nbJous provient du service. Et dans ce cas il n'y a pas de transfer
  
  A l'Issu du choix effectué on doit calculer la date d'écheance "sub_dateExp" sur la base du nombre de periode converti en jours.
  Quelles informations nous permettent de comprendre la souscription éffectuée?:
    - sub_periodicity: mensuel / trial
    - sub_nbperiod: 2 (1 mois donc 30jrs ) / 30 (jours)
    - sub_dateExp: calculée à partir de la date de souscription et avec le nombre de jours donnés
  
  le choix de la périodicité nous donne le cout
  si la souscription est essai 
*/


subscriptionSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("subscription", subscriptionSchema);