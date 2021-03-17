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

export const configJSON = require("./subCategories.config");

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
  subCategoryData: object[];
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
  sortDiscount:any,
  sortName: any
  // Customizable Area End
}

interface SS {
  id: any;
}

interface CategoryDataType {
  id: number,
  name: string
}

export default class SubCategoriesController extends BlockComponent<
  Props,
  S,
  SS
> {
  auth: string | null | undefined = window.localStorage.getItem("auth");
  getCategoryApiCallId: string = "";
  getSubCategoryApiCallId: string = "";
  subCategoryDetailsApiCallId: string = "";
  subCategoryCreateApiCallId: string = "";
  subCategoryUpdateApiCallId: string = "";
  deleteSubCategoryApiCallId: string = "";

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
      subCategoryData: [],
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
      sortDiscount:null,
      sortName:null
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getSubCategoryList();
    this.getCategoryList();
  }

  // Handler for Get Catrgory List
  getCategoryList = (): boolean => {
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

  // Handler for Get Catrgory List
  getSubCategoryList = (): boolean => {
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

    this.getSubCategoryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.subCategoryAPIEndPoint
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

  // Handler for sub category details
  categoryDetails = (subCatId: number): boolean => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.subCategoryDetailsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.subCategoryAPIEndPoint}/${subCatId}`
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

  // Create Sub Category Handler
  createSubCategory = (values: any): boolean => {
    const {categoryId, parent_categories, ...restValues}  = values;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };
    const httpBody = {
      sub_category: {...restValues},
      parent_categories: parent_categories.id
    };
    const apiEndPoint = configJSON.subCategoryAPIEndPoint;
    const methodType = configJSON.httpPostType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.subCategoryCreateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Update Category Handler
  updateSubCategory = (values: any): boolean => {
    const {subCategoryId, parent_categories,  ...restValues}  = values;
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: this.auth,
    };
    const httpBody = {
      sub_category: {...restValues},
      parent_categories: parent_categories.id
    };
    const apiEndPoint = `${configJSON.subCategoryAPIEndPoint}/${values.subCategoryId}`;
    const methodType = configJSON.httpPutType;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.subCategoryUpdateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), apiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), methodType);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // Delete Category handler
  deleteSubCategoryHandler = (subCatId: number): boolean => {
    const headers = {
      token: this.auth,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteSubCategoryApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.subCategoryAPIEndPoint}/${subCatId}`
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
  updateActiveStatus = (subCatId: number, active: boolean) => {
    this.categoryDetails(subCatId);
    setTimeout(() => {
      const catDetails = this.state.categoryDetailsData;
      const values = {
        subCategoryId: subCatId,
        name: catDetails?.attributes?.name,
        description: catDetails?.attributes?.description,
        discount: catDetails?.attributes?.discount,
        active: active,
        private: catDetails?.attributes?.private,
        default_category: catDetails?.attributes?.default_category,
        meta_title: catDetails?.attributes?.meta_title,
        meta_description: catDetails?.attributes?.meta_description,
        parent_categories: catDetails?.attributes?.categories.length > 0 ? catDetails?.attributes?.categories[0].id : [],
      };
      this.updateSubCategory(values);
      setTimeout(() => {
        this.getSubCategoryList();
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
            const categoryData: CategoryDataType[] = [];
            responseJson.data.map((category: any) => {
              categoryData.push({
                id: category.attributes.id,
                name: category.attributes.name,
              })
            })
            this.setState({ categoryData });
          }

          // Store All sub Category data
          if (
            apiRequestCallId === this.getSubCategoryApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              subCategoryData: responseJson.data,
              loader: false
            });
            this.handleSortingName()
          }

          // Store sub category details
          if (
            apiRequestCallId === this.subCategoryDetailsApiCallId &&
            responseJson !== undefined
          ) {
            this.setState({
              categoryDetailsData: responseJson.data,
              editor:  RichTextEditor.createValueFromString(responseJson.data.attributes?.description, 'html')
            });
          }

          // Create Sub Category
          if (apiRequestCallId === this.subCategoryCreateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successCreateMsgText);
            setTimeout(() => {
              //@ts-ignore
              this.props.history.push('/sub-categories');
            }, 1000);
          }

          // Update Sub Category
          if (apiRequestCallId === this.subCategoryUpdateApiCallId && responseJson !== undefined) {
            this.openSnackBarHandler('success', configJSON.successUpdateMsgText);
            setTimeout(() => {
              //@ts-ignore
              this.props.history.push('/sub-categories');
            }, 1000);
          }

          // Delete Sub Category
          if (apiRequestCallId === this.deleteSubCategoryApiCallId && responseJson !== undefined) {
            if(!responseJson.error) {
              this.openSnackBarHandler('success', configJSON.deleteCategoryMsgText);
              setTimeout(() => {
                this.getSubCategoryList();
              }, 500);
            } else {
              this.openSnackBarHandler('error', responseJson.error.message);
            }
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
          if (apiRequestCallId === this.subCategoryCreateApiCallId) {
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
    const sortedData = orderBy(this.state.subCategoryData, (item:any)=> item.attributes.name.toLowerCase(), this.state.sortName);
  this.setState({
    subCategoryData :sortedData 
  })
    
  }, 500);
}

  // handle sorting of roleData
  handleSortingDiscount =()=>{
   
    this.setState({
      sortDiscount :this.state.sortDiscount !== 'asc' ? 'asc' : 'desc',
     
    })

    
    setTimeout(() => {
      const sortedData = orderBy(this.state.subCategoryData, (item:any)=> item.attributes.discount, this.state.sortDiscount);
    this.setState({
      subCategoryData :sortedData 
    })
      
    }, 500);

  }
  // Customizable Area End
}
