Object.defineProperty(exports, "__esModule", {
  value: true,
});

//APi Methods
exports.httpGetMethod = "GET";
exports.httpPostMethod = "POST";

exports.profileValidationSettingsAPiEndPoint = "profile/validations";
exports.passwordRecoveryStartOtpAPiEndPoint = "forgot_password/otp";
exports.passwordRecoveryConfirmOtpAPiEndPoint = "otp_confirmation";
exports.passwordRecoveryChangePasswordAPiEndPoint = "forgot_password/password";
exports.forgotPasswordAPiContentType = "application/json";
exports.pleaseEnterAValidEmail = "Please enter a valid email";
exports.emailIsRequired = "Email is required";
exports.phoneNumberIsNotValid = "Phone number is not valid";
exports.phoneNumberIsRequired = "Phone number is required";
exports.otpCodeIsRequired = "Phone number is required";
exports.pleaseEnterAPassword = "Please enter a password";
exports.passwordMustBeAtLeast2Characters =
  "Password must be at least 2 characters";
exports.pleaseConfirmYourPassword = "Please confirm your password";
exports.passwordsMustMatch = "Passwords must match";
exports.invalidEmailAddress = "Invalid email address";
exports.invalidPassword = "Invalid password";
exports.goToOtpAfterPhoneValidationErrorTitle = "Error";
exports.goToOtpAfterPhoneValidationErrorBody = "Please select country code";

exports.labelTextIsAccountRecovery = "Account Recovery";
exports.secondLabelText =
  "Please choose what type of account you signed up with.";
exports.thirdLabelText =
  "To Reset your password, please enter the email associated with your account.";
exports.forthLabelText = "We sent a confirmation code to the following email:";
exports.fifthLabelText =
  "To Reset your password, please enter the phone number associated with your account.";
exports.sixthLabelText = "We sent a confirmation code to the following phone:";

exports.firstInputAutoCompleteType = "email";
exports.firstInputPlaceholder = "Email";
exports.firstInputKeyboardStyle = "email-address";
exports.firstInputErrorColor = "red";

exports.buttonTextIsNext = "Next";
exports.buttonColorForNextButton = "#6200EE";

exports.secondInputAutoCompleteType = "tel";
exports.secondInputKeyboardType = "phone-pad";
exports.secondInputPlaceholder = "Mobile";
exports.secondInputErrorColor = "red";

exports.thirdInputPlaceholder = "Enter OTP";
exports.thirdInputErrorColor = "red";

exports.buttonTitleIsSMSPhoneAccount = "SMS (Phone) Account";
exports.buttonTitleIsEmailAccount = "Email Account";

exports.labelTextIsPleaseEnterYourNewPassword =
  "Please enter your new password.";
exports.labelTextIsYourPasswordHasBeenSuccessfullyChanged =
  "Your password has been successfully changed";

exports.handled = "handled";

exports.placeholderIsReTypePassword = "Re-Type Password";

exports.buttonTitleIsOk = "Ok";
exports.buttonColorForOkButton = "#6200EE";

exports.placeholderIsPassword = "password";
exports.placeholderIsNewPassword = "Enter New Password";

exports.countryCodeSelectorPlaceholder = "Select Country";

exports.errorPasswordEmpty = "Please Enter Password";
exports.errorNewPasswordEmpty = "Please Enter New Password";

exports.errorPasswordLengthLess =
  "Password Length must be Greater then 8 letter";
exports.errorPasswordLengthMax = "Password Length must be Less then 10 letter";

exports.errorConfirmPasswordNotMatch = "Please Enter Same Password";
exports.activePasswordApiEndPoint = "accounts/email_confirmation";
exports.newPasswordApiEndPoint = "change_password";

exports.ForgotPasswordApiEndPoint = "forgot_password";

exports.errorEmailNotValid = "Please Enter Valid Email";
exports.errorEmailRequired = "Please Enter Email";
exports.placeHolderEmail = "Enter Your Email";

exports.PASSWORD_REGULAR_EXPRESSION = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
exports.errorNewPasswordNotValid =
  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
