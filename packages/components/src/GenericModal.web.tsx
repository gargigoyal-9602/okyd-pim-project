import React, { useEffect } from "react";

type PropTypes = {
  children: React.ReactElement | React.ReactElement[];
  onClose: () => void;
  visible: boolean;
  modalStyles?: string;
  bodyStyles?: string;
};

const Modal: React.FC<PropTypes> = (props: PropTypes) => {
  const { children, onClose, visible, modalStyles, bodyStyles } = props;

  // register for keypress event
  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      const { keyCode } = e;
      if (keyCode !== 27) return;
      onClose();
    };

    // add evennt bindings
    document.addEventListener("keyup", listener, false);

    // clear event bindings
    return (): void => {
      document.removeEventListener("keyup", listener, false);
    };
  }, []);

  return (
    <>
      {visible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div
            className={`flex items-center justify-center min-h-screen p-0 ${modalStyles}`}
          >
            {/* Modal Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-secondary-base opacity-40" />
            </div>
            {/* Modal Body */}
            <div
              className={`bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full px-8 py-6 ${bodyStyles}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  visible: false,
  modalStyles: "",
  bodyStyles: "",
};

export default Modal;
