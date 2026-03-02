const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TarifTranferSchema = new Schema({
  ttrf_wallet: {type: Schema.Types.ObjectId, ref: 'wallet'},
  ttrf_tax_mode: {type: String, required: true}, // % ou valeur
  ttrf_mtmin: {type: Number, required: true}, 
  ttrf_mtmax: {type: Number, required: true},
  ttrf_value: {type: Number, required: true}
});

const TransfertLimints = new Schema({
  tl_min_intra: {type: Number},
  tl_max_intra: {type: Number},
  tl_min_inter: {type: Number},
  tl_max_inter: {type: Number},
})

const walletSchema = new Schema(
  {
    wallet_name: {type: String, unique: true }, 
    wallet_operator: {type: String, unique: true, required: true, enum: ['WAVE', "ORANGE", 'MTN', "MOOV"] }, //wave, momo, moov, orange
    wallet_logo_filename: {type: String},
    wallet_logo: {type: String}, 
    wallet_country_cash: {type: Boolean, required: true, default: false},
    wallet_transfer_limits: TransfertLimints,
    wallet_tarif: [TarifTranferSchema],
    wallet_country: {type: Schema.Types.ObjectId, ref: 'country', autopopulate: true }
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

walletSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("wallet", walletSchema);