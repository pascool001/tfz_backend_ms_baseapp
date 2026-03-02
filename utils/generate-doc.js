const QRCodeStyling = require('@liquid-js/qr-code-styling/cjs');
const createReport = require('docx-templates').default;
const fs = require('fs');
const path = require('path')

const inputPath = path.resolve(__dirname, '../spm_qrcode_templates/template.docx');
const logofile = path.resolve(__dirname, '../spm_qrcode_templates/tfzpng.png');
const outputPath = path.resolve(__dirname, '../spm_qrcode_output/output.docx')

async function loadQRCodeStyling() {
  // import dynamique pour charger correctement l'ESM depuis un fichier CommonJS
  const mod = await import('@liquid-js/qr-code-styling');
  // l'export peut être default ou namespace selon la build
  return mod?.default ?? mod;
}

async function generateStyledQr(text, color = '#2e7d32', logoPath = './logo.png') {
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: text,
    margin: 10,
    image: logoPath, // Logo centré
    dotsOptions: {
      color,
      type: 'rounded',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10,
    },
  });

  const buffer = await qrCode.getRawData('png');
  return 'data:image/png;base64,' + buffer.toString('base64');
}

async function genQrcodeDoc() {
      // Exemples de données
      const users = [
        { name: 'Alice', text: 'https://exemple.com/alice' },
        { name: 'Bob', text: 'https://exemple.com/bob' },
        { name: 'Charlie', text: 'https://exemple.com/charlie' },
      ];
    
      // Génération des QR Codes stylés
      const qrList = [];
      for (const user of users) {
        const qrBase64 = await generateStyledQr(user.text, '#1e88e5', logofile);
        qrList.push({ name: user.name, qrData: qrBase64 });
      }
    
      // Compilation du rapport Word
      const buffer = await createReport({
        template: fs.readFileSync(inputPath),
        data: { qrList },
        additionalJsContext: {
          // Fonction utilitaire facultative
          upper: str => str.toUpperCase(),
        },
      });
    
      fs.writeFileSync(outputPath, buffer);
      console.log('✅ Document généré : output.docx');
}    

module.exports = genQrcodeDoc