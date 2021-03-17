import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import {identity, isEmpty} from 'lodash'
import * as Yup from "yup";

// Customizable Area Start
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
  email: string;
  errorEmail: string;
  password: string;
  errorPassword: string;
  confirmPassword: string;
  errorConfirmPassword: string;
  EmailOnlySchema: any;
  NewPasswordSchema: any;
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
  apiPasswordCallId: string = "";
  apiForgotCallId: string = "";

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

    let EmailOnlySchema ={
      email: Yup.string()
        .email(configJSON.errorEmailNotValid)
        .required(configJSON.errorEmailRequired),
    }

     let NewPasswordSchema = {
      password: Yup.string() 
      .matches(
        configJSON.PASSWORD_REGULAR_EXPRESSION,
        configJSON.errorNewPasswordNotValid
        )
      .required(configJSON.errorNewPasswordEmpty),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(configJSON.errorNewPasswordEmpty)
     }
    

    this.state = {
      email: '',
      errorEmail:'',
      password: "",
      errorPassword: "",
      confirmPassword:'',
      errorConfirmPassword:'',
      EmailOnlySchema:EmailOnlySchema,
      NewPasswordSchema:NewPasswordSchema,
      snackBar: {
        show: false,
      },
    };

    this.emailReg = new RegExp("");
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    
    // Customizable Area End
  }
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
   console.log('msg',msg)

  };

  // Customizable Area Start
  
  txtInputPasswordWebProps = {
    onChange: (text: any) => {
      this.setState({ errorPassword:'' , password: text?.target.value });
    },
  };

  txtInputConfirmPasswordWebProps = {
    onChange: (text: any) => {
      this.setState({ errorConfirmPassword:'' , confirmPassword: text?.target.value });
    },
  };


  txtInputEmailWebProps = {
    onChange: (text: any) => {
      this.setState({ errorEmail:''  ,email: text?.target.value });
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
         console.log("responseJson",responseJson)
          // 
          if (apiRequestCallId === this.apiPasswordCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successCreateAccount);
            setTimeout(() => {
              //@ts-ignore
              localStorage.setItem("user_type", responseJson.data.user_type);
              //@ts-ignore
              this.props.history.push("/");
            }, 1000);
          }
          if (apiRequestCallId === this.apiForgotCallId && responseJson !== undefined) {
            console.log("responseJson",responseJson)
            this.openSnackBarHandler('success', configJSON.successCreateAccount);
            setTimeout(() => {
            //  localStorage.setItem("email", this.state.email);
            //   localStorage.setItem("user_type", responseJson.data.user_type);
            localStorage.setItem("auth",responseJson.token)
              // @ts-ignore
              this.props.history.push("forgot-email-send-successfully");
            }, 1000);
          }
        }
      } else {
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        if(errors[0].token === 'Invalid token' ||errors[0].token ===  'Token has Expired') {
          localStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } else if(errors[0].message) {
          this.openSnackBarHandler('error', errors[0].message);
        }  else if(errors[0].otp) {
          this.openSnackBarHandler('error', errors[0].otp);
        } 
      }
    }
    // Customizable Area End
   
    }
    //apiForgotCallId

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

//   sendLoginSuccessMessage() {
//     const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

//     msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
//     msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
//     msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
//     msg.addData(
//       getName(MessageEnum.LoginIsRememberMe),
//       this.state.checkedRememberMe
//     );

//     this.send(msg);
//   }

  saveLoggedInUserData(responseJson: any) {
    console.log('responseJsonresponseJson',responseJson)
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
       localStorage.setItem('auth',responseJson.meta.token)

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

  createNewPassword = (values:any): Boolean => {

    console.log("urlTypeurlType",values.type)
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };

    let attrs ={}
    if(values.type === 'activePassword'){
      attrs = {
        password: values.password,
        confirm_password: values.passwordConfirmation,
        // email: localStorage.getItem('email') || this.state.email ||  '',
      }
    }else{
      attrs = {
        new_password: values.password,
        confirm_new_password: values.passwordConfirmation,
        // email: localStorage.getItem('email') || this.state.email ||  '',
        }
    }

    // const attrs = {
    //   password: values.password,
    //   confirm_password: values.passwordConfirmation,
    //   // email: localStorage.getItem('email') || this.state.email ||  '',
    // };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    console.log('httpBody',httpBody)

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage) 
    );

    // console.log("requestMessage", requestMessage);
    this.apiPasswordCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      values.type === 'activePassword' ?
     `${configJSON.activePasswordApiEndPoint}?token=${values.token}`
     : `${configJSON.newPasswordApiEndPoint}?token=${values.token}`
     
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
      configJSON.httpPostMethod
    );

   
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
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


  handleForgotPassword= (values:any) : Boolean =>{
      // if (
      //   this.state.email === null ||
      //   this.state.email.length === 0 ||
      //   !this.emailReg.test(this.state.email)
      // ) {
      //   this.setState({
      //       errorEmail :configJSON.pleaseEnterAValidEmail
      //   })  
      //   return false;
      // }
    localStorage.setItem("email",values.email)
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };

    // console.log('this.state',this.state)
    const attrs = {
      email: values.email
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

    // console.log("requestMessage", requestMessage);
    this.apiForgotCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ForgotPasswordApiEndPoint
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
      configJSON.httpPostMethod
    );

   
    runEngine.sendMessage(requestMessage.id, requestMessage);

      return true;
  }

   // Open View Details Modal
  openSnackBarHandler = (type: "success" | "info" | "warning" | "error" | undefined,  message: string): void => {
    console.log("type,message",type,message)
    this.setState({ snackBar: {
      show: true,
      message: message,
      type
    } });
  };

  // Close View Details Modal
  closeSnackBarHandler = () => {
    this.setState({ snackBar: {
      show: false,
      message: this.state.snackBar.message,
      type: this.state.snackBar.type
    }});
  };
}

