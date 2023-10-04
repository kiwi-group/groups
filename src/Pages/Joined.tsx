import React, { useState, useEffect } from 'react'
import { GroupType } from '../Context';
import Kiwi from '../Components/Kiwi'
import "../Styling/Pages/Joined.css"
import create from '../Images/create-button.png'
import { useParams } from 'react-router-dom';
import { inviteGroup } from '../Context';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import forward from '../Images/forward1.png'

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

const Joined: React.FunctionComponent = () => {
    const [group, setGroup] = useState<GroupType>(defaultGroup);
    const [slicedata, setSlicedata] = useState<SliceData[]>(defaultSliceData);
    const [numMembers, setNumMembers] = useState(0);
    const [imageurl, setimageurl] = useState('');
    const [username, setusername] = useState('');
    const [user, setUser] = useState<User>();

    const auth = getAuth();
    const navigate = useNavigate();
    const { owner } = useParams();

    useEffect(() => {
        (async () => {
            if (owner) {
                setGroup( 
                    await inviteGroup(owner)
                )
            }
        })();

    }, [owner])

    useEffect(() => {
        let data: SliceData[] = [];
        for (let member = 0; member < 10;  member++) {
            if (group.members[member]) {
                data.push(
                    {
                        username: group.members[member].username,
                        image: group.members[member].userImage,
                        populated: true,
                    }
                );
            } else {
                data.push(
                    {
                        username: null,
                        image: null,
                        populated: false,
                    }
                )
            }
        }
                    
        setSlicedata(data);
        setNumMembers(group.members.length);
      }, [group]);

    const createGroup = async () => {
        if (user) {
            navigate(`/group/${username}`)
        }
    }

    return (
        <>
            <div className="joined-flex-container">
                <div className="profile-picture-wrap">
                    <img className="profile-picture-img" src={imageurl} alt="profile" />
                </div>
                
                <div className="username-wrap">
                    <label className="username-text">@{username}</label>
                </div>

                <div className="joined-info-wrap">
                    <div className="joined-corner-wrap">
                    <img className="joined-group-corner" />
                    <label className="joined-corner-text"></label>
                    </div>
                    <label className="joined-group-name">{group.name}</label>
                </div>

                <div className="welcome-wrap">
                    <label className="welcome">Welcome!  You've been invited to get first access when Kivo launches.</label>
                </div>

                <div className="create-wrap">
                    <button className="create-button" onClick={createGroup}>
                        <img className="create-img" src={create} />
                    </button>

                    <div className="joined-right-arrow">
                        <img className="joined-right-arrow-img" src={forward}/>
                    </div>
                </div>

                <div className="joined-group-kiwi-wrap">
                    <Kiwi group={group} sliceData={slicedata} />
                </div>
            </div>
      </>
    );
}

export default Joined;