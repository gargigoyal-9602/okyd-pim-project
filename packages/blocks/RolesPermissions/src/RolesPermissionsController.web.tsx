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
import { sortBy, orderBy } from "lodash"
export const configJSON = require("./config");

interface SelectOptions {
  value: string;
  label: string;
}
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  auth: string | null | undefined;
  trailType: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  userType: string;
  menuCollapsed: boolean;
  rolesData: object[];
  modulesData: object[];
  attributeData: object[];
  roleDetailsData: any;
  rolesUpdateModal: boolean;
  rolesCreateModal: boolean;
  checkbox: boolean;
  snackBar: {
    show: boolean,
    message?: string,
    type?: "success" | "info" | "warning" | "error" | undefined
  };
  loader: boolean,
  sortOrder: any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class RolesPermissionsControllerWeb extends BlockComponent<
  Props,
  S,
  SS
  > {
  auth: string | null | undefined = window.localStorage.getItem("auth");
  getRolesApiCallId: string = "";
  roleDetailsApiCallId: string = "";
  roleCreateApiCallId: string = "";
  getModulesApiCallId: string = "";
  deleteRoleApiCallId: string = "";

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
      userType: configJSON.subscriber,
      menuCollapsed: false,
      rolesData: [],
      roleDetailsData: [],
      modulesData: [],
      attributeData: [],
      rolesUpdateModal: false,
      rolesCreateModal: false,
      checkbox: false,
      snackBar: {
        show: false,
      },
      loader: false,
      sortOrder: null
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }


  async componentDidMount() {
    this.getRolesList();

  }

  // Handler for Get Roles List
  getRolesList = (): boolean => {
    const headers = {
      "Content-Type": configJSON.contentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getRolesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getRolesApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Handler for Trails of Team member
  roleDetails = (accountId: number): boolean => {
    const headers = {
      "Content-Type": configJSON.contentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.roleDetailsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getRolesApiEndPoint}/${accountId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Handler for Get Modules List
  getModulesList = (): boolean => {
    const headers = {
      "Content-Type": configJSON.contentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getModulesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getModulesApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Create Role Handler
  createRole = (values: any): boolean => {
    const headers = {
      "Content-Type": configJSON.contentType,
      token: this.auth,
    };

    const httpBody = {
      role: {
        name: values.roleName,
        module_roles_attributes: values.module_roles_attributes
      },
    };

    const apiEndPoint = values.roleId && values.roleId !== '' ? `${configJSON.getRolesApiEndPoint}/${values.roleId}` : configJSON.getRolesApiEndPoint;
    const methodType = values.roleId && values.roleId !== '' ? configJSON.httpPutType : configJSON.httpPostType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.roleCreateApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Delete role handler
  deleteRolesHandler = (accountId: number): boolean => {
    const headers = {
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteRoleApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.deleteRoleApiEndPoint}/${accountId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteType
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

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId != null) {
          // Store All Roles data
          if (
            apiRequestCallId === this.getRolesApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({ rolesData: responseJson.data });
            this.handleSortingRoleDataByName();

          }


          // Store role detaills
          if (
            apiRequestCallId === this.roleDetailsApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              roleDetailsData: responseJson.data,
              attributeData: []
            });
            // const attributeData: any = [];
            responseJson.data.attributes.module_roles.data.map((module: any) => {
              this.state.attributeData.push({
                "create_action": module.attributes.create_action,
                "update_action": module.attributes.update_action,
                "delete_action": module.attributes.delete_action,
                "view_action": module.attributes.view_action,
                "module_id": module.attributes.module_id,
                "name": module.attributes.module_name
              });
              if (module.attributes.sub_modules.data.length && module.attributes.sub_modules.data.length > 0) {
                module.attributes.sub_modules.data.map((sub_module: any) => {
                  this.state.attributeData.push({
                    "create_action": sub_module.attributes.create_action,
                    "update_action": sub_module.attributes.update_action,
                    "delete_action": sub_module.attributes.delete_action,
                    "view_action": sub_module.attributes.view_action,
                    "name": sub_module.attributes.module_name,
                    // "module_id": sub_module.attributes.module_id,
                    // "parent_id": module.attributes.module_id,
                  });
                });
              }
            });
            this.setState({ attributeData: this.state.attributeData });
          }

          // Create role
          if (apiRequestCallId === this.roleCreateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successCreateMsgText);
            this.getRolesList();
            this.closeRolesModalHandler();
          }

          // Delete role
          if (apiRequestCallId === this.deleteRoleApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', responseJson.message);
            this.getRolesList();
          }

          // Get Modules
          if (
            apiRequestCallId === this.getModulesApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              modulesData: responseJson.data,
              attributeData: []
            });
            const attributeData: any = [];
            responseJson.data.map((module: any) => {
              attributeData.push({
                "create_action": false,
                "update_action": false,
                "delete_action": false,
                "view_action": false,
                "module_id": module.attributes.id,
                "name": module.attributes.name
              });
              module.attributes.sub_modules.map((sub_module: any) => {
                attributeData.push({
                  "create_action": false,
                  "update_action": false,
                  "delete_action": false,
                  "view_action": false,
                  "name": sub_module.name,
                  "module_id": sub_module.id,
                  "parent_id": sub_module.parent_id,
                });
              });
            });
            this.setState({ attributeData });
          }
        }
      } else {
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        if (errors[0].token === 'Invalid token' || errors[0].token === 'Token has Expired') {
          AsyncStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } else if (errors[0].message) {
          this.openSnackBarHandler('error', errors[0].message);
        } else {
          if (apiRequestCallId === this.roleCreateApiCallId) {
            this.openSnackBarHandler('error', configJSON.errorCreateMsgText);
          }
        }
      }
    }
    // Customizable Area End
  }

  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
    });
  };

  // Open View Details Modal
  openUpdateRolesModalHandler = (accountId: number): void => {
    this.setState({
      loader: true,
      roleDetailsData: {},
    });
    this.roleDetails(accountId);
    setTimeout(() => {
      this.setState({
        loader: false,
        rolesCreateModal: true,
      });
    }, 500);
  };

  // Close View Details Modal
  closeUpdateRolesModalHandler = () => {
    this.setState({
      rolesCreateModal: false,
      roleDetailsData: {},
      attributeData: [],
    });
  };

  // Open View Details Modal
  openRolesModalHandler = (): void => {
    this.setState({
      loader: true,
      roleDetailsData: {},
    });
    this.getModulesList();
    setTimeout(() => {
      this.setState({
        loader: false,
        rolesCreateModal: true,
      });
    }, 500);
  };

  // Close View Details Modal
  closeRolesModalHandler = () => {
    this.setState({
      roleDetailsData: {},
      attributeData: [],
      rolesCreateModal: false
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

  // handle sorting of roleData
  handleSortingRoleDataByName = () => {
    this.setState({
      sortOrder: this.state.sortOrder !== 'asc' ? 'asc' : 'desc'
    })

    setTimeout(() => {
      const sortedData = orderBy(this.state.rolesData, (item: any) => item.attributes.name.toLowerCase(), this.state.sortOrder);
      this.setState({
        rolesData: sortedData
      })

    }, 500);



  }
  // Customizable Area End
}
