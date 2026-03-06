const { SignJWT } = require("jose");


const getSSESecret = () => {
  const raw = process.env.SSE_JWT_SECRET;

  if (!raw || raw.length < 32) {
    throw new Error(
      "[token.helper] SSE_JWT_SECRET is missing or too short (minimum 32 characters)."
    );
  }

  return new TextEncoder().encode(raw);
};


const buildsseToken = async (payload, expiresIn) => {
  const secret = getSSESecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

const generateSSEToken = (payload) => {
  const sse_token_expiresIn = process.env.SSE_TOKEN_EXPIRES_IN;

  if (!sse_token_expiresIn) {
    throw new Error("[token.helper] SSE_TOKEN_EXPIRES_IN env variable is not set.");
  }

  return buildsseToken(payload, sse_token_expiresIn);
};

const generateInternalKeyToken = (payload) => {
  const sse_token_expiresIn = process.env.SSE_TOKEN_EXPIRES_IN;

  if (!sse_token_expiresIn) {
    throw new Error("[token.helper] SSE_TOKEN_EXPIRES_IN env variable is not set.");
  }

  return buildsseToken(payload, sse_token_expiresIn);
};


module.exports = { generateSSEToken, generateInternalKeyToken };