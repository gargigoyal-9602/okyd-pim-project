Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.ACCOUNT_TYPE_EMAIL = "EmailAccount";
exports.ACCOUNT_TYPE_SOCIAL = "SocialAccount";
exports.ACCOUNT_TYPE_PHONE = "SmsAccount";

exports.contentTypeApiUpdateUser = "application/json";
exports.apiEndPointUpdateUser = "profile/profile";
exports.apiUpdateUserType = "PUT";

exports.urlGetValidations = "profile/validations";
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";

exports.contenttypeApiValidateMobileNo = "application/json";
exports.endPointApiValidateMobileNo = "profile/change_phone_validation";
exports.callTypeApiValidateMobileNo = "POST";

exports.contentTypeApiGetUserProfile = "application/json";
exports.endPointApiGetUserProfile = "profile/profile";
exports.methodTypeApiGetUserProfile = "GET";

exports.endPointApiGetUserProfileDetails = "bx_block_profile/profile";
exports.endPointApiPutUserProfileUpdatedDetails = "bx_block_profile/profile";
exports.endPointApiPostUserUpdateChangePassword =
  "bx_block_profile/change_password";
exports.methodTypeApiPostUserProfileUpdated = "PUT";

// Customizable Area Start
exports.placeHolderEmail = "Email";
exports.labelHeader =
  "This is your profile, Here you can see and update your personal information.";
exports.labelFirstName = "First name";
exports.lastName = "Last name";
exports.labelArea = "Area";
exports.labelMobile = "Mobile";
exports.labelEmail = "Email";
exports.labelCurrentPassword = "Current password";
exports.labelNewPassword = "New Password";
exports.labelRePassword = "Re-Type Password";
exports.btnTextCancelPasswordChange = "Cancel";
exports.btnTextSaveChanges = "Save Changes";
exports.btnTextChangePassword = "Change Password";
exports.errorCountryCodeNotSelected = "Please select country code";
exports.errorMobileNoNotValid = "Phone number is not valid.";
exports.errorTitle = "Error";
exports.errorBothPasswordsNotSame = "Passwords must match.";
exports.errorCurrentNewPasswordMatch =
  "New password cannot match current password.";
exports.errorCurrentPasswordNotValid = "Current password not valid.";
exports.errorNewPasswordNotValid = "New password not valid.";
exports.errorReTypePasswordNotValid = "Re-type password not valid.";
exports.hintCountryCode = "Select Country";
exports.errorBlankField = "can't be blank";
exports.errorEmailNotValid = "Email not valid.";
// Customizable Area End

Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";
exports.exampleAPiEndPoint = "EXAMPLE_URL";
exports.exampleAPiMethod = "POST";
exports.exampleApiContentType = "application/json";
exports.textInputPlaceHolder = "Enter Text";
exports.labelTitleText = "UserGroups";
exports.labelBodyText = "UserGroups Body";

exports.btnExampleTitle = "CLICK ME";
// Customizable Area End

exports.title = "Audi Trails";
exports.membersText = "MEMBERS";
exports.allLogsText = "ALL LOGS";
exports.sortBy = "SORT";
exports.designationText = "Designation";
exports.nameText = "Name";
exports.phoneText = "Phone";
exports.roleText = "Role";
exports.emailText = "Email";
exports.trailsText = "Trail";
exports.lastLogText = "Last Log";
exports.viewDetailsText = "View Details";
exports.eventNameText = "Event Name";
exports.moduleText = "Module";
exports.logTimeText = "Log Time";
exports.descriptionText = "Description";
exports.subscriber = "Subscriber";
exports.admin = "Admin";
exports.dealer = "Dealer";
// Get Members
exports.getAllMembersApiContentType = "application/json";
exports.getAllMembersApiMethodType = "GET";
exports.getAllMembersApiEndPoint = "bx_block_audittrail/audit_trail";
exports.token =
  "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTIsImV4cCI6MTYxMjUxNDYyMH0.Bvqct7QqVkSWbd4vY7UOqfwW9qLqXedc1JLphiGmqeywSR_V7Z5RnXfUMKbgqbz0Tv5ed_WZrsWjZ8eXFAUOZA";
// Event Options

exports.PHONE_REGULAR_EXPRESSION = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

exports.PASSWORD_REGULAR_EXPRESSION = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
exports.errorNameEmpty = "Please Enter Name";
exports.errorDesignationEmpty = "Please Enter Designation";
exports.errorPhoneEmpty = "Please Enter Phone Number";
exports.errorPhoneNotMatch = "Phone number is not valid";
exports.errorEmailEmpty = "Please Enter Email";
exports.errorEmailValidation = "Please Enter Valid Email";
exports.errorAddressEmpty = "Please Enter Address";
exports.errorCompanyNameEmpty = "Please Enter company Name";
exports.errorCountryEmpty = "Please Select Country";
exports.errorPassword = "Please Enter Old Password";
exports.errorNewPasswordEmpty = "Please Enter New Password";
exports.errorNewPasswordNotValid =
  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
exports.errorConfirmNewPasswordEmpty = "Please Enter Confirm Password";
exports.errorConfirmNewPasswordNotMatch =
  "Password Must Match With New Password";

exports.SuccessfullyUpdatedProfile = "Profile is successfully updated";
exports.SuccessfullyUpdatedPassword = "Password is successfully updated";
