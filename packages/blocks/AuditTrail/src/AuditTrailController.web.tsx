import { AsyncStorage } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

interface SelectOptions {
  value: string;
  label: string;
}
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  memberDetails: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  auth: string | null | undefined;
  trailType: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  showFilterCalendar: boolean;
  userType: string;
  menuCollapsed: boolean;
  membersData: object[];
  allLogsData: object[];
  trailsOfTeamMemberData: any;
  memberDetailsModal: boolean;
  showLogsFilter: boolean;
  selectedEventTypeOption: SelectOptions | null;
  selectedResourceTypeOption: SelectOptions | null;
  searchText: string | null | undefined;
  memberListingLoader: boolean;
  logsListingLoader: boolean;
  trailDetailsLoader: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AuditTrailControllerWeb extends BlockComponent<
  Props,
  S,
  SS
  > {
  auth: string | null | undefined = window.localStorage.getItem("auth");
  getAllMembersApiCallId: string = "";
  getAllLogsApiCallId: string = "";
  trailsOfTeamMemberApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      auth: "",
      trailType: configJSON.membersText,
      startDate: new Date(),
      endDate: null,
      showFilterCalendar: false,
      userType: configJSON.subscriber,
      menuCollapsed: false,
      membersData: [],
      allLogsData: [],
      trailsOfTeamMemberData: [],
      memberDetailsModal: false,
      showLogsFilter: false,
      selectedEventTypeOption: null,
      selectedResourceTypeOption: null,
      searchText: "",
      memberListingLoader: false,
      logsListingLoader: false,
      trailDetailsLoader: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getMembersList();
    this.getAllLogs();
  }

  // searchTextInputProps = (e: Event): void => {
  //   // this.setState({ searchText: e.target.value });
  // };

  // Handler for Get Members List
  getMembersList = (): boolean => {
    this.setState({
      memberListingLoader: true
    });

    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllMembersApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllMembersApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAllMembersApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Handler for Get All Logs
  getAllLogs = (): boolean => {
    this.setState({
      logsListingLoader: true
    });

    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllLogsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllMembersApiEndPoint + "?all=true"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAllMembersApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Handler for Trails of Team member
  trailsOfTeamMember = (accountId: number): boolean => {
    this.setState({
      trailDetailsLoader: true
    });

    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.trailsOfTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getAllMembersApiEndPoint}?account_id=${accountId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAllMembersApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recevied", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {
          // Store All Members data
          if (
            apiRequestCallId === this.getAllMembersApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              membersData: responseJson.data,
              memberListingLoader: false
            });
          }

          // Store All Logs data
          if (
            apiRequestCallId === this.getAllLogsApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              allLogsData: responseJson.data,
              logsListingLoader: false
            });
          }

          // Store trails Of Team Member detaills
          if (
            apiRequestCallId === this.trailsOfTeamMemberApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              trailsOfTeamMemberData: {
                data: responseJson.data,
                count: responseJson.meta.total_record,
                name: responseJson.data[0].attributes.account_detail.name,
              },
              trailDetailsLoader: false
            });
          }
        }
      } else {
        this.parseApiCatchErrorResponse(errorReponse);
        AsyncStorage.setItem("auth", "");
        //@ts-ignore
        this.props?.history.push("login");
      }
    }
    // Customizable Area End
  }

  // Trail Type useImperativeHandle(
  handleTrailType = (type: string): void => {
    this.setState({
      trailType: type,
    });
  };

  // On Date Change
  hanldeOnChangeDate = (dates: any): any => {
    const [start, end] = dates;
    this.setState({
      startDate: start,
      endDate: end,
      showFilterCalendar: end === null || end === "",
    });
  };

  // Close Calendar popper
  onCalendarClose = () => {
    this.setState({
      showFilterCalendar: false,
    });
  };

  // Open Calendar popper
  onCalendarOpen = () => {
    this.setState({
      showFilterCalendar: true,
    });
  };

  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
    });
  };

  // Open View Details Modal
  openTrailViewDetailsModalHandler = (accountId: number): void => {
    this.trailsOfTeamMember(accountId);
    this.setState({ memberDetailsModal: true });
  };

  // Close View Details Modal
  closeTrailViewDetailsModalHandler = () => {
    this.setState({ memberDetailsModal: false });
  };

  logsFilterHandler = () => {
    this.setState({ showLogsFilter: !this.state.showLogsFilter });
  };

  handleEventTypeChange = (selectedOption: any) => {
    this.setState({ selectedEventTypeOption: selectedOption });
  };

  handleResourceTypeChange = (selectedOption: any) => {
    this.setState({ selectedResourceTypeOption: selectedOption });
  };
  // Customizable Area End
}
