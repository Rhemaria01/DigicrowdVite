import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserContext } from './context/UserContext';
import { ModalContext } from './context/ModalContext';
import { StateProvider } from './context';
import LandingPage from './pages/LandingPage';
import Footer from './layout/Footer';
import CreateCampaign from './pages/CreateCampaign';
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
// import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import './App.css';
import 'aos/dist/aos.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);
  return (
    <StateProvider >
    <ModalContext.Provider value={{modalOpen, message, setModalOpen,  setMessage}}>
    <Router>
    <div className='container mx-auto  h-auto'>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/create" exact element={<CreateCampaign/>} />
      </Routes>
    </div>
      <Footer />
      
    </Router>
      </ModalContext.Provider>
      </StateProvider>
  );
}
