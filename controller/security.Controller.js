const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const { UserRepo } = require("../database/repository");
const {
  SignIn,
  RestPwd,
  RestPwdReq,
  Register,
  tokenBaseActivation,
  TokenRefresh,
  changePassword,
  verifyOtp,
  Otp,
  MobileRegister,
} = require("../services");
const { generateSSEToken , generateInternalKeyToken } = require("../services/security/sse_token.helper");

const get_sse_token = async (request, response) => {
  const user = request.user;
  const email = request.email;
  const purpose = "sse";
  console.log("Generating SSE token for userId:", user.userId, "email:", email);
  const sseToken = await generateSSEToken({ userId: user.userId, email, purpose });
//   const internalKeyToken = await generateInternalKeyToken({ internalKey: process.env.INTERNAL_KEY});
  return response.status(200).json({ sse_token: sseToken, internal_key_token: process.env.INTERNAL_KEY });
};

const register = async (request, response) => {
  const userData = await request.json();
  const data = await Register(userData);
  return response.json(data);
};

const MobileRegisterCtrl = async (request, response) => {
  const userData = await request.json();
  const data = await MobileRegister(userData);
  return response.json(data);
};

const tokenActivation = async (request, response) => {
  const { token, userId } = await request.json();
  const result = await tokenBaseActivation({ token, userId });
  return response.json(result);
};

const login = async (request, response) => {
  const { user_email, user_password } = await request.json();
  const result = await SignIn({ user_email, user_password });
  if (result.data) {
    const { accessToken, refreshToken } = result.data;
    return response
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/auth/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      })
      .header("Authorization", accessToken)
      .status(result.status)
      .json({ ...result, data: { accessToken } });
    // return {status: 200,  message: 'vous êtes connectés', data: {accessToken, refreshToken}  }
  }
  return response.status(result.status).json({ ...result });
};

const refreshtoken = async (request, response) => {
  // 1. Récupérer les cookies depuis l'en-tête
  const rawCookie = request.headers["cookie"];

  if (!rawCookie) return response.status(401).send("No cookies");
  // 2. Parser les cookies avec la lib "cookie"
  const cookies = cookie.parse(rawCookie);
  // 3. Lire le refreshToken depuis l'objet cookies
  const refreshToken = cookies.refreshToken;
  if (!refreshToken) return res.status(401).send("No refresh token");
  const result = await TokenRefresh(refreshToken);
  const { accessToken } = result.data;
  return response
    .status(result.status)
    .json({ ...result, data: { accessToken } });
  // return {status: 200, message: "Token généré avec success.", data: {accessToken} }
};

const resetPasswordRequest = async (request, response) => {
  const { email } = await request.json();
  const result = await RestPwdReq(email);
  return response.json({ ...result });
};

const resetPassword = async (request, response) => {
  const { userId, token, password } = await request.json();
  const result = await RestPwd({ userId, token, password });
  return response.status(result.status).json({ ...result });
};

const logout = async (request, response) => {
  const SECRET = "qqefkuhio3k2rjkofn2mbikbkwjhnkk";
  const accessToken = jwt.sign({ userId: request.user }, SECRET, {
    expiresIn: 1,
  });
  const refreshToken = jwt.sign({ userId: request.user }, SECRET, {
    expiresIn: 1,
  });
  return response
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .header("Authorization", "")
    .json({
      message: "vous êtes déconnectés",
      data: { accessToken, refreshToken },
    });
};

const getMe = async (request, response) => {
  try {
    const user = await UserRepo.findOne({ _id: request.user });

    if (!user) {
      return response.status(404).json({ message: "Utilisateur inconnu" });
    }
    const {
      __v,
      is_active,
      is_verified,
      is_admin,
      createdAt,
      updatedAt,
      password,
      ...rest
    } = user.toJSON();

    response.status(200).json(rest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePwd = async (request, response) => {
  const accessToken = request.headers["authorization"];
  const { oldPassword, newPassword } = await request.json();
  if (!oldPassword) {
    return response.status(400).json({ error: "Invalid old password." });
  }
  if (!newPassword) {
    return response.status(400).json({ error: "Invalid new password." });
  }
  if (!accessToken) {
    return response.status(400).json({ error: "token is not defined" });
  }
  const result = await changePassword({
    oldPassword,
    newPassword,
    accessToken,
  });
  return response
    .status(result.status)
    .json({ message: result.message, data: result.data });
};

const verify_otp = async (request, response) => {
  const { otp, fullPhoneNumber } = await request.json();
  const result = await Otp.Verify({ otp, fullPhoneNumber });
  return response.json(result);
};
const send_otp = async (request, response) => {
  const { fullPhoneNumber } = await request.json();
  const result = await Otp.Send({ fullPhoneNumber });
  return response.json(result);
};

module.exports = {
  changePwd,
  getMe,
  logout,
  login,
  register,
  tokenActivation,
  resetPasswordRequest,
  resetPassword,
  refreshtoken,
  verify_otp,
  send_otp,
  MobileRegisterCtrl,
  get_sse_token,
};
