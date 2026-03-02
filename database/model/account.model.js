
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    acc_user: { type: Schema.Types.ObjectId, ref: 'user', autopopulate: true }, // clé étrangère vers user (propriétaire du compte)
    acc_wallet: { type: Schema.Types.ObjectId, ref: 'wallet', autopopulate: true }, // clé étrangère vers wallet (operateur du compte)
    acc_number: { type: String, required: true }, // numero du telephone associe au compte
    acc_balance: { type: Number, required: true, default: 0 }, // solde du compte à synchroniser avec le solde operateur
    acc_verified: { type: Boolean, required: true, default: false }, // verifier que le n° de cpt est un compte Orange, mtn, moov ou wave money
    acc_Type: { type: String, enum: ["ORDINARY", "MARCHANT"], default: "ORDINARY" }, // cpt_tfz(marchant) / ordinairy
    acc_isCash: { type: Boolean, required: true, default: false }, // ce compte est-il un compte caisse? (pour encaisser des paiements numeriques)
  }, {
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    }
  },
  timestamps: true
}
);

accountSchema.post("save", async function (doc, next) {
  await mongoose.model("user").updateOne({ _id: doc.acc_user }, { $addToSet: { user_accounts: doc._id } })
  next()
})

accountSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await mongoose.model('User').updateOne(
    { _id: this.acc_user },
    { $pull: { user_accounts: this._id } }
  );
  next();
});

accountSchema.post("findOneAndDelete", async function (doc, next) {
  if (!doc) return;
  await mongoose.model("user").updateOne({ _id: doc.acc_user }, { $pull: { user_accounts: doc._id } })
  next()
})

accountSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("account", accountSchema);

