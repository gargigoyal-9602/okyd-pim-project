import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    trailType: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    showFilterCalendar: boolean;
    userType: string;
    menuCollapsed: boolean;
}
interface SS {
    id: any;
}
export default class AuditTrailController extends BlockComponent<Props, S, SS> {
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    txtInputWebProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    btnShowHideProps: {
        onPress: () => void;
    };
    btnShowHideImageProps: {
        source: any;
    };
    btnExampleProps: {
        onPress: () => void;
    };
    doButtonPressed(): void;
    handleTrailType: (type: string) => void;
    hanldeOnChangeDate: (dates: any) => any;
    onCalendarClose: () => void;
    onCalendarOpen: () => void;
    onMenuToggle: () => void;
}
export {};
