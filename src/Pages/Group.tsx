import React, { useState, useEffect, useRef } from 'react'
import "../Styling/Pages/Group.css"
import copy from '../Images/copy-link.png'
import { GroupType, inviteGroup } from '../Context';
import Kiwi from '../Components/Kiwi'
import { useParams } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import nameToast from '../Images/name-toast.png'
import copyToast from '../Images/copy-toast.png'
import mintToast from '../Images/kyn-ready.png'
import forward from '../Images/forward1.png'
import back from '../Images/back1.png'
import { ToastContainer } from '../Components/ToastContainer';

const GROUP_MAX_MEMBERS = 10;

interface SliceData {
    username: string | null;
    image: string | null;
    populated: boolean;
}

let defaultSliceData: SliceData[] = [
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
    { username: null, image: null, populated: false },
];

const defaultGroup: GroupType = {
    index: 0,
    owner: '',
    name: '',
    members: [],
}

const Group: React.FunctionComponent = () => {
    const [value, setValue] = useState('Name Your Group'); 
    const [isEditing, setIsEditing] = useState(false);
    const [group, setGroup] = useState<GroupType>(defaultGroup);
    const [slicedata, setSlicedata] = useState<SliceData[]>(defaultSliceData);
    const [numMembers, setNumMembers] = useState(0);
    const [imageurl, setimageurl] = useState('');
    const [username, setusername] = useState('');
    const [groupLink, setlink] = useState('');

    const toastRef = useRef<{ addToast: (toast: string, autoHide: boolean) => void }>(null);

    const showNameToast = () => {
        if (toastRef.current) {
            toastRef.current.addToast(nameToast, true);
        }
    };

    const showCopyToast = () => {
        if (toastRef.current) {
            toastRef.current.addToast(copyToast, true);
        }
    };

    const showMintToast = () => {
        if (toastRef.current) {
            toastRef.current.addToast(mintToast, false);
        }
    }

    const auth = getAuth();
    const navigate = useNavigate();
    const { owner } = useParams();

    const handleEditClick = () => {
      setIsEditing(true);
    }
    
    const handleSaveClick = async () => {
        if(value.trim() === '') {
            setValue('Name Your Group');
            setIsEditing(false)
        } else {
            setIsEditing(false); 

            showNameToast();    
        }
    }
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(groupLink);
        showCopyToast();
    };

    return (
        <>
            <ToastContainer ref={toastRef} />

            <div className="app">
                <div className="flex-container">

                    <div className="group-profile-picture-wrap">
                        <img className="group-profile-picture-img" src={imageurl}/>
                    </div>
                    
                    <label className="group-username-text">@{username}</label>
                </div>

                <div className="group-info-wrap flex-container">
                    <input className="group-name" value={value} onChange={e => setValue(e.target.value)} readOnly={!isEditing} />

                    {username === group.owner && (
                        <button className={`name-button ${isEditing ? 'save' : 'edit'}`} onClick={isEditing ? handleSaveClick : handleEditClick}>
                        {isEditing ? 'save' : 'edit'}
                        </button>
                    )}

                </div>

                <div className="inv-wrap">

                    <div className='left-arrow'>
                        <img className='left-arrow-img' src ={back}/>
                    </div>
                        
                {value !== 'Name Your Group' ? (
                        <>
                            <label className="spots-left">INVITE</label>
                            <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
                            <label className="num-members">{GROUP_MAX_MEMBERS - numMembers} </label>
                            <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
                            <label className="spots-left">MORE FRIENDS TO GET MINT ACCESS!</label>
                        </>
                    ) : (
                        <label className="name-group">name your group first!</label>
                    )}

                    <div className='right-arrow'>
                        <img className='right-arrow-img' src ={forward}/>
                    </div>
                </div>

                <div className="group-link-wrap flex-container" onClick={handleCopyLink}>

                    <button className="group-copy-link-button">
                        <img className="copy-link-img" src={copy} alt="copy" />
                    </button>

                    <span className="group-link-text">{groupLink}</span>
                </div>

                <div className="group-kiwi-wrap">
                    <Kiwi group={group} sliceData={slicedata} />
                </div>
            </div>
        </>
    );
}

export default Group;