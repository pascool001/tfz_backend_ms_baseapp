const mongoose = require("mongoose");
// const document_Refs = require("../mongodb/document_Refs");
const Schema = mongoose.Schema;

const api_accountSchema = new Schema(
  {
    operator: { type: String}, // 'wave ou orange ...
    account_number: {type: String, required: true},
    account_balance: {type: Number, required: true},    
  }, {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      }
    },
    timestamps: true
  }
);
api_accountSchema.index({ operator: 1, account_number: 1 });



module.exports = mongoose.model("api_account", api_accountSchema);

