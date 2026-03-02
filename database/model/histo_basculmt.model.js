const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const histoBasculSchema = new Schema(
  {
    hisbasc_account: { type: Schema.Types.ObjectId, ref: 'account', autopopulate: true} , 
    hisbasc_spm: {type: Schema.Types.ObjectId, ref: 'spm',  autopopulate: true} ,  
    hisbasc_dateheure: { type: Date, required:true } , 
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

histoBasculSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("histoBasculmt", histoBasculSchema);