import React from 'react'
import "../Styling/Pages/Signup.css"
import x from '../Images/xlogo.png'
import kiwi from '../Images/white-kiwi.png'
import { getAdditionalUserInfo, getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { UseContext } from '../Context';

const Signup: React.FunctionComponent = () => {

    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    const navigate = useNavigate();
    const { loadProfile } = UseContext();

    const LinkTwitter = async () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const info = getAdditionalUserInfo(result);

            navigate(`/group/${info!.username}`)
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="X-container">
                <div className="X-upper-container">
                <div className="X-header-wrap">
                    <label className="X-header">Reserve your Kivo Group.</label>
                </div>

                <div className="X-sub-wrap">
                    <label className="X-sub">We're opening up our beta for crypto friends. First come, first serve.</label>
                </div>

                <button className="X-link-button" onClick={() => LinkTwitter()}>
                    <img className="X-logo" src={x} alt="Button Text" />
                </button>
                </div>

                <div className="X-lower-container">
                <div className="kiwi-wrap">
                    <img className="kiwi" src={kiwi} alt="Kiwi Logo" />
                </div>
                </div>
            </div>
        </>
    )
}

export default Signup;