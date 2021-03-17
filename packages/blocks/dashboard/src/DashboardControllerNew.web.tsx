import { AsyncStorage } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  user_type: string;
  menuCollapsed: boolean;
  searchText: string | null | undefined;
  message: string;
  snackBar: {
    show: boolean;
    message?: string;
    type?: "success" | "info" | "warning" | "error" | undefined;
  };
  auth: string | null | undefined;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  userDashboardApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      dashboardData: [],
      errorMsg: "",
      token: "",
      loading: false,
      user_type: configJSON.subscriber,
      menuCollapsed: false,
      searchText: "",
      message: "",
      auth: "",
      snackBar: {
        show: false,
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getDashboardDetails();
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );

        if (apiRequestCallId != null) {
          if (apiRequestCallId === this.userDashboardApiCallId) {
            this.setState({
              message: responseJson.message,
            });
          }
        }
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        if(errors[0].token === 'Invalid token' ||errors[0].token ===  'Token has Expired') {
          AsyncStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } 
        else(errors[0].message)
          this.openSnackBarHandler('error', errors[0].message);
      }
    }
  }

  // Handler dashboard Details
  getDashboardDetails = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userDashboardApiCallId = requestMessage.messageId;
    console.log("this.userProfileApiCallId", this.userDashboardApiCallId);

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetdashboardURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Open View Details Modal
  openSnackBarHandler = (type: "success" | "info" | "warning" | "error" | undefined,  message: string): void => {
    this.setState({ snackBar: {
      show: true,
      message: message,
      type
    } });
  };

  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
    });
  };
}
