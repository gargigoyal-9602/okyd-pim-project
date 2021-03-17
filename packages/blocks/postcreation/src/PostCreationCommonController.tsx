import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Alert } from "react-native";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  PostData: any;
  token: string;
  name: string;
  description: string;
  price: any;
  currency: string;
  category_id: string;
  image: any;
  uploadedImages: any;
  AllCategory: any;
  id: any;
  refresh: boolean;
  file: any;
  profileImageData: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PostCreationCommonController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiPostItemCallId: string = "";
  apiGetCategoryCallID: string = "";
  PostApiCallId: string = "";
  DeleteApiCallId: any;
  addpostApiCallId: any;
  updatePostApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      token: "",
      PostData: [],
      name: "",
      description: "",
      price: "",
      currency: "$",
      category_id: "",
      image: "",
      id: "",
      uploadedImages: [],
      AllCategory: "",
      file: "",
      refresh: false,
      profileImageData: {}
    };
    // Customizable Area End
    console.disableYellowBox = true;
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    var authTokenReq = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(authTokenReq);
    this.showAlert("ERROR", "PostCreationController::componentDidMount::Web:L:WIP")
    // let { params } = this.props.navigation.state;
    // console.log(
    //   params.item.data,
    //   params.item.data,
    //   "+++++++++++===================price"
    // );

    // if (params && params.item) {
    //   this.setState({
    //     name: params.item.data.attributes.name,
    //     description: params.item.data.attributes.description,
    //     price: params.item.data.attributes.price.toString(),
    //     currency: "$",
    //     category_id: params.item.data.attributes.category.data.attributes.id,
    //     id: params.item.data.attributes.id,
    //     profileImageData: {
    //       data: params.item.data.attributes.product_image,
    //       content_type: "image/jpeg",
    //       filename: "image.jpeg"
    //     },
    //     image: ""
    //   });
    // }
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      //runEngine.debugLog("Message Recived", message);
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token }, () => {
        this.getPostData();
      });
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);
      if (responseJson && responseJson.errors) {
        this.setState({ refresh: false });
        this.parseApiErrorResponse(responseJson.errors);
        this.parseApiCatchErrorResponse(responseJson.errors);
      } else if (responseJson) {
        if (apiRequestCallId === this.apiPostItemCallId) {
          this.setState({ PostData: responseJson, refresh: false });
        } else if (apiRequestCallId === this.addpostApiCallId) {
          this.setState({ refresh: true });
          this.props.navigation.state.params.callback();
          this.props.navigation.goBack();
        } else if (apiRequestCallId === this.apiGetCategoryCallID) {
          this.setState({ AllCategory: responseJson }, () =>
            this.props.navigation.navigate("PostCreation", {
              data: this.state.AllCategory,
              callback: () => this.getPostData()
            })
          );
        } else if (apiRequestCallId === this.updatePostApiCallId) {
          this.setState({ refresh: true });
          this.getPostData();
          this.props.navigation.state.params.callback();
          this.props.navigation.goBack();
        } else if (apiRequestCallId === this.DeleteApiCallId) {
          this.getPostData();
        }
      } else if (apiRequestCallId === this.DeleteApiCallId) {
        this.getPostData();
      }
      else if (errorReponse) {
        this.setState({ refresh: false });
        this.parseApiErrorResponse(errorReponse);
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
  }

  createPostCreation() {
    if (
      this.state.category_id === "" ||
      this.state.description === "" ||
      this.state.name === "" ||
      this.state.price === ""
    ) {
      this.showAlert("Error", "Please enter all mandatory fields");
    } else {
      this.AddPostCreation();
    }
  }

  editNavigation = (item: any) => {
    this.getAllCategory();
    if ( this.props.navigation.navigate ) {
      this.props.navigation.navigate("PostCreation", { item: item });
    }
  };

  navigateToDetails = (item: any) => {
    if ( this.props.navigation.navigate ) {
      this.props.navigation.navigate("PostDetails", (item = { item }));
    }
  };

  AddPostCreation(): boolean {
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };

    const attrs = {
      data: {
        attributes: {
          name: this.state.name,
          description: this.state.description,
          price: this.state.price,
          currency: "$",
          category_id: this.state.category_id,
          image: this.state.profileImageData
        }
      }
    };
    // const data = {
    //   attributes: attrs,
    // };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addpostApiCallId = requestMessage.messageId;
    // const httpBody = {
    //   data: data,
    // };

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(attrs)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    console.log(attrs, "attrsattrsattrsattrsattrs");
    return true;
  }

  getAllCategory() {
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log("requestMessage, ", requestMessage);

    this.apiGetCategoryCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllCatergoryEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostApiMethodType
    );
    //console.log('requestMessage@, ',requestMessage);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getPostData(): boolean {
    console.log("getPostToken ", this.state.token);
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    console.log("header  ", JSON.stringify(header));

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log("requestMessage, ", requestMessage);

    this.apiPostItemCallId = requestMessage.messageId;
    console.log(
      "requestMessage, ",
      getName(MessageEnum.RestAPIResponceEndPointMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PostApiMethodType
    );
    //console.log('requestMessage@, ',requestMessage);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  updateCreatePostData(Id: any) {
    if (
      this.state.category_id === "" ||
      this.state.description === "" ||
      this.state.name === "" ||
      this.state.price === ""
    ) {
      this.showAlert("Error", "Please enter all mandatory fields")
      return false;
    } else {
      const header = {
        "Content-Type": configJSON.postContentType,
        token: this.state.token
      };
      const attrs = {
        data: {
          attributes: {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            currency: "$",
            category_id: this.state.category_id,
            image: this.state.profileImageData
          }
        }
      };
      // const data = {
      //   attributes: attrs,
      // };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.updatePostApiCallId = requestMessage.messageId;
      // const httpBody = {
      //   data: data,
      // };
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.postGetUrl + "/" + `${Id}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(attrs)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.patchPostAPiMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  }

  deleteRecord(Id: any) {
    Alert.alert(
      "Warning",
      "Are you sure for delete this post?",
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            this.setState({ refresh: true });
            this.delete(Id);
          }
        }
      ],
      { cancelable: false }
    );
  }

  delete(Id: any) {
    this.setState({ refresh: true });
    const header = {
      "Content-Type": configJSON.postContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.DeleteApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postGetUrl + "/" + `${Id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deletePostAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.getPostData();
    return true;
  }

  txtInputProductNameProps = {
    onChangeText: (text: string) => {
      this.setState({ name: text });
      //@ts-ignore
      this.txtInputProductNameProps.value = text;
    }
  };

  txtInputProductDiscripationProps = {
    onChangeText: (text: string) => {
      this.setState({ description: text });
      //@ts-ignore
      this.txtInputProductDiscripationProps.value = text;
    }
  };

  ImageData = {
    onChangeText: (text: string) => {
      this.setState({ image: text });
      //@ts-ignore
      this.ImageData.value = text;
    }
  };

  DropDownProps = {
    onChangeText: (text: string) => {
      this.setState({ category_id: text });
      //@ts-ignore
      this.DropDownProps.value = text;
    }
  };

  txtInputProductPriceProps = {
    onChangeText: (text: string) => {
      this.setState({ price: text });
      //@ts-ignore
      this.txtInputProductPriceProps.value = text;
    }
  };

  chooseImage = () => {
    this.showAlert("Error", "Image Picker Not Implemented")  
  };

  valueExtractor1 = (val: { data: { attributes: { id: any } } }): any => {
    return val.data.attributes.id;
  };

  onValueHanndler = (val: { data: { attributes: { name: any } } }): any => {
    return val.data.attributes.name;
  };
  // Customizable Area End
}
