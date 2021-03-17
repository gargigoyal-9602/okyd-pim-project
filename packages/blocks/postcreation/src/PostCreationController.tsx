import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";


import PostCreationCommonController from './PostCreationCommonController'

// Customizable Area Start
import ImagePicker from "react-native-image-crop-picker";
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

export default class PostCreationController extends PostCreationCommonController {
  // Customizable Area Start
  // Customizable Area End

  async componentDidMount() {
    // Customizable Area Start
    var authTokenReq = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(authTokenReq);
    let { params } = this.props.navigation.state;
   
    if (params && params.item) {
      this.setState({
        name: params.item.data.attributes.name,
        description: params.item.data.attributes.description,
        price: params.item.data.attributes.price.toString(),
        currency: "$",
        category_id: params.item.data.attributes.category.data.attributes.id,
        id: params.item.data.attributes.id,
        profileImageData: {
          data: params.item.data.attributes.product_image,
          content_type: "image/jpeg",
          filename: "image.jpeg"
        },
        image: ""
      });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  chooseImage = () => {

    const options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
      compressImageQuality: 0.3,
      includeBase64: true,
      cropping: true
    }).then(async (image:any) => {
      let filename = image.path.substring(
        image.path.lastIndexOf("/") + 1,
        image.path.length
      );
      this.setState({
        image: image.sourceURL,
        profileImageData: {
          data: image.data,
          filename: filename,
          content_type: image.mime
        }
      });
    });
  };
  // Customizable Area End
}
