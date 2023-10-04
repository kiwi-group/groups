import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Kiwi from '../Components/Kiwi';
import { UseContext, inviteGroup, GroupType } from '../Context';
import x from '../Images/xlogo.png'
import "../Styling/Pages/Invite.css"
import { getAdditionalUserInfo, getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

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


const GROUP_MAX_MEMBERS = 10;
const Invite: React.FunctionComponent = () => {
    const [group, setGroup] = useState<GroupType>(defaultGroup);
    const [slicedata, setSlicedata] = useState<SliceData[]>(defaultSliceData);
    const [numMembers, setNumMembers] = useState(0);

    const { owner } = useParams();


    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    const navigate = useNavigate();
    const { loadProfile } = UseContext();

    const LinkTwitter = async () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
        
            navigate(`/joined/${owner}`)

        }).catch((error) => {
            console.error(error);
        });
    }

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

    return (
        <>
            <div className="Invite-section">

                <label className="Invite-header">Join @{owner}'s Kivo Group.</label>

                <label className="Invite-sub">We're opening up our beta for crypto friends. First come, first serve.</label>

                <button className="Invite-link-button" onClick={() => LinkTwitter()}>
                    <img className="Invite-logo" src={x} alt="Button Text" />
                </button>

                <div className="group-invite-header">
                    <label className="group-num-members">{GROUP_MAX_MEMBERS - numMembers}</label>
                    <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
                    <label className="group-invites-label">SPOTS LEFT</label>
                </div>

                <div className="Invite-kiwi-wrap">
                    <Kiwi group={group} sliceData={slicedata}/>
                </div>

            </div>

            <div className="invite-group-name-wrap">
                <label className="invite-group-name-label">{group.name}</label>
            </div>
        </>
    )
}

export default Invite;