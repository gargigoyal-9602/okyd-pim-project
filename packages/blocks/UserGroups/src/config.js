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
exports.subscriber = "subscriber";
exports.admin = "admin";
exports.admin = "dealer";
// Get Members
exports.getAllMembersApiContentType = "application/json";
exports.getAllMembersApiMethodType = "GET";
exports.getAllMembersApiEndPoint = "bx_block_audittrail/audit_trail";
exports.token =
  "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTIsImV4cCI6MTYxMjUxNDYyMH0.Bvqct7QqVkSWbd4vY7UOqfwW9qLqXedc1JLphiGmqeywSR_V7Z5RnXfUMKbgqbz0Tv5ed_WZrsWjZ8eXFAUOZA";
// Event Options
exports.resourceTypeOptions = [
  { value: "SignUp", label: "SignUp" },
  { value: "Login", label: "Login" },
  { value: "ForgotPassword", label: "ForgotPassword" },
  { value: "ResetPassword", label: "ResetPassword" },
];
exports.eventTypeOptions = [
  { value: "SignUp", label: "SignUp" },
  { value: "Login", label: "Login" },
  { value: "ForgotPassword", label: "ForgotPassword" },
  { value: "ResetPassword", label: "ResetPassword" },
];

exports.PHONE_REGULAR_EXPRESSION = new RegExp(
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);
// "/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/";

exports.errorNameEmpty = "Please Enter Name";
exports.errorDesignationEmpty = "Please Enter Designation";
exports.errorPhoneEmpty = "Please Enter Phone Number";
exports.errorPhoneNotMatch = "Phone number is not valid";
exports.errorEmailEmpty = "Please Enter Email";
exports.errorEmailValidation = "Please Enter Valid Email";
exports.errorUserGroupEmpty = "Please Select User Group";

//API Method
exports.validationGetApiMethodType = "GET";
exports.validationUpdateApiMethodType = "PUT";
exports.validationPostApiMethodType = "POST";
exports.validationDeleteApiMethodType = "DELETE";
exports.validationApiContentType = "application/json";

exports.TeamMemberAPiEndPoint = "accounts";
exports.InviteTeamMemberAPiEndPoint = "accounts/invite_team_member";
exports.ResendInviteTeamMemberAPiEndPoint = "accounts/resend_invite";
exports.RolesListAPiEndPoint = "bx_block_roles_permissions/roles";
