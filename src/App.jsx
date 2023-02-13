import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ModalContext } from './context/ModalContext';
import { StateProvider } from './context';
import LandingPage from './pages/LandingPage';
import Footer from './layout/Footer';
import CreateCampaign from './pages/CreateCampaign';
import Campaigns from './pages/Campaigns';
import Donate from './pages/Donate';
// import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import './App.css';
import 'aos/dist/aos.css';
import Header from './layout/Header';

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
        <Route path="/campaigns" exact element={<Campaigns/>} />
        <Route path="/donate/:id" element={<Donate/>} />
        <Route path="*" element={
          <>
          <Header />
        <div className='h-screen container mx-auto flex justify-center items-center'><h1 className='text-9xl text-link'>Error Page Not Found</h1></div>

          </>
        } />
      </Routes>
    </div>
      <Footer />
      
    </Router>
      </ModalContext.Provider>
      </StateProvider>
  );
}
