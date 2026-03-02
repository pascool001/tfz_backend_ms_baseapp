const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const histoControlSchema = new Schema(
  {
      hisctrl_user: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true} , 
      hisctrl_spm: {type: Schema.Types.ObjectId, ref: 'spm',  autopopulate: true} ,  
      hisctrl_dateheure: { type: Date, required: true } , 
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

histoControlSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model("histo_control", histoControlSchema);