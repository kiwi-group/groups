import React, { createContext, useContext, useState, useEffect } from 'react';

export type GroupType = {
    index: number,
    owner: string,
    name: string,
    members: User[]
};
  
export type User = {
    username: string,
    userImage: string
};

type ContextProps = {
    children: React.ReactNode;
}

type ContextType = {
    groups: GroupType[] | null;
    profile: Profile | null,
    loadProfile: Function | null,
    refreshProfile: Function | null;
}

const initialContext: ContextType = {
    groups: null,
    profile: null,
    loadProfile: null,
    refreshProfile: null
}

type Profile = {
    twitter: string,
    image: string,
}

const defaultProfile = {
    twitter: "",
    image: ""
}

const defaultGroup: GroupType = {
    index: 0,
    owner: '',
    name: '',
    members: [],
}

const Context = createContext(initialContext);

export const inviteGroup = async (owner: string) => {

    return defaultGroup;
}

export const ContextProvider: React.FC<ContextProps> = ({ children }) => {
    const [groups, setGroups] = useState<GroupType[] | null>(null);
    const [profile, setProfile] = useState<Profile>(defaultProfile);

    const loadProfile = async (handle: string) => {

    }

    const refreshProfile = (twitter: string, image: string) => {
        setProfile(
            {
                ...profile,
                twitter: twitter,
                image: image
            }
        )
    };

    
    const loadGroups = async (twitter: string) => {
        
        return [];
    }

    useEffect(() => {
        (async ()=> {
            setGroups(
                await loadGroups(profile!.twitter)
            )
        })();
    }, [])

    return (
        <Context.Provider 
            value = {{
                groups,
                profile,
                refreshProfile,
                loadProfile,
            }}>
            {children}
        </Context.Provider> 
    )
}

export const UseContext = () => {
    return useContext(Context);
}