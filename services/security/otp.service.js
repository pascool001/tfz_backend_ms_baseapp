const Cache = require("../cache/keyv_singleton");
const { genOtp } = require("../../utils");


// Envoi via SMS provider (Twilio, Termii, InfoBip, Webex Connect, Orange SMS API…).

const Send = async (data) => {
  const { fullPhoneNumber } = data;
  const otp = await genOtp(); // generation du code otp
  const tmpOtp = await Cache.setOtp(fullPhoneNumber, otp);
  const message = `Votre code de vérification est ${tmpOtp}`;
  const smsPayLoad = { phone: fullPhoneNumber, message };
  return { status: 200, message: "Otp envoyé avec success !", data: message };
};

const Verify = async (data) => {
  const { otp, fullPhoneNumber } = data;
  try {
    const storedOtp = await Cache.getOtp(fullPhoneNumber);
    const otpResult =
      storedOtp === otp ? { verified: true } : { verified: false };
    return { status: 200, message: "Otp verifié ! ", data: otpResult };
  } catch (error) {
    return { status: 401, message: "Otp Echu ! ", data: otpResult };
  }
};

module.exports = {
  Send,
  Verify,
};
