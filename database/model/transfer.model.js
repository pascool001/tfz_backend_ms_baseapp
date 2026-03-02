const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transferSchema = new Schema({
  trf_type: { type: Schema.Types.ObjectId, ref: 'trans_type', autopopulate: true},
  trf_srcAccount: { type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}, 
  trf_targetAccount: { type: Schema.Types.ObjectId, ref: 'account', autopopulate: true}, 
  trf_amount: {type: Number, required: true},
  trf_status:  {type: String, enum:['pending', 'success', 'error'], default: 'pending'},
  trf_response: {type: Schema.Types.Mixed},
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    }
  },
  timestamps: true
})

transferSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("transfer", transferSchema);
