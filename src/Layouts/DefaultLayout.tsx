import React from 'react';
import { Outlet } from 'react-router-dom';
import '../Styling/Layouts/DefaultLayout.css';
import '../Styling/General/Buttons/IconButton.css';
import '../Styling/General/Buttons/TextButton.css';
import '../Styling/General/Buttons/KivoButton.css';
import kivo from "../Images/kivo.png"
import x from "../Images/x.png"

const DefaultLayout: React.FunctionComponent = () => {
    return(
        <div className="DL-container">
            <div className="DL-top-bar-container">
                <button id="logo-button" className="icon-button">
                    <img className="DL-logo-image" src={kivo} alt="Kivo Logo" />
                </button>
            </div>

            <Outlet />

            <div className="DL-footer-container">
                <label className="DL-kivo-copyright-label">KIVO FINANCE 2023</label>

                <a id="x-logo-button" href="https://twitter.com/kivofinance" target="_blank" rel="noopener noreferrer">
                    <img className="DL-x-logo-image" src={x} alt="X" />
                </a>
            </div>
        </div>
    );
}

export default DefaultLayout;
