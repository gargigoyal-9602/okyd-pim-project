import { FunctionComponent, ElementType } from "react";
import { GestureResponderEvent } from "react-native";
interface Props {
    onPress: (e: GestureResponderEvent) => void;
    children: ElementType | string;
    isSelected: boolean;
    testID: string;
}
declare const GenericSelectionButton: FunctionComponent<Props>;
export default GenericSelectionButton;
