import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  trailType: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  showFilterCalendar: boolean;
  userType: string;
  menuCollapsed: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AuditTrailController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      trailType: configJSON.allLogsText,
      startDate: new Date(),
      endDate: null,
      showFilterCalendar: false,
      userType: configJSON.subscriber,
      menuCollapsed: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // Trail Type useImperativeHandle(
  handleTrailType = (type: string): void => {
    this.setState({
      trailType: type
    });
  };

  // On Date Change
  hanldeOnChangeDate = (dates: any): any => {
    const [start, end] = dates;
    this.setState({
      startDate: start,
      endDate: end,
      showFilterCalendar: end === null || end === ""
    });
  };

  // Close Calendar popper
  onCalendarClose = () => {
    this.setState({
      showFilterCalendar: false
    });
  };

  // Open Calendar popper
  onCalendarOpen = () => {
    this.setState({
      showFilterCalendar: true
    });
  };

  onMenuToggle = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed
    });
  };
  // Customizable Area End
}
