
import { Message } from "../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

import PostCreationCommonController from './PostCreationCommonController'
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export default class PostCreationController extends PostCreationCommonController {
  // Customizable Area Start
  // Customizable Area End

  async componentDidMount() {
    var authTokenReq = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(authTokenReq);
    this.showAlert("ERROR", "PostCreationController::componentDidMount::Web:L:WIP")
  }

 // Customizable Area Start
  // Customizable Area End
}
