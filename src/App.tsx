import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from './Layouts/DefaultLayout';
import Invite from './Pages/Invite'
import Signup from './Pages/Signup';
import Group from './Pages/Group'
import Joined from './Pages/Joined'
import KYNmint from './Pages/KYN-mint';
import { ContextProvider } from './Context';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};

initializeApp(firebaseConfig);

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout /> }>
            <Route index element={<Signup />} />
            <Route path="/invite/:owner" element={<Invite />} />
            <Route path="/group/:owner" element={<Group />} />
            <Route path="/joined/:owner" element={<Joined />} />
            <Route path="/airdrop" element={<KYNmint />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
