import React, { useState, useEffect,  useRef } from 'react'
import "../Styling/Pages/KYN-mint.css"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UseContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from '../Components/ToastContainer';
import back from "../Images/back1.png"
import "../Styling/General/Buttons/KivoButton.css"
import success from "../Images/successToast.png"
import duplicate from '../Images/duplicateFailToast.png'
import fail from '../Images/genericFailToast.png'

const KYNmint: React.FunctionComponent = () => {
    const [imageurl, setimageurl] = useState('');
    const [username, setusername] = useState('');
    const [wallet, setWallet] = useState('');
    const [groupsReady, setGroupsReady] = useState(false);
    const [submissionEnabled, setSubmissionEnabled] = useState(false);

    const toastRef = useRef<{ addToast: (toast: string, autoHide: boolean) => void }>(null);

    const { groups } = UseContext();
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (groups) {
            setGroupsReady(true);
        }
    }, [groups]);

    const lastGroup = () => {
        if (groups) {
            navigate(`/group/${groups[groups.length - 1]}`)
        }
    }

    const submit = async () => {
        try {
            setWallet('');

        } catch (error) {
            console.error("Error submitting: ", error)
        }
    }

    const successToast = () => {
        if (toastRef.current) {
            toastRef.current.addToast(success, true);
        }
    }

    const failToast = () => {
        if (toastRef.current) {
            toastRef.current.addToast(fail, true);
        }
    }

    const duplicateToast = () => {
        if (toastRef.current) {
            toastRef.current.addToast(duplicate, true);
        }
    }

    return (
        <>
        <ToastContainer ref={toastRef} />

        <div id="kyn-mint-page">

                <div className='airdrop-flex-container'>
                    <div className="airdrop-profile-picture-wrap">
                        <img className="airdrop-profile-picture-img" src={imageurl} alt="profile" />
                    </div>
                    
                    <div className="username-wrap">
                        <label className="airdrop-username-text">@{username}</label>
                    </div>

                </div>

                {groupsReady && (
                    <div className='airdrop-left-arrow'>
                        <img className='airdrop-left-arrow-img' src={back} onClick={lastGroup}/>
                    </div>
                )}

                <div className="submit-wallet-input-wrap">
                <input
                        type="text"
                        className="submit-wallet-input"
                        placeholder="wallet address"
                        value={wallet} 
                        onChange={
                            object => setWallet(object.target.value)
                        }
                    />
                </div>

                <div className="submit-wallet-button-wrap">
                    <button className='kivo-button' onClick={submit} disabled={!submissionEnabled}>submit</button>
                </div>
        </div>
        </>
    );
}

export default KYNmint;