import { useEffect, useRef, useState } from "react";
import DashBoard from "./DashBoard";
import { images } from '../../../utils/images';
import MemberInfo from "./MemberInfo";
import Likes from "./Likes";
import Reviews from "./Reviews";

const MyPage = ()=>{
    const [content, setContent] = useState(<DashBoard/>);

    const navRef = useRef([]);

    const addNavRef = (e)=>{
        navRef.current.push(e)
    }

    const changeContent = (e)=>{
        let result;
        const title = e.target.innerText;
        switch(title) {
            case "마이페이지":
                result=(<DashBoard/>);
                break;
            case "회원정보 관리":
                result=(<MemberInfo/>);
                break;
            case "즐겨찾기 관리":
                result=(<Likes/>);
                break;
            case "리뷰 관리":
                result=(<Reviews/>);
                break;
        }
        navRef.current.map((el)=>{
            if(el.innerText === title) {
                el.cl
            }
            else {
                el.current.classList.remove("nav-selected");
            }
        })
        setContent(result);
    }

    return (
        <div id="mypage" className="inner">
            <h1 onClick={(e)=>{changeContent(e)}}>마이페이지</h1>
            <section>
                <aside>
                    <ul>
                        <li ref={addNavRef} onClick={(e)=>{changeContent(e)}}>
                            <img src={images['nav_memberInfo_clicked20.png']} alt=""/>
                            <h2>회원정보 관리</h2>
                        </li>
                        <li ref={addNavRef} onClick={(e)=>{changeContent(e)}}>
                            <img src={images['nav_like20.png']} alt=""/>
                            <h2>즐겨찾기 관리</h2>
                        </li>
                        <li ref={addNavRef} onClick={(e)=>{changeContent(e)}}>
                            <img src={images['nav_review20.png']} alt=""/>
                            <h2>리뷰 관리</h2>
                        </li>
                    </ul>
                </aside>
                { content }
            </section>
        </div>
    );
}
export default MyPage;