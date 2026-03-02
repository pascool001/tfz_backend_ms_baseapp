const { UserRepo } = require("../../database/repository");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("./token.helper");

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Builds a standardized service response.
 * @param {number} status
 * @param {string} message
 * @param {object|null} data
 */
const buildResponse = (status, message, data = null) => ({ status, message, data });

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Authenticates a user and returns a signed access + refresh token pair.
 *
 * @param {{ user_email: string, user_password: string }} credentials
 * @returns {Promise<{ status: number, message: string, data: object|null }>}
 */
const SignIn = async (credentials) => {
  const { user_email, user_password } = credentials;

  // 1. Validate input early
  if (!user_email || !user_password) {
    return buildResponse(400, "Email et mot de passe sont requis.");
  }

  // 2. Fetch user from database
  let connectingUser;
  try {
    connectingUser = await UserRepo.findOne({ user_email });
  } catch (error) {
    console.error("[SignIn] Database error:", error.message);
    return buildResponse(500, "Erreur serveur, veuillez réessayer.");
  }

  if (!connectingUser) {
    // Generic message to avoid user enumeration
    return buildResponse(401, "Identifiants invalides.");
  }

  // 3. Verify password
  let isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(user_password, connectingUser.user_password);
  } catch (error) {
    console.error("[SignIn] bcrypt error:", error.message);
    return buildResponse(500, "Erreur lors de la vérification du mot de passe.");
  }

  if (!isPasswordValid) {
    return buildResponse(401, "Identifiants invalides.");
  }

  // 4. Check account status
  if (!connectingUser.user_isActive) {
    console.warn(`[SignIn] Login attempt on disabled account: ${user_email}`);
    return buildResponse(
      403,
      "Votre compte est désactivé. Veuillez contacter l'administrateur du système."
    );
  }

  // 5. Generate token pair
  const tokenPayload = {
    userId: connectingUser._id,
    email: connectingUser.user_email,
  };

  try {
    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(tokenPayload),
      generateRefreshToken(tokenPayload),
    ]);

    return buildResponse(200, "Connexion réussie.", { accessToken, refreshToken });

  } catch (error) {
    console.error("[SignIn] Token generation error:", error.message);
    return buildResponse(500, "Erreur lors de la génération des tokens.");
  }
};

module.exports = SignIn;
