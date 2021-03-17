enum MessageEnum {
  EntityPostedMessage,
  PostEntityMessage,
  GetEntityMessage,
  NavigationMessage,
  NavigationScreenNameMessage,
  NavigationRaiseMessage,
  NavigationTargetMessage,
  NavigationPropsMessage,
  NavigationPayLoadMessage,
  NavigationMobilePhoneOTPMessage,
  NavigationMobilePhoneAdditionalDetailsMessage,
  NavigationNewPasswordMessage,
  NavigationInfoPageMessage,
  NavigationHomeScreenMessage,
  NavigationMobilePhoneLogInMessage,
  NavigationEmailLogInMessage,
  NavigationSocialLogInMessage,
  NavigationTermAndConditionMessage,
  NavigationPrivacyPolicyMessage,
  NavigationForgotPasswordPageInfo,
  NavigationForgotPasswordOTPMessage,
  NavigationForgotPasswordMessage,
  NavigationSocialMediaAccountLogin,
  NavigationSocialMediaAccountCreation,
  NavigateEmailSignUpMessage,
  RestAPIRequestMessage,
  RestAPIRequestMethodMessage,
  RestAPIRequestHeaderMessage,
  RestAPIRequestBodyMessage,
  RestAPIResponceMessage,
  RestAPIResponceDataMessage,
  RestAPIResponceSuccessMessage,
  RestAPIResponceErrorMessage,
  RestAPIResponceEndPointMessage,
  AlertMessage,
  AlertTypeMessage,
  AlertTitleMessage,
  AlertBodyMessage,
  CountryCodeMessage,
  CountyCodeDataMessage,
  EnterOTPAsForgotPasswordMessage,
  AuthTokenPhoneNumberMessage,
  AuthTokenEmailMessage,
  AuthTokenDataMessage,
  InfoPageMessage,
  InfoPageTitleMessage,
  InfoPageBodyMessage,
  InfoPageButtonTextMessage,
  InfoPageDataMessage,
  InfoPageNavigationScreenMessage,
  AccoutResgistrationSuccess,
  AccoutLoginSuccess,
  SessionRequestMessage,
  SessionRequestedBy,
  SessionResponseMessage,
  SessionResponseData,
  SessionResponseToken,
  SessionResponseError,
  SessionSaveMessage,
  AuthenticateUserMessage,
  LoginSuccessMessage,
  LoginFaliureMessage,
  LoginUserName,
  LoginPassword,
  LoginCountryCode,
  LoginIsRememberMe,
  RequestUserCredentials,
  ReciveUserCredentials,
  RequestUserSession,
  ReciveUserSession,
  NavigationAlertWebMessage,
  AlertButtonPositiveText,
  AlertButtonPositiveMessage,
  AlertButtonNegativeText,
  AlertButtonNegativeMessage,
  AlertButtonNeutralText,
  AlertButtonNeutralMessage,
  NavigationPlaceSearchMessage,
  SelectedPlaceMessage,
  SelectedPlaceData,
  SelectedPlaceDetails,
  UserDeletesProfileImageMessage,
  SearchIconOnNavigationBarMessage,
  AddStopToSearchLocationDirectionMessage,
  SelectedRoleMessage,
  SelectedRoleDataMessage,
  SplashScreenCompleteMessage,
  OnboardingGuideControllerSkipOnboarding,
  OnboardingGuideControllerDoneOnboarding,
  NavigationDiscoverAllMessage,
  InitiatePayment,
  NavigationLocationMessage,
  LocationReqestingScreenIdMessage,
  NavigationCalendarMessage,
  LocationReqestingScreenMessage,
  AddressSelectionMessage,
  SelectedServiceMessage,
  SelectedOfferMessage,
  SelectedTimeMessage,
  SelectedDateMessage,
  NavigationShoppingcartMessage,
  SelectedSpecialistMessage,
  ServiceProviderIdMessage,
  NavigationReviewsMessage,
  NavigationDiscountsOffersMessage,
  NavigationOfferDetailsMessage,
  SelectedSpecialOfferDataMessage,
  NavigationStoreLocatorMessage,
  DomainNameMessage
}

export const getName = (myEnum: MessageEnum) => {
  return MessageEnum[myEnum];
};

const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
const isNavigationMessage = (value: string) => value.indexOf('navigateTo');

// Turn enum into array
export const enumToArray = (myEnum: any) => {
  return Object.keys(myEnum)
    .filter(StringIsNumber)
    .map(key => myEnum[key]);
};

export const enumToNavigationArray = (myEnum: any) => {
  return enumToArray(myEnum).filter(isNavigationMessage);
};

export default MessageEnum;
