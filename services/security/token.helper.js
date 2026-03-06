const { SignJWT } = require("jose");

/**
 * Encodes the JWT secret from env into a Uint8Array as required by jose (HS256).
 *
 * 🔒 Algorithm: HS256 (HMAC + SHA-256, symmetric secret)
 *
 * 💡 Upgrade path → ES256 (asymmetric, stronger):
 *    Replace `getSecret()` with `await importPKCS8(privateKeyPem, 'ES256')`
 *    and set header alg to 'ES256'. Requires a private/public key pair.
 */
const getSecret = () => {
  const raw = process.env.JWT_SECRET;

  if (!raw || raw.length < 32) {
    throw new Error(
      "[token.helper] JWT_SECRET is missing or too short (minimum 32 characters)."
    );
  }

  return new TextEncoder().encode(raw);
};



const buildToken = async (payload, expiresIn) => {
  const secret = getSecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

const generateAccessToken = (payload) => {
  const expiresIn = process.env.TOKEN_EXPIRES_IN;

  if (!expiresIn) {
    throw new Error("[token.helper] TOKEN_EXPIRES_IN env variable is not set.");
  }

  return buildToken(payload, expiresIn);
};


const generateRefreshToken = (payload) => {
  return buildToken(payload, "7d");
};

module.exports = { generateAccessToken, generateRefreshToken };
