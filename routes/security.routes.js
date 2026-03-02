const HyperExpress = require("hyper-express");
const {
  trustedGateway: { gatewayAndUser },
} = require("../middlewares");
const auth_api_router = new HyperExpress.Router();

const AUTH_API_PREFIX = process.env.AUTH_API_PREFIX;

const { SecurityCtrl } = require("../controller");

const {
  register,
  tokenActivation,
  login,
  resetPasswordRequest,
  resetPassword,
  refreshtoken,
  logout,
  getMe,
  changePwd,
  verify_otp,
  send_otp,
  MobileRegisterCtrl,
} = SecurityCtrl;

auth_api_router.route(`${AUTH_API_PREFIX}/register`).post(register);

auth_api_router.route(`${AUTH_API_PREFIX}/mobileRegister`).post(MobileRegisterCtrl);

auth_api_router.route(`${AUTH_API_PREFIX}/activate`).post(tokenActivation);

auth_api_router.route(`${AUTH_API_PREFIX}/login`).post(login);

auth_api_router
  .route(`${AUTH_API_PREFIX}/resetPwdReq`)
  .post(resetPasswordRequest);

auth_api_router.route(`${AUTH_API_PREFIX}/resetPwd`).post(resetPassword);

auth_api_router.route(`${AUTH_API_PREFIX}/refreshToken`).post(refreshtoken);

auth_api_router.route(`${AUTH_API_PREFIX}/verifyOtp`).post(verify_otp);

auth_api_router.route(`${AUTH_API_PREFIX}/sendOtp`).post(send_otp);

auth_api_router.route(`${AUTH_API_PREFIX}/logout`).post(logout);

// Routes privées

auth_api_router.use(`${AUTH_API_PREFIX}/changePwd`, gatewayAndUser);

auth_api_router.route(`${AUTH_API_PREFIX}/changePwd`).post(changePwd); // ok

auth_api_router.use(`${AUTH_API_PREFIX}/getMe`, gatewayAndUser);

auth_api_router.route(`${AUTH_API_PREFIX}/getMe`).get(getMe); //ok

module.exports = auth_api_router;
