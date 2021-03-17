import { AsyncStorage } from "react-native";
import RichTextEditor from 'react-rte';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { orderBy } from "lodash"


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
  match: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  auth: string | null | undefined;
  userType: string;
  menuCollapsed: boolean;
  categoryData: object[];
  modulesData: object[];
  categoryDetailsData: any;
  rolesUpdateModal: boolean;
  checkbox: boolean;
  snackBar: {
    show: boolean,
    message?: string,
    type?: "success" | "info" | "warning" | "error" | undefined
  };
  loader: boolean,
  selectedFile: any,
  editor: any,
  sortDiscount: any,
  sortName: any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CategoriessubcategoriesController extends BlockComponent<
  Props,
  S,
  SS
  > {
  auth: string | null | undefined = window.localStorage.getItem("auth");
  getCategoryApiCallId: string = "";
  categoryDetailsApiCallId: string = "";
  categoryCreateApiCallId: string = "";
  categoryUpdateApiCallId: string = "";
  deleteCategoryApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      auth: "",
      userType: configJSON.subscriber,
      menuCollapsed: false,
      categoryData: [],
      categoryDetailsData: [],
      modulesData: [],
      rolesUpdateModal: false,
      checkbox: false,
      snackBar: {
        show: false,
      },
      loader: false,
      selectedFile: null,
      editor: RichTextEditor.createEmptyValue(),
      sortDiscount: null,
      sortName: null
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getCategoryList();
  }

  // Handler for Get Catrgory List
  getCategoryList = (): boolean => {
    this.setState({ loader: true });
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCategoryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryAPIEndPoint
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

  // Handler for get category details
  categoryDetails = (accountId: number): boolean => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.categoryDetailsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.categoryAPIEndPoint}/${accountId}`
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

  // Create Category Handler
  createCategory = (values: any): boolean => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };
    const httpBody = {
      categories: [{ ...values }],
    };
    const apiEndPoint = configJSON.categoryAPIEndPoint;
    const methodType = configJSON.httpPostType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.categoryCreateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Update Category Handler
  updateCategory = (values: any): boolean => {
    const { categoryId, ...restValues } = values;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };
    const httpBody = {
      category: { ...restValues },
    };
    const apiEndPoint = `${configJSON.categoryAPIEndPoint}/${values.categoryId}`;
    const methodType = configJSON.httpPutType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.categoryUpdateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Delete Category handler
  deleteCategoryHandler = (accountId: number): boolean => {
    const headers = {
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteCategoryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.categoryAPIEndPoint}/${accountId}`
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

  // Update Active Status
  updateActiveStatus = (catId: number, active: boolean) => {
    this.categoryDetails(catId);
    setTimeout(() => {
      const catDetails = this.state.categoryDetailsData;
      const values = {
        categoryId: catId,
        name: catDetails?.attributes?.name,
        description: catDetails?.attributes?.description,
        discount: catDetails?.attributes?.discount,
        active: active,
        private: catDetails?.attributes?.private,
        default_category: catDetails?.attributes?.default_category,
        meta_title: catDetails?.attributes?.meta_title,
        meta_description: catDetails?.attributes?.meta_description
      };
      this.updateCategory(values);
      setTimeout(() => {
        this.getCategoryList();
      }, 1000);
    }, 1000);
  };

  handleImageUpload = (event: any) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = (e: any) => {
      this.setState({ selectedFile: [reader.result] });
    };

    this.setState({
      selectedFile: event.target.files[0],
    });
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
          // Store All Category data
          if (
            apiRequestCallId === this.getCategoryApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              categoryData: responseJson.data,
              loader: false
            });
            this.handleSortingName()
          }


          // Store category detaills
          if (
            apiRequestCallId === this.categoryDetailsApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              categoryDetailsData: responseJson.data,
              editor: RichTextEditor.createValueFromString(responseJson.data.attributes?.description, 'html')
            });
          }

          // Create Category
          if (apiRequestCallId === this.categoryCreateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successCreateMsgText);
            setTimeout(() => {
              //@ts-ignore
              this.props.history.push('/categories');
            }, 1000);
          }

          // Update Category
          if (apiRequestCallId === this.categoryUpdateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successUpdateMsgText);
            setTimeout(() => {
              //@ts-ignore
              this.props.history.push('/categories');
            }, 1000);
          }

          // Delete Category
          if (apiRequestCallId === this.deleteCategoryApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.deleteCategoryMsgText);
            this.getCategoryList();
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
          if (apiRequestCallId === this.categoryCreateApiCallId) {
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
  handleSortingName = () => {

    this.setState({
      sortName: this.state.sortName !== 'asc' ? 'asc' : 'desc'
    })


    setTimeout(() => {
      const sortedData = orderBy(this.state.categoryData, (item: any) => item.attributes.name.toLowerCase(), this.state.sortName);
      this.setState({
        categoryData: sortedData
      })

    }, 500);
  }

  // handle sorting of roleData
  handleSortingDiscount = () => {

    this.setState({
      sortDiscount: this.state.sortDiscount !== 'asc' ? 'asc' : 'desc'
    })


    setTimeout(() => {
      const sortedData = orderBy(this.state.categoryData, (item: any) => item.attributes.discount, this.state.sortDiscount);
      this.setState({
        categoryData: sortedData
      })

    }, 500);

  }// Customizable Area End
}
