import { AsyncStorage } from "react-native";
import RichTextEditor from 'react-rte';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import {orderBy} from "lodash"

// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./brands.config");

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
  brandsData: object[];
  modulesData: object[];
  brandDetailsData: any;
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
  sortDiscount:any,
  sortName: any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class BrandsController extends BlockComponent<
  Props,
  S,
  SS
> {
  auth: string | null | undefined = window.localStorage.getItem("auth");
  getBrandApiCallId: string = "";
  brandDetailsApiCallId: string = "";
  brandCreateApiCallId: string = "";
  brandUpdateApiCallId: string = "";
  deleteBrandApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      auth: "",
      userType: configJSON.subscriber,
      menuCollapsed: false,
      brandsData: [],
      brandDetailsData: [],
      modulesData: [],
      rolesUpdateModal: false,
      checkbox: false,
      snackBar: {
        show: false,
      },
      loader: false,
      selectedFile: null,
      editor: RichTextEditor.createEmptyValue(),
      sortDiscount:null,
      sortName:null
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getBrandList();
  }

  // Handler for Get Catrgory List
  getBrandList = (): boolean => {
    this.setState({
      loader: true
    });

    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBrandApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPoint
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

  // Handler for Brand Details
  brandDetails = (accountId: number): boolean => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.brandDetailsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.apiEndPoint}/${accountId}`
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

  // Create Brand Handler
  createBrand = (values: any): boolean => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };
    const httpBody = values;
    const apiEndPoint = configJSON.apiEndPoint;
    const methodType = configJSON.httpPostType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.brandCreateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Update Brand Handler
  updateBrand = (values: any): boolean => {
    const {brandId, ...restValues}  = values;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };
    const httpBody = {
      brand: {...restValues},
    };
    const apiEndPoint = `${configJSON.apiEndPoint}/${values.brandId}`;
    const methodType = configJSON.httpPutType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.brandUpdateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Delete Brand handler
  deleteBrandHandler = (accountId: number): boolean => {
    const headers = {
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteBrandApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.apiEndPoint}/${accountId}`
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

  // Update Brand Active Status
  updateActiveStatus = (brandId: number, active: boolean) => {
    this.brandDetails(brandId);
    setTimeout(() => {
      const brandDetails = this.state.brandDetailsData;
      const values = {
        brandId: brandId,
        name: brandDetails?.attributes?.name,
        description: brandDetails?.attributes?.description,
        discount: brandDetails?.attributes?.discount,
        active: active,
        private: brandDetails?.attributes?.private,
        meta_title: brandDetails?.attributes?.meta_title,
        meta_description: brandDetails?.attributes?.meta_description
      };
      this.updateBrand(values);
      setTimeout(() => {
        this.getBrandList();
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
          // Store All Brands data
          if (
            apiRequestCallId === this.getBrandApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({ 
              brandsData: responseJson.data,
              loader: false
            });
            this.handleSortingName()
          }

          // Store Brand detaills
          if (
            apiRequestCallId === this.brandDetailsApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              brandDetailsData: responseJson.data,
              editor:  RichTextEditor.createValueFromString(responseJson.data.attributes?.description, 'html')
            });
          }

          // Create Brand
          if (apiRequestCallId === this.brandCreateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successCreateMsgText);
            setTimeout(() => {
              //@ts-ignore
              this.props.history.push('/brands');
            }, 1000);
          }

          // Update Brand
          if (apiRequestCallId === this.brandUpdateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successUpdateMsgText);
            setTimeout(() => {
              //@ts-ignore
              this.props.history.push('/brands');
            }, 1000);
          }

          // Delete Brand
          if (apiRequestCallId === this.deleteBrandApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.deleteBrandMsgText);
            this.getBrandList();
          }
        }
      } else {
        const errors = responseJson.errors;
        this.parseApiCatchErrorResponse(errorReponse);

        if(errors[0].token === 'Invalid token' ||errors[0].token ===  'Token has Expired') {
          AsyncStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } else if(errors[0].message) {
          this.openSnackBarHandler('error', errors[0].message);
        } else {
          if (apiRequestCallId === this.brandCreateApiCallId) {
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
  openSnackBarHandler = (type: "success" | "info" | "warning" | "error" | undefined,  message: string): void => {
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

  // handle sorting of roleData
handleSortingName =()=>{
   
  this.setState({
    sortName :this.state.sortName !== 'asc' ? 'asc' : 'desc'
  })

  
  setTimeout(() => {
    const sortedData = orderBy(this.state.brandsData, (item:any)=> item.attributes.name.toLowerCase(), this.state.sortName);
  this.setState({
    brandsData :sortedData 
  })
    
  }, 500);
}

  // handle sorting of roleData
  handleSortingDiscount =()=>{
   
    this.setState({
      sortDiscount :this.state.sortDiscount !== 'asc' ? 'asc' : 'desc'
    })

    
    setTimeout(() => {
      const sortedData = orderBy(this.state.brandsData, (item:any)=> item.attributes.discount, this.state.sortDiscount);
    this.setState({
      brandsData :sortedData 
    })
      
    }, 500);

  }
  // Customizable Area End
}
