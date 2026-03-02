const QRCode = require("qrcode");
const sharp = require("sharp");
const path = require("path");

const buildQrCode = async (data) => {
  const {
    text,
    size = 400,
    bgColor = "#ffffff",
    fgColor = "#000000",
    logoSize = 50,
    logoPadding = 5,
  } = data;
//   console.log('buildQrCode data: ', data )
  const logo = path.resolve(__dirname, "./tfzlogo.png");
  // Générer le QR code   //errorCorrectionLevel: "H", // Haute correction pour supporter le logo
  const qrBuffer = await QRCode.toBuffer(text, {
    errorCorrectionLevel: "H",
    width: parseInt(size),
    margin: 2,
    color: { dark: fgColor, light: bgColor },
  });
  // Charger et préparer le logo
  const logoResized = await sharp(logo)
    .resize(parseInt(logoSize), parseInt(logoSize), {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();
  // Créer un fond blanc arrondi pour le logo
  const totalLogoSize = parseInt(logoSize) + parseInt(logoPadding) * 1;
  const radius = Math.floor(totalLogoSize / 2);
  // Créer un cercle blanc SVG
  const circleSvg = `
                <svg width="${totalLogoSize}" height="${totalLogoSize}">
                <circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/>
                </svg>
            `;
  const circleBuffer = Buffer.from(circleSvg);
  // Composer le QR code avec le fond blanc arrondi et le logo
  const finalImage = await sharp(qrBuffer)
    .composite([
      { input: circleBuffer, gravity: "center" },
      { input: logoResized, gravity: "center" },
    ])
    .sharpen()
    .png()
    .toBuffer();

  // return qrcode in Base64 Format ------------------------------
  const base64String = Buffer.from(finalImage).toString("base64");
  return base64String;
};

module.exports = buildQrCode;
