import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";
// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { isEmpty } from "lodash";
import { AsyncStorage } from "react-native";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  errorEmail: string;
  errorPassword: string;
  domain: any;
  selectedDomain: string;
  EmailSchema: any;
  PasswordOnlySchema: any;
  EmailOnlySchema: any;
  inviteSchema: any;
  snackBar: {
    show: boolean,
    message?: string,
    type?: "success" | "info" | "warning" | "error" | undefined
  };
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
  > {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  apiEmailCallId: string = "";

  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    let EmailSchema = {
      email: Yup.string()
        .email(configJSON.errorEmailNotValid)
        .required(configJSON.errorEmailRequired),
      password: Yup.string()
        .required(configJSON.errorPasswordNotValid),
    };

    let PasswordOnlySchema = {
      password: Yup.string()
        .required(configJSON.errorPasswordNotValid),
    };

    let EmailOnlySchema = {
      email: Yup.string()
        .email(configJSON.errorEmailNotValid)
        .required(configJSON.errorEmailRequired),
    }

    let inviteSchema = {
      email: Yup.string()
        .email(configJSON.errorEmailNotValid)
        .required(configJSON.errorEmailRequired),
      domainName: Yup.string()
        .required(configJSON.errorDomainRequired),
    };



    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      errorEmail: '',
      errorPassword: '',
      domain: [],
      selectedDomain: '',
      EmailSchema: EmailSchema,
      PasswordOnlySchema: PasswordOnlySchema,
      EmailOnlySchema: EmailOnlySchema,
      inviteSchema: inviteSchema,
      snackBar: {
        show: false,
      },
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // this.callGetValidationApi(); email
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    const lsdomain = localStorage.getItem('domain') || '[]'
    const lsSelecteDomain = localStorage.getItem('selectedDomain') || ''
    const lsEmail = localStorage.getItem('email') || ''

    !isEmpty(lsdomain) && this.setState({ ...this.state, domain: lsdomain }) && console.log('lsdomain', lsdomain)
    !isEmpty(lsSelecteDomain) && this.setState({ ...this.state, selectedDomain: lsSelecteDomain })
    !isEmpty(lsEmail) && this.setState({ ...this.state, email: lsEmail })
    // Customizable Area End
  }
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
    console.log('msg', msg)

  };

  // Customizable Area Start
  btnSocialLoginProps = {
    onClick: () => this.goToSocialLogin(),
  };

  btnPasswordShowHideProps = {
    onClick: () => {
      this.setState({ errorPassword: '', enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };


  CustomCheckBoxProps = {
    onChange: (value: any) => {
      // console.log('value',value.target.value)
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onClick: () => this.goToForgotPassword(),
  };

  txtInputPasswordProps = {
    onChange: (text: any) => {
      this.setState({ errorPassword: '', password: text?.target.value });

      //@ts-ignore
      this.txtInputPasswordProps.value = text?.target.value;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnSelectDominWebProps = {
    onChange: (text: any) => {
      console.log('text?.target.value', text?.target.value)
      this.setState({ selectedDomain: text?.target.value });
    },
  };

  btnRememberMeProps = {
    onClick: (evt: any) => {
      // console.log('evt.target.checked',evt.target.checked)
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
      // console.log('this.CustomCheckBoxProps.isChecked',this.CustomCheckBoxProps.isChecked)
      // console.log('this.state',this.state)
    },
    // defaultChecked: false,
    // checked : !this.state?.checkedRememberMe,
    // value : !this.state?.checkedRememberMe,
  };

  txtInputEmailWebProps = {
    onChange: (text: any) => {
      this.setState({ errorEmail: '', email: text?.target.value });
      //@ts-ignore
      this.txtInputEmailProps.value = text?.target.value;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // runEngine.debugLog("runEngine.debugLog", message);

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
          console.log("responseJson", responseJson)
          // 
          if (apiRequestCallId === this.apiEmailLoginCallId && responseJson !== undefined) {
            // this.openSnackBarHandler('success', configJSON.successLogin);
            setTimeout(() => {
              //@ts-ignore
              this.saveLoggedInUserData(responseJson);
              this.sendLoginSuccessMessage();
              this.openInfoPage();
            }, 1000);
          }

          // 
          if (apiRequestCallId === this.apiEmailCallId && responseJson !== undefined) {
            //this.openSnackBarHandler('success', configJSON.successLogin);
            setTimeout(() => {
              if (responseJson.success === false) {
                //@ts-ignore
                this.props?.history.push('email-account-Login-welcome')
              } else {
                runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
                this.setState({
                  domain: responseJson.domain
                })
                const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));
                msg.addData(getName(MessageEnum.DomainNameMessage), this.state.domain);
                localStorage.setItem('domain', JSON.stringify(responseJson.domain));
                if (isEmpty(responseJson.domain)) {
                  //@ts-ignore
                  this.props?.history.push('email-account-Login-welcome')
                } else {
                  console.log(responseJson, "this is your domain name")
                  //@ts-ignore
                  this.props?.history.push("select-domain")
                }
              }
            }, 1000);
          }
        }
      } else {
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        console.log("Inside", errors[0].failed_login)
        console.log('errors', errors)
        if (errors[0].token === 'Invalid token' || errors[0].token === 'Token has Expired') {
          localStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } else if (errors[0].message) {
          this.openSnackBarHandler('error', errors[0].message);
        } else if (errors[0].failed_login) {
          this.openSnackBarHandler('error', errors[0].failed_login);
        }
      }
    }
  }


  // Open View Details Modal
  openSnackBarHandler = (type: "success" | "info" | "warning" | "error" | undefined, message: string): void => {
    console.log("type,message", type, message)
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

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    console.log('responseJsonresponseJson', responseJson)
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );
      // AsyncStorage.setItem('token', responseJson.meta.token)

      localStorage.setItem('auth', responseJson.meta.token)
      localStorage.setItem('user_type', responseJson.meta.account.user_type)
      localStorage.setItem('fullname', responseJson.meta.account.fullname)



      this.send(msg);


    }
  }

  openInfoPage() {
    // const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    // console.log('msg',msg)
    // console.log('this.props',this.props)
    // msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    // this.send(msg);

    // localStorage.setItem('auth',);
    // alert('Login Successful')
    //@ts-ignore
    this.props.history.push("/");
    // this.props.history.push("select-domain")
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn = (values: any): Boolean => {
    console.log("values", values)
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const getDomain = JSON.parse(localStorage.getItem('selectedDomain') || "[]")
    console.log("getDomain", getDomain)
    !isEmpty(getDomain) && this.setState({ ...this.state, selectedDomain: getDomain })
    const attrs = {
      email: values.email || localStorage.getItem("email"),
      password: values.password,
      domain: this.state.selectedDomain || localStorage.getItem("selectedDomain")
      // email: "admin@oked.com",
      // password: "Admin@123",
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    // console.log("requestMessage", requestMessage);
    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
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
      configJSON.loginAPiMethod
    );

    // console.log(
    //   "requestMessage.id, requestMessage",
    //   requestMessage.id,
    //   requestMessage
    // );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  handleEmailLogin = (values: any): Boolean => {
    localStorage.setItem('email', values.email)

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: values.email,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };
    // console.log('httpBody',httpBody)

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailCallId = requestMessage.messageId;
    console.log("apiEmailCallId", this.apiEmailCallId);

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.EmailLoginAPiEndPoint
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
      configJSON.loginAPiMethod
    );

    // console.log(
    //   "requestMessage.id, requestMessage",
    //   requestMessage.id,
    //   requestMessage
    // );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  handleDomainSelection(): Boolean {
    // console.log("API HIT");
    // console.log('this.state',this.state)
    if (
      this.state.selectedDomain === '' ||
      isEmpty(this.state.selectedDomain)
    ) {
      this.openSnackBarHandler('error', "Domain is not Selected");
      // alert('Domain is not Selected')
      return false;
    }
    else {
      localStorage.setItem('selectedDomain', JSON.stringify(this.state.selectedDomain));
      //@ts-ignore
      this.props?.history.push('email-account-Login-welcome')
      return true;
    }
  }

  callGetValidationApi() {
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
}
