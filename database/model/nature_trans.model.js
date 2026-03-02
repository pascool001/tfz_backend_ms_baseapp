const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Il faut utiliser un word templater: "easy-template-x" ou "docx-templates"
// {text, size = 400, bgColor = "#ffffff", fgColor = "#000000", logoSize = 50, logoPadding = 5 }

const qrcodeSettingSchema = new Schema({
  text: {type: String, required: true },
  persoQrSize: {type: Number, required: true },
  persoQrLogoSize: {type: Number, required: true },
  persoQrLogoPadding: {type: Number, required: true },
  sharedQrSize: {type: Number, required: true },
  sharedQrLogoSize: {type: Number, required: true },
  sharedQrLogoPadding: {type: Number, required: true },
})

const natureTransSchema = new Schema( // nature transport urbain
  {
    ntu_desi: {type: String, required: true, unique: true},
    ntu_img_filename : {type: String},
    ntu_image:  {type: String},
    ntu_nbPlaceMax:  {type: String},
    ntu_spm_template_ref: {type : String, required: true, default: "./taxi_temple.rtf"},
    ntu_qrcode_settings: qrcodeSettingSchema,
  }
);

natureTransSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("nature_trans", natureTransSchema);
