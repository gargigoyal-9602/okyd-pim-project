import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import RichTextEditor from "react-rte";
import { orderBy } from "lodash"
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
  arrayHolder: any;
  menuCollapsed: boolean;
  userType: string;
  token: string;
  displayProducts: any;
  allCheckboxStatus: any;
  addNewProductModal: any;
  addNewVariationModal: any;
  acceptedFiles: any;
  selectedFile: any;
  snackBar: {
    show: boolean;
    message?: string;
    type?: "success" | "info" | "warning" | "error" | undefined;
  };
  editor: any;
  brandData: object[];
  categoryData: object[],
  sortPricing: any,
  sortName: any,
  AddProductsSchema: any,
  NewVariationTypeSchema: any,
  productName: string,
  sku: string,
  brand: string,
  category: string,
  status: string
  variationName: string,
  variationCode: string,
  friends: any
  // Customizable Area End
}

interface SS {
  id: any;
}
interface BrandDataType {
  label: number,
  value: string
}

interface CategoryDataType {
  label: number,
  value: string
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  getProductApiCallId: any;
  getProductListingApiCallId: any;
  getBrandListingApiCallId: any;
  getCategoryListingApiCallId: any;
  putActiveStatusOfProductApiCallId: any;
  catalogueCreateApiCallId: any

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    let AddProductsSchema = {
      productName: Yup.string().required(configJSON.errorProductName),
      sku: Yup.string().required(configJSON.errorSku),
      brand: Yup.string().required(configJSON.errorBrand),
      category: Yup.string().required(configJSON.errorCategory),
      status: Yup.string().required(configJSON.errorStatus)

    }

    let NewVariationTypeSchema = {
      variationName: Yup.string().required(configJSON.errorVariationName),
      variationCode: Yup.string().required(configJSON.errorVariationCode),
      friends: Yup.array()
        .of(
          Yup.string().min(4, 'too short').required('Required'),
        )
        .required('Must have variant') // these constraints are shown if and only if inner constraints are satisfied
        .min(1, 'Minimum of 1 variant required'),

    }

    this.state = {
      allCheckboxStatus: true,
      arrayHolder: [],
      menuCollapsed: false,
      acceptedFiles: [],
      userType: configJSON.subscriber,
      token: "",
      addNewVariationModal: false,
      snackBar: {
        show: false,
      },
      addNewProductModal: false,
      selectedFile: null,
      editor: RichTextEditor.createEmptyValue(),
      displayProducts: "",
      brandData: [],
      categoryData: [],
      sortPricing: null,
      sortName: null,
      AddProductsSchema: AddProductsSchema,
      NewVariationTypeSchema: NewVariationTypeSchema,
      productName: "",
      sku: "",
      brand: "",
      category: "",
      status: "",
      variationCode: "",
      variationName: "",
      friends: []

    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  //   async componentDidMount() {
  //     super.componentDidMount();
  //     this.getToken();
  //     if (this.isPlatformWeb() === false) {
  //       this.props.navigation.addListener("willFocus", () => {
  //         this.getToken();
  //       });
  //     }
  //   }

  // Customizable Area Start

  async componentDidMount() {
    this.getProductListing();
    this.getBrandListing()
    this.getCategoryListing()
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );

        if (apiRequestCallId != null) {
          if (apiRequestCallId === this.getProductListingApiCallId) {
            this.setState({
              displayProducts: responseJson.data
            })
            this.handleSortingName()
          }
          if (apiRequestCallId === this.getBrandListingApiCallId) {
            const brandData: BrandDataType[] = [];
            responseJson.data.map((category: any) => {
              brandData.push({
                label: category.attributes.name,
                value: category.attributes.id,
              })
            })
            this.setState({ brandData });

          }

          if (apiRequestCallId === this.getCategoryListingApiCallId) {
            const categoryData: CategoryDataType[] = [];
            responseJson.data.map((category: any) => {
              categoryData.push({
                label: category.attributes.name,
                value: category.attributes.id,
              })
            })
            this.setState({ categoryData });

          }
          if (apiRequestCallId === this.putActiveStatusOfProductApiCallId) {
            this.getProductListing();
            this.getBrandListing();
            this.getCategoryListing();
          }

          //create catalogue
          if (apiRequestCallId === this.catalogueCreateApiCallId) {
            console.log(responseJson, "create api res")
          }

        }
      }
      else {
        const errors = responseJson.errors;
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);

        if (errors[0].token === 'Invalid token' || errors[0].token === 'Token has Expired') {
          // @ts-ignore
          localStorage.setItem("auth", "");
          //@ts-ignore
          this.props?.history.push("/login");
        } else if (errors[0].message) {
          this.openSnackBarHandler('error', errors[0].message);
        }
      }
    }
  }

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


  // Handler Product Listing
  getProductListing = (): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProductListingApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productListApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  ///getBrands api

  getBrandListing = (): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBrandListingApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.brandListApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  ///get category api

  getCategoryListing = (): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCategoryListingApiCallId = requestMessage.messageId;


    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryListApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //// handle active status
  handleActiveStatusOfProduct = (value: any, id: any): boolean => {

    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: window.localStorage.getItem("auth"),
    };

    // const attrs = values;

    // const data = {
    //   type: this.state.email,
    //   attributes: attrs,
    // };
    const httpBody = {
      active: value,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const endPointApi = configJSON.putActiveStatusEndPointAPi + id

    this.putActiveStatusOfProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPointApi
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
      configJSON.apiMethodTypePut
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  // Create Category Handler
  createCategory = (values: any): boolean => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: window.localStorage.getItem("auth"),

    };
    console.log(values, "value")
    var formData = new FormData();


    formData.append('name', values.productName)
    formData.append('description', values.description)
    formData.append('category', values.category)
    formData.append('sku', values.sku)
    formData.append('active', values.active)
    formData.append('brand', values.brand)


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.catalogueCreateApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.catalogueCreateEndPointApi);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(formData));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };



  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleCheckBox = (index: any, value: any) => {
    let arr = Object.assign([], this.state.displayProducts, {
      [index]: {
        ...this.state.displayProducts[index],
        checkboxStatus: value,
      },
    });

    // let link;
    // this.state.displayProducts.includes();
    this.setState({
      ...this.state,
      displayProducts: arr,
    });

  };

  handleToggle = (index: any, value: any) => {
    let arr = Object.assign([], this.state.displayProducts, {
      [index]: {
        ...this.state.displayProducts[index],
        activeStatus: value,
      },
    });

    this.setState({
      ...this.state,
      displayProducts: arr,
    });

    this.handleActiveStatusOfProduct(value, this.state.displayProducts[index].id)
  };

  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
      // {this.handleToggle(index,e.)}
    });
  };

  handleToggleAddProductModal = () => {
    this.setState({
      ...this.state,
      addNewProductModal: !this.state.addNewProductModal,
    });
  };

  handleToggleAddVariationModal = () => {
    this.setState({
      ...this.state,
      addNewVariationModal: !this.state.addNewVariationModal,
    });
  };

  handleImageUpload = (event: any) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = (e: any) => {
      this.setState({
        selectedFile: [reader.result],
      });
    };

    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  handleOnDrop = (file: any) => {
    this.setState({
      acceptedFiles: this.state.acceptedFiles.concat(file),
    });
  };


  // handle sorting of roleData
  handleSortingName = () => {

    this.setState({
      sortName: this.state.sortName !== 'asc' ? 'asc' : 'desc'
    })


    setTimeout(() => {
      const sortedData = orderBy(this.state.displayProducts, (item: any) => item.attributes.name.toLowerCase(), this.state.sortName);
      this.setState({
        displayProducts: sortedData
      })

    }, 500);
  }



  // handle sorting of Data
  handleSortingPricing = () => {

    this.setState({
      sortPricing: this.state.sortPricing !== 'asc' ? 'asc' : 'desc'
    })


    setTimeout(() => {
      const sortedData = orderBy(this.state.displayProducts, (item: any) => item.attributes.price, this.state.sortPricing);
      this.setState({
        displayProducts: sortedData
      })

    }, 500);

  }
  // Customizable Area Start
  // Customizable Area End
}
