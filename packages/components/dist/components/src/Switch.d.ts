declare type Props = {
    label?: string;
    name: string;
    onChange: (e: any) => void;
    checked?: boolean;
};
declare const SwitchWithOutLabel: (props: Props) => JSX.Element;
export default SwitchWithOutLabel;
