import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as Yup from "yup";
import { orderBy } from "lodash"

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
  currentId: any;
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  trailType: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  showFilterCalendar: boolean;
  userType: string;
  menuCollapsed: boolean;
  membersData: object[];
  getTeamMembetList: object[];
  trailsOfTeamMemberData: any;
  memberDetailsModal: boolean;
  showLogsFilter: boolean;
  selectedEventTypeOption: SelectOptions | null;
  selectedResourceTypeOption: SelectOptions | null;
  searchText: string | null | undefined;
  TeamMemberSchema: any;
  firstName: string;
  designation: string;
  phone: string;
  email: string;
  rolesGroup: any;
  rolesGroupName: any;
  inviteMemberDetailModal: boolean;
  rolesList: any;
  company_name: any;
  address: any;
  country: any;
  teamMemberOkyd: any;
  natureOfBussiness: any;
  clientTarget: any;
  role_ids: any;
  snackBar: {
    show: boolean,
    message?: string,
    type?: "success" | "info" | "warning" | "error" | undefined
  };
  sortName: any
  // Customizable Area End
}

interface SelectOptions {
  value: string;
  label: string;
}

interface SS {
  id: any;
}

interface RoleListDataType {
  value: string,
  label: string
}


export default class UserGroupsController extends BlockComponent<Props, S, SS> {
  getAllMembersApiCallId: string = "";
  getTeamMemberApiCallId: string = "";
  trailsOfTeamMemberApiCallId: string = "";
  deleteTeamMemberApiCallId: string = "";
  inviteTeamMemberApiCallId: string = "";
  updateTeamMemberApiCallId: string = "";
  rolesListingApiCallId: string = "";
  resendinviteTeamMemberApiCallId: string = "";


  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    let TeamMemberSchema = {
      firstName: Yup.string().required(configJSON.errorNameEmpty),
      designation: Yup.string().required(configJSON.errorDesignationEmpty),
      phone: Yup.string()
        .required(configJSON.errorPhoneEmpty)
        .matches(
          configJSON.PHONE_REGULAR_EXPRESSION,
          configJSON.errorPhoneNotMatch
        ),
      email: Yup.string()
        .email(configJSON.errorEmailValidation)
        .required(configJSON.errorEmailEmpty),
      rolesGroup: Yup.string()
        .nullable()
        .required(configJSON.errorUserGroupEmpty),
    };

    this.state = {
      currentId: "",
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      trailType: configJSON.allLogsText,
      startDate: new Date(),
      endDate: null,
      showFilterCalendar: false,
      userType: configJSON.subscriber,
      menuCollapsed: false,
      membersData: [],
      getTeamMembetList: [],
      trailsOfTeamMemberData: [],
      memberDetailsModal: false,
      showLogsFilter: true,
      selectedEventTypeOption: null,
      selectedResourceTypeOption: null,
      searchText: "",
      TeamMemberSchema: TeamMemberSchema,
      firstName: "",
      designation: "",
      phone: "",
      email: "",
      rolesGroup: [],
      rolesGroupName: [],
      inviteMemberDetailModal: false,
      rolesList: [],
      company_name: "",
      address: "",
      country: "",
      teamMemberOkyd: "",
      natureOfBussiness: "",
      clientTarget: "",
      role_ids: [],
      snackBar: {
        show: false,
      },
      sortName: null
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  // Handler for Get All Logs
  getTeamMember = (): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.TeamMemberAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationGetApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  getRolesList = (): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.rolesListingApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.RolesListAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationGetApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
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

  async componentDidMount() {
    this.getTeamMember();
    this.getRolesList();

  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        if (apiRequestCallId != null) {

          // Store All Members data
          if (apiRequestCallId === this.getAllMembersApiCallId && responseJson !== undefined) {
            // this.openSnackBarHandler('success', configJSON.successCreateAccount);
            setTimeout(() => {
              this.setState({
                membersData: responseJson.data,
              });
            }, 1000);
          }

          // Store All Logs data
          if (
            apiRequestCallId === this.getTeamMemberApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              getTeamMembetList: responseJson.data,
            });
            this.handleSortingName()
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
            });
          }

          if (apiRequestCallId === this.deleteTeamMemberApiCallId) {
            this.closeInviteTeamMemberModalHandler();
          }


          if (apiRequestCallId === this.inviteTeamMemberApiCallId) {
            this.setState({
              firstName: responseJson.data.attributes.fullname,
              designation: responseJson.data.attributes.designation,
              email: responseJson.data.attributes.email,
              phone: responseJson.data.attributes.phone_number,
              rolesGroup: responseJson.data.attributes.roles,
            })
            this.openInviteTeamMemberModalHandler();
          }

          if (apiRequestCallId === this.updateTeamMemberApiCallId) {
            let roldata: any = [];
            responseJson.data.attributes.roles?.map((x: any) => {
              roldata.push({
                value: x.id,
                label: x.name
              })
            })
            this.setState({
              firstName: responseJson.data.attributes.fullname,
              designation: responseJson.data.attributes.designation,
              email: responseJson.data.attributes.email,
              phone: responseJson.data.attributes.phone_number,
              rolesGroup: roldata,
            })
            window.localStorage.setItem("fullname", this.state.firstName)
            this.openInviteTeamMemberModalHandler();
          }

          if (apiRequestCallId === this.resendinviteTeamMemberApiCallId) {
            this.setState({
              firstName: responseJson.data.attributes.fullname,
              designation: responseJson.data.attributes.designation,
              email: responseJson.data.attributes.email,
              phone: responseJson.data.attributes.phone_number,
              rolesGroup: responseJson.data.attributes.roles,
            })
            this.closeInviteTeamMemberModalHandler();
          }

          if (
            apiRequestCallId === this.rolesListingApiCallId &&
            responseJson !== undefined
          ) {
            const rolesList: RoleListDataType[] = [];
            responseJson.data.map((x: any) => {
              rolesList.push({
                value: x.attributes.id,
                label: x.attributes.name,
              });
            });
            this.setState({ rolesList });
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
        }
      }
    }
    // Customizable Area End


  }

  // Customizable Area Start
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }
  // Customizable Area End

  handleEventTypeChange = (selectedOption: any) => {
    this.setState({
      selectedEventTypeOption: selectedOption,
    });
  };

  handleResourceTypeChange = (selectedOption: any) => {
    this.setState({
      selectedResourceTypeOption: selectedOption,
    });
  };

  hanldeOnChangeDate = (dates: any): any => {
    const [start, end] = dates;
    this.setState({
      startDate: start,
      endDate: end,
      showFilterCalendar: end === null || end === "",
    });
  };

  // Open Calendar popper
  onCalendarOpen = () => {
    this.setState({
      showFilterCalendar: true,
    });
  };

  logsFilterHandler = () => {
    this.setState({
      showLogsFilter: !this.state.showLogsFilter,
    });
  };

  // Trail Type useImperativeHandle(
  handleTrailType = (type: string): void => {
    this.setState({
      trailType: type,
    });
  };

  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
    });
  };

  // Open View Details Modal
  openTrailViewDetailsModalHandler = () => {
    this.getRolesList()
    this.setState({
      memberDetailsModal: true,
      currentId: ''
    });
  };

  // Close View Details Modal
  closeTrailViewDetailsModalHandler = () => {
    this.setState({
      memberDetailsModal: false,
      firstName: "",
      designation: "",
      phone: "",
      email: "",
      rolesGroup: []
    });
  };

  // open Team Member Modal
  openInviteTeamMemberModalHandler = () => {
    this.getRolesList()
    this.setState({
      memberDetailsModal: false,
      inviteMemberDetailModal: true,
    });
  };

  // Close Team Member Modal
  closeInviteTeamMemberModalHandler = () => {
    this.getTeamMember()
    this.setState({
      inviteMemberDetailModal: false,
    });
  };

  openEditTeamMemberModalHandler = () => {
    this.getRolesList()
    this.setState({
      memberDetailsModal: true,
      inviteMemberDetailModal: false,
    });
  };

  getTeamMemberbyId = (accountId: number): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.TeamMemberAPiEndPoint}/${accountId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationGetApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  updateTeamMemberbyId = (values: any): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };
    let role_id = []

    for (let i = 0; i < values?.rolesGroup.length; i++) {
      role_id.push(values?.rolesGroup[i].value)
    }

    const attrs = {
      fullname: values.firstName,
      company_name: this.state.company_name,
      address: this.state.address,
      country: this.state.country,
      teamMemberOkyd: this.state.teamMemberOkyd,
      natureOfBussiness: this.state.natureOfBussiness,
      clientTarget: this.state.clientTarget,
      role_ids: role_id || [],
      full_phone_number: values.phone
    };

    // this.setState({
    //   firstName: values.firstName,
    //   email: values.email,
    //   phone: values.phone,
    //   designation: values.designation,
    //   role_ids: values.rolesGroup,
    //   rolesGroup: values.rolesGroup,
    // })

    // const data = {
    //   // type: "email_account",
    //   user: attrs,
    // };

    const httpBody = {
      user: attrs,
    };



    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );


    this.updateTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.TeamMemberAPiEndPoint}/${this.state.currentId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationUpdateApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // this.openInviteTeamMemberModalHandler()
    return true;

  };

  deleteTeamMemberbyId = (memberDetail: any): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.TeamMemberAPiEndPoint}/${memberDetail.id || this.state.currentId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationDeleteApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  handleInviteTeamMember = (values: any): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };


    let role_id = []
    for (let i = 0; i < values?.rolesGroup.length; i++) {
      role_id.push(values?.rolesGroup[i].value)
    }

    this.setState({
      firstName: values.firstName,
      email: values.email,
      phone: values.phone,
      designation: values.designation,
      role_ids: role_id || [],
    })


    const attrs = {
      fullname: values.firstName,
      email: values.email,
      full_phone_number: values.phone,
      designation: values.designation,
      role_ids: role_id
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

    this.inviteTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.InviteTeamMemberAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationPostApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.openInviteTeamMemberModalHandler()

    return true;

  };

  handleResentInviteTeamMember = (): boolean => {
    const headers = {
      "Content-Type": configJSON.getAllMembersApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const attrs = {
      fullname: this.state.firstName,
      email: this.state.email,
      full_phone_number: this.state.phone,
      designation: this.state.designation,
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

    this.resendinviteTeamMemberApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ResendInviteTeamMemberAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationPostApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // this.openInviteTeamMemberModalHandler()
    return true;
  };

  handleEditTeamMember = (memberDetail: any): boolean => {
    this.getRolesList()

    let roleDate = []
    for (let j = 0; j < memberDetail.attributes.roles.length; j++) {
      roleDate.push({
        value: memberDetail.attributes.roles[j].id,
        label: memberDetail.attributes.roles[j].name
      })
    }

    this.setState({
      ...this.state,
      currentId: memberDetail.id,
      firstName: memberDetail?.attributes?.fullname,
      designation: memberDetail?.attributes?.designation,
      phone: memberDetail?.attributes?.full_phone_number,
      email: memberDetail?.attributes?.email,
      rolesGroup: roleDate || [],
      company_name: memberDetail?.attributes?.company_name,
      address: memberDetail?.attributes?.address,
      country: memberDetail?.attributes?.country,
      teamMemberOkyd: memberDetail?.attributes?.teamMemberOkyd,
      natureOfBussiness: memberDetail?.attributes?.natureOfBussiness,
      clientTarget: memberDetail?.attributes?.clientTarget,
      memberDetailsModal: true
    });
    return true;
  };


  // handle sorting of Name
  handleSortingName = () => {

    this.setState({
      sortName: this.state.sortName !== 'asc' ? 'asc' : 'desc'
    })


    setTimeout(() => {
      const sortedData = orderBy(this.state.getTeamMembetList, (item: any) => item.attributes.fullname.toLowerCase(), this.state.sortName);
      this.setState({
        getTeamMembetList: sortedData
      })

    }, 500);
  }

}
