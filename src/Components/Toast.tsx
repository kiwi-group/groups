import React from 'react'
import "../Styling/General/Toast.css"

type ToastProps = {
    imageSrc: string;
    autoHide: boolean;
  };
  
  export const Toast: React.FC<ToastProps> = ({ imageSrc, autoHide }) => (
    <div className={`toast-container ${autoHide ? 'auto-hide' : ''}`}>
      <img className="toast-image" src={imageSrc} alt="Toast" />
    </div>
  );
  