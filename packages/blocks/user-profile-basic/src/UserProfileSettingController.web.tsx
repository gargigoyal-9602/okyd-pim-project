import { AsyncStorage } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";
import { values } from "lodash";
import Alert from "@material-ui/lab/Alert";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  memberDetails: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  user_type: string;
  menuCollapsed: boolean;
  searchText: string | null | undefined;
  GeneralInformationSchema: any;
  ChangePasswordSchema: any;
  generalInformation: boolean;
  changePassword: boolean;
  fullname: string;
  designation: string;
  full_phone_number: string;
  email: string;
  address: string;
  country: string;
  companyName: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
  old_password_visible: boolean;
  new_password_visible: boolean;
  confirm_new_password_visible: boolean;
  snackBar: {
    show: boolean,
    message?: string,
    type?: "success" | "info" | "warning" | "error" | undefined
  };
  auth: string | null | undefined;


  // Customizable Area End
}

interface SelectOptions {
  value: string;
  label: string;
}

interface SS {
  id: any;
}

export default class UserProfileSettingController extends BlockComponent<
  Props,
  S,
  SS
  > {
  auth: string | null | undefined = window.localStorage.getItem("auth");
  userProfileApiCallId: string = "";
  userUpdateProfileApiCallId: string = "";
  userUpdateChangePassword: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    let GeneralInformationSchema = {
      fullname: Yup.string().required(configJSON.errorNameEmpty),
      designation: Yup.string().required(configJSON.errorDesignationEmpty),
      full_phone_number: Yup.string()
        .required(configJSON.errorPhoneEmpty)
        .matches(
          configJSON.PHONE_REGULAR_EXPRESSION,
          configJSON.errorPhoneNotMatch
        ),
      email: Yup.string()
        .email(configJSON.errorEmailValidation)
        .required(configJSON.errorEmailEmpty),
      address: Yup.string().required(configJSON.errorAddressEmpty),
      companyName: Yup.string().required(configJSON.errorCompanyNameEmpty),
      country: Yup.string()
        .nullable()
        .required(configJSON.errorCountryEmpty),
    };

    let ChangePasswordSchema = {
      old_password: Yup.string().required(configJSON.errorPassword),
      new_password: Yup.string()
        .required(configJSON.errorNewPasswordEmpty)
        .matches(
          configJSON.PASSWORD_REGULAR_EXPRESSION,
          configJSON.errorNewPasswordNotValid
        ),
      confirm_new_password: Yup.string()
        .required(configJSON.errorConfirmNewPasswordEmpty)
        .test('passwords-match', configJSON.errorConfirmNewPasswordNotMatch, function (value) {
          return this.parent.new_password === value;
        }),

    };

    this.state = {
      user_type: "",
      menuCollapsed: false,
      searchText: "",
      GeneralInformationSchema: GeneralInformationSchema,
      ChangePasswordSchema: ChangePasswordSchema,
      fullname: "",
      designation: "",
      full_phone_number: "",
      email: "",
      address: "",
      country: "",
      companyName: "",
      generalInformation: true,
      changePassword: false,
      old_password: "",
      new_password: "",
      confirm_new_password: "",
      old_password_visible: false,
      new_password_visible: false,
      confirm_new_password_visible: false,
      auth: "",
      snackBar: {
        show: false,
      },

    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  // Customizable Area Start


  async componentDidMount() {
    this.getUserProfileDetails();
  }
  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {
          if (apiRequestCallId === this.userProfileApiCallId) {
            this.setState({
              fullname: responseJson.data.attributes.fullname,
              email: responseJson.data.attributes.email,
              designation: responseJson.data.attributes.designation,
              full_phone_number: responseJson.data.attributes.full_phone_number,
              address: responseJson.data.attributes.address,
              companyName: responseJson.data.attributes.company_name,
              country: responseJson.data.attributes.country,
              user_type: responseJson.data.attributes.user_type,
            });
          }

          if (apiRequestCallId === this.userUpdateProfileApiCallId) {
            this.setState({
              fullname: responseJson.data.attributes.fullname,
              email: responseJson.data.attributes.email,
              designation: responseJson.data.attributes.designation,
              full_phone_number: responseJson.data.attributes.full_phone_number,
              address: responseJson.data.attributes.address,
              companyName: responseJson.data.attributes.company_name,
              country: responseJson.data.attributes.country,
              user_type: responseJson.data.attributes.user_type,
            });
            window.localStorage.setItem("fullname", this.state.fullname)
            this.openSnackBarHandler('success', configJSON.SuccessfullyUpdatedProfile);
          }

          if (apiRequestCallId === this.userUpdateChangePassword) {
            this.openSnackBarHandler('success', configJSON.SuccessfullyUpdatedPassword);
          }
        }
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        if (errors[0].token === 'Invalid token' || errors[0].token === 'Token has Expired') {
          AsyncStorage.setItem("auth", "");
          this.openSnackBarHandler('error', errors[0].meaasge);
          //@ts-ignore
          this.props?.history.push("/login");
        }
        else if (errors[0].meaasge) {
          this.openSnackBarHandler('error', errors[0].meaasge);


        }
      }
    }
  }

  // Handler Profile Details
  getUserProfileDetails = (): boolean => {
    const headers = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfileDetails
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //// handle api for update profile details

  handleUpdateProfileDetails = (values: any): boolean => {
    const header = {
      "Content-Type": configJSON.contentTypeApiUpdateUser,
      token: this.auth,
    };


    const attrs = {
      fullname: values.fullname,
      designation: values.designation,
      address: values.address,
      country: values.country,
      full_phone_number: values.full_phone_number,
    };

    const data = {
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userUpdateProfileApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPutUserProfileUpdatedDetails
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiPostUserProfileUpdated
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //// handle api for change password
  handleUpdateChangePassword = (values: any): boolean => {

    const header = {
      "Content-Type": configJSON.contentTypeApiUpdateUser,
      token: this.auth,
    };

    const attrs = values;

    const data = {
      type: this.state.email,
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userUpdateChangePassword = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostUserUpdateChangePassword
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.callTypeApiValidateMobileNo
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };



  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
      generalInformation: true,
      changePassword: false,
    });
  };

  handleGeneralInformation = () => {
    this.setState({
      generalInformation: true,
      changePassword: false,
      old_password_visible: false,
      new_password_visible: false,
      confirm_new_password_visible: false,
    });
  };

  handleChangePassword = () => {
    this.setState({
      changePassword: true,
      generalInformation: false,
    });
  };

  handleOldPasswordVisible = () => {
    this.setState({
      old_password_visible: !this.state.old_password_visible,
    });
  };
  handleNewPasswordVisible = () => {
    this.setState({
      new_password_visible: !this.state.new_password_visible,
    });
  };
  handleConfirmNewPasswordVisible = () => {
    this.setState({
      confirm_new_password_visible: !this.state.confirm_new_password_visible,
    });
  };


  // Open View Details Modal
  openSnackBarHandler = (type: "success" | "info" | "warning" | "error" | undefined, message: string): void => {
    this.setState({
      snackBar: {
        show: true,
        message: message,
        type
      }
    });
  };

  // Close View Details Modal
  closeSnackBarHandler = () => {
    this.setState({
      snackBar: {
        show: false,
        message: this.state.snackBar.message,
        type: this.state.snackBar.type
      }
    });
  };

  handleCancel = () => {

    window.location.reload();
    this.openSnackBarHandler('success', "Changes cancelled successfully");


  }
}
