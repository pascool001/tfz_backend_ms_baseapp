const fs = require("fs");
const path = require("path");
const { createReport } = require("docx-templates");
const { SpmRepo } = require('../database/repository')

const genQrcodeGrid = async (request, response) => {
  try {
    const { qrCode, spm_id, isPerso } = await request.json();

    const spm = await SpmRepo.findOne({_id: spm_id})
    if (!spm) {
      return response.status(400).json({ error: "Spm son trouvé." });
    }

    if (!qrCode) {
      return response.status(400).json({ error: "Aucun QR code fourni." });
    }

    const { smp_serialNumber, spm_createdBy: {user_name}, spm_ntu: {ntu_desi} } = spm
    
    // Créer le document à la volée avec un template textuel
    const buffer = await createReport({
      template: isPerso? fs.readFileSync(path.join(__dirname, '../services/qrcodes/spm_qrcode_templates/docx_template_perso.docx')): 
      fs.readFileSync(path.join(__dirname, '../services/qrcodes/spm_qrcode_templates/docx_template_shared.docx')),
      data: {
        generatedBy: user_name,
        natureTrans: ntu_desi,
        qrcodeSn: smp_serialNumber
      },
      additionalJsContext: {
        qr: async (_) => {
          return { 
             width: isPerso ? 5: 13, 
             height: isPerso ? 5: 13,  
             data: Buffer.from(qrCode.split(",")[1], "base64"), 
             extension: ".png" 
            };
        },
       
      },
      cmdDelimiter: ["{{", "}}"],
    });
    // Envoyer le docx directement au client
    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="qrcode-"${smp_serialNumber}".docx"`
    );
    response.send(buffer);
  } catch (error) {
    console.error("Erreur génération DOCX:", error);
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  genQrcodeGrid,
};
