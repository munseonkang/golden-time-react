import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState, createContext } from "react";
import './assets/style/style.css';
import Main from './pages/Main';
import Emergency from './pages/emergency/Emergency';
import Hospital from './pages/hospital/Hospital';
import CheckUp from './pages/check-up/CheckUp';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Medicine from './pages/medicine/Medicine';
import Faq from './pages/first-aid/faq/Faq';
import Solution from './pages/first-aid/solution/Solution';
import Principle from './pages/first-aid/principle/Principle';
import Join from './pages/member/Join';
import Login from './pages/member/Login';
import MyPage from './pages/member/mypage/MyPage';
import Header from './layout/Header';
import Footer from './layout/Footer';

export const mainContext = createContext();
function App() {
  const [loginMember, setLoginMember] = useState(sessionStorage.getItem("loginMember"));

  useEffect(()=>{
    if(loginMember){
      sessionStorage.setItem("loginMember", loginMember);
    }
    else{
      sessionStorage.removeItem("loginMember");
    }
  },[loginMember])
  
  return (
    <BrowserRouter>
      <mainContext.Provider value={{loginMember:loginMember, setLoginMember:setLoginMember}}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/check-up" element={<CheckUp />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/first-aid/faq" element={<Faq />} />
          <Route path="/first-aid/solution" element={<Solution />} />
          <Route path="/first-aid/principle" element={<Principle />} />
          <Route path="/member/join" element={<Join />} />
          <Route path="/member/login" element={<Login />} />
          <Route path="/member/mypage" element={<MyPage />} />
        </Routes>
        <Footer />
      </mainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
