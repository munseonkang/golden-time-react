import {BrowserRouter, Route, Routes} from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/emergency" element={<Emergency></Emergency>}></Route>
        <Route path="/hospital" element={<Hospital></Hospital>}></Route>
        <Route path="/check-up" element={<CheckUp></CheckUp>}></Route>
        <Route path="/pharmacy" element={<Pharmacy></Pharmacy>}></Route>
        <Route path="/medicine" element={<Medicine></Medicine>}></Route>
        <Route path="/first-aid/faq" element={<Faq></Faq>}></Route>
        <Route path="/first-aid/solution" element={<Solution></Solution>}></Route>
        <Route path="/first-aid/principle" element={<Principle></Principle>}></Route>
        <Route path="/member/join" element={<Join></Join>}></Route>
        <Route path="/member/login" element={<Login></Login>}></Route>
        <Route path="/member/mypage" element={<MyPage></MyPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
