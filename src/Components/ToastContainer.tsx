import React, { useState } from "react";
import { Toast } from "./Toast";

export const ToastContainer = React.forwardRef((_, ref) => {
  const [toastState, setToastState] = useState({
    showToast: false,
    imageSrc: "",
    autoHide: true,
  });

  React.useImperativeHandle(ref, () => ({
    addToast(imageSrc: string, autoHide: boolean) {
      setToastState({ showToast: true, imageSrc, autoHide });

      if (autoHide) {
        setTimeout(() => {
          setToastState({ showToast: false, imageSrc: "", autoHide: true });
        }, 3000);
      }
    },
    removeToast() {
      setToastState({ showToast: false, imageSrc: "", autoHide: true });
    }
  }));

  return toastState.showToast ? <Toast imageSrc={toastState.imageSrc} autoHide={toastState.autoHide} /> : null;
});
