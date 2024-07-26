const AuthMessage = Object.freeze({
  SendOtpSuccessfully: "send otp successfully",
  NotFound: "user not found",
  OtpCodeNotExpired: "otp code not expired please try later ",
  OtpCodeExpired: "otp code expired please try again",
  OtpCodeIsIncorrect: "otp code is incorrect",
  LoginSuccessfully: "your login successfully",
  LogoutSuccessfully: "Successfully logged out",
});

module.exports = AuthMessage;
