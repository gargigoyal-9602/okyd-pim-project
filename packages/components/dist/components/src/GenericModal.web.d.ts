import React from "react";
declare type PropTypes = {
    children: React.ReactElement | React.ReactElement[];
    onClose: () => void;
    visible: boolean;
    modalStyles?: string;
    bodyStyles?: string;
};
declare const Modal: React.FC<PropTypes>;
export default Modal;
