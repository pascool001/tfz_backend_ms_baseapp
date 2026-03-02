const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicePricingSchema = new Schema(
  {
    periodicity: {type: String,  enum: ['MOIS', 'SEMESTRE', 'ANNEE']}, 
    price: {type: Number },
  })


const serviceSchema = new Schema(
  {
    srv_name: {type: String, required: true}, 
    srv_code: {type: String },
    srv_desc: {type: String},
    srv_trialDaysPeriod: {type: Number},
    srv_pricing: [servicePricingSchema]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      }
    },
    timestamps: true
  }
);


//NOTE:
// ??? pb / souscription séparée du SPM et transfiz



// - exemple de services / produits:------
// - service SPM (acquisition) (ACQUISPM) 
// - service TFZ Transporteur (TFZDRIVE) ?? à supprimer parce que ça correspond à la souscription SPM
// - service TFZ client (TFZCLIEN)
// - service suivi geolocalisé (SUIVGEOL)
// - service offres partenaire liée aux charges et entretiens du vehicule (visite tech, garages, pieces auto, ..)
//    (PARTRANS)

// Un service (vu ici comme un produit) implique un processus particulier à développer
// ce qui suppose la mise à jour de l'application à chaque fois que nait un nouveau service
// d'où la nécessité de faire générer les services dont le process existe déjà pendant le lancement du serveur.

module.exports = mongoose.model("service", serviceSchema);
