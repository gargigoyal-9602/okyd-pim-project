import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { isEmpty } from 'lodash'
import * as Yup from "yup";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  fullName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  userType: string;
  domainName: string;
  address: string;
  country: string;
  teamMemberOkyd: string;
  natureOfBussiness: string;
  clientTarget: string;
  errorMandatory: string;
  errorEmail: string;
  errorCompanyName: string;
  errorDomainName: string;
  errorFullName: string;
  errorPhnNumber: string;
  errorAddress: string;
  errorCountry: string;
  activated: boolean;
  NewAccSchema: any;
  snackBar: {
    show: boolean,
    message?: string,
    type?: "success" | "info" | "warning" | "error" | undefined
  };
  domainNameSuccessSymbol: any
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}


export default class EmailAccountRegistrationController extends BlockComponent<
  Props,
  S,
  SS
  > {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  stringReg: RegExp;
  phoneReg: RegExp;
  numberReg: RegExp;
  createAccountApiCallId: any;
  createNewAccountApiCallId: any;

  validationApiCallId: string = "";
  domainAvailabilityApiCallId: string = "";
  imgPasswordVisible: any;
  imgPasswordInVisible: any;

  labelHeader: any;
  labelFirstName: string;
  lastName: string;
  labelEmail: string;
  labelPassword: string;
  labelRePassword: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;
  domainNameSuccessSymbol: boolean


  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
    ];
    this.receive = this.receive.bind(this);
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");
    this.stringReg = new RegExp(/^([\w]{3,})+\s+([\w\s]{3,})+$/i);
    this.phoneReg = new RegExp(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/);
    this.numberReg = new RegExp(/^[0-9]*$/);


    let NewAccSchema = {
      email: Yup.string()
        .email(configJSON.errorEmailNotValid)
        .required(configJSON.errorEmailRequired),
      companyName: Yup.string().required(configJSON.errorCompanyNameEmpty),
      domainName: Yup.string()
        .required(configJSON.errorDomainRequire),
      fullName: Yup.string()
        .matches(configJSON.fullNamePattern, configJSON.errorStingOnly)
        .required(configJSON.errorFullNameEmpty),
      phoneNumber: Yup.string()
        .matches(this.phoneReg, configJSON.errorPhoneNumberNotValid)
        .min(5, configJSON.errorPhoneNumberMin)
        .max(10, configJSON.errorPhoneNumberMax)
        .required(configJSON.errorPhoneNumberReqired),
      address: Yup.string()
        .min(20, configJSON.errorAddressMin)
        .max(250, configJSON.errorAddressMax)
        .required(configJSON.errorAddressEmpty),
      country: Yup.string().nullable(),
      teamMemberOkyd: Yup.string().nullable(),
      natureOfBussiness: Yup.string().nullable(),
      clientTarget: Yup.string().nullable()
    };


    this.state = {
      // Customizable Area Start
      email: "",
      companyName: "",
      domainName: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      country: "",
      teamMemberOkyd: "",
      natureOfBussiness: "",
      clientTarget: "",
      userType: "subscriber",
      activated: true,
      errorMandatory: "",
      errorEmail: "",
      errorCompanyName: "",
      errorDomainName: "",
      errorFullName: "",
      errorPhnNumber: "",
      errorAddress: "",
      errorCountry: "",
      NewAccSchema: NewAccSchema,
      snackBar: {
        show: false,
      },
      domainNameSuccessSymbol: true

      // Customizable Area End
    };

    // Customizable Area Start


    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelEmail = configJSON.labelEmail;
    this.labelPassword = configJSON.labelPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
    // Customizable Area End
  }



  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId != null) {
          // 
          if (apiRequestCallId === this.createNewAccountApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successCreateAccount);
            console.log(responseJson, "data")
            setTimeout(() => {
              //@ts-ignore
              localStorage.setItem("email", responseJson.data.attributes.email);
              localStorage.setItem("auth", responseJson.meta.token);
              localStorage.setItem(
                "fullname",
                responseJson.data.attributes.fullname
              );
              // @ts-ignore
              this.props.history.push("email-send-successfully");
            }, 1000);
          }
          if (apiRequestCallId === this.domainAvailabilityApiCallId && responseJson !== undefined) {
            this.setState({
              domainNameSuccessSymbol: responseJson.success
            })
            responseJson.success ?
              this.openSnackBarHandler('success', "Domain is available ") : this.openSnackBarHandler('error', "Domain is not available ")
          }
        }
      } else {
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        if (errors[0].token === 'Invalid token' || errors[0].token === 'Token has Expired') {
          localStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } else if (errors[0].message) {
          this.openSnackBarHandler('error', errors[0].message);
        } else if (errors[0].account) {
          this.openSnackBarHandler('error', errors[0].account);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  createAccount = (values: any): boolean => {
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
    };

    const attrs = {
      email: values.email,
      company_name: values.companyName,
      domain: `${values.domainName}.okyd.com`,
      fullname: values.fullName.replace(/\s+/g, ' ').trim(),
      full_phone_number: values.phoneNumber,
      address: values.address,
      country: values.country.name,
      teamMemberOkyd: values.teamMemberOkyd.name,
      natureOfBussiness: values.natureOfBussiness.name,
      clientTarget: values.clientTarget.name,
      user_type: values.user_type || localStorage.getItem('user_type') || this.state.userType,
      activated: this.state.activated || true,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
      //   token: this.state.otpAuthToken,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createNewAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.accountsAPiEndPoint
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  //// handle domain name availability


  domainAvailability = (domainValue: any): boolean => {
    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
    };


    const attrs = {
      domain: domainValue + ".okyd.com"
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

    this.domainAvailabilityApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiDomainAvailability
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (!this.isNonNullAndEmpty(String(countryCode))) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (this.isNonNullAndEmpty(countryCode)) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }


  btnLegalPrivacyPolicyProps = {
    onClick: () => this.goToPrivacyPolicy(),
  };

  btnLegalTermsAndConditionProps = {
    onClick: () => this.goToTermsAndCondition(),
  };

  txtInputEmailWebPrpos = {
    onChange: (text: any) => {
      this.setState({
        errorEmail: "",
        email: text.target.value,
      });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text.target.value;
    },
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address",
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;

  txtInputCompanyNameWebPrpos = {
    onChange: (text: any) => {
      this.setState({
        errorCompanyName: "",
        companyName: text.target.value,
      });
      //@ts-ignore
    },
  };

  txtInputDomainNameWebPrpos = {
    onChange: (text: any) => {
      this.setState({
        errorDomainName: "",
        domainName: text.target.value,
      });
      //@ts-ignore
    },
  };

  txtInputFullNameWebPrpos = {
    onChange: (text: any) => {
      this.setState({
        errorFullName: "",
        fullName: text.target.value,
      });
      //@ts-ignore
    },
  };

  txtInputPhoneNumberWebPrpos = {
    onChange: (text: Number) => {
      //@ts-ignore
      this.setState({ errorPhnNumber: "", phoneNumber: text?.target.value });
    },
  };

  txtInputAddressWebPrpos = {
    onChange: (text: any) => {
      this.setState({ errorAddress: "", address: text.target.value });
      //@ts-ignore
    },
  };

  txtInputCountryWebPrpos = {
    onChange: (text: any) => {
      this.setState({ country: text.target.value });
      //@ts-ignore
    },
  };

  txtInputTeamOkydWebPrpos = {
    onChange: (text: any) => {
      this.setState({ teamMemberOkyd: text.target.value });
      //@ts-ignore
    },
  };

  txtInputNatureofBussinessWebPrpos = {
    onChange: (text: any) => {
      this.setState({ natureOfBussiness: text.target.value });
      //@ts-ignore
    },
  };

  txtInputTargetClientWebPrpos = {
    onChange: (text: any) => {
      this.setState({ clientTarget: text.target.value });
      //@ts-ignore
    },
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


  // Customizable Area End
}
