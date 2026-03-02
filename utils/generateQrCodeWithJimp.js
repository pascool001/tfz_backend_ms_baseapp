const QRCode = require('qrcode')
const {Jimp} = require('jimp');
const fs = require('fs');
const path = require('path')



const logofile = path.resolve(__dirname, '../spm_qrcode_templates/tfzpng.png');

async function generateQrcodeWithJimp() {
    try {
        // 1. Génération du QRCode en buffer PNG
        const qrBuffer = await QRCode.toBuffer("https://example.com", {
            errorCorrectionLevel: "H", // plus robuste (utile si on ajoute un logo)
            type: "png",
            width: 400,
            color: {
                dark: "#000000", // pixels QR
                light: "#FFFFFF" // fond
            }
        });

        // 2. Charger le QR avec Jimp
        const qrImage = await Jimp.read(qrBuffer);
        // fs.readFile('tfzpng.png', async (err, data) => {
        //     if (err) console.log(err);
        //     console.log(data);
        //     logo = await Jimp.read(data); // ton logo

        // });
        // 3. Option : ajouter un logo au centre
        // const logo = await Jimp.read("tfzpng.png"); // ton logo
        // logo.resize(80, 80); // ajuste taille logo

        // const x = (qrImage.bitmap.width / 2) - (logo.bitmap.width / 2);
        // const y = (qrImage.bitmap.height / 2) - (logo.bitmap.height / 2);

        // qrImage.composite(logo, x, y, {
        //     mode: Jimp.BLEND_SOURCE_OVER,
        //     opacitySource: 1,
        //     opacityDest: 1
        // });

        // 4. Option : ajouter du texte en bas
        
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        qrImage.print(font, 10, qrImage.bitmap.height - 30, "Scan me!");

        // 5. Sauvegarde finale
        await qrImage.writeAsync("qrcode_with_logo.png");
        
        console.log("✅ QR Code généré avec succès : qrcode_with_logo.png");
    } catch (error) {
        console.error("Erreur :", error);
    }
}

module.exports = generateQrcodeWithJimp()