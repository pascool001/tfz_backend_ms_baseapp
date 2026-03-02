const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {type: String},
    completed: {type: Boolean, default: false}
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


module.exports = mongoose.model("todo", TodoSchema);
