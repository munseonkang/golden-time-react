import { useEffect, useRef, useState } from "react";
import DashBoard from "./DashBoard";
import { images } from '../../../utils/images';
import MemberInfo from "./MemberInfo";
import Likes from "./Likes";
import Reviews from "./Reviews";

const MyPage = ()=>{
    const [content, setContent] = useState((<DashBoard/>));

    const titleRef = useRef("마이페이지");
    const navRef = useRef([]);

    const addNavRef = (e)=>{
        navRef.current.push(e)
    }

    const changeContent = (e)=>{
        e.preventDefault();
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
            if(el?.innerText === title) {
                el?.classList.add("nav-selected");
            }
            else {
                el?.classList.remove("nav-selected");
            }
        })
        titleRef.current = title;
        setContent(result);
    }

    const changeIcon = (title)=>{
        switch(title) {
            case "회원정보 관리":
                if(title===titleRef.current) return "nav_memberInfo_clicked20.png";
                else return "nav_memberInfo20.png";
            case "즐겨찾기 관리":
                if(title===titleRef.current) return "nav_like_clicked20.png";
                else return "nav_like20.png";
            case "리뷰 관리":
                if(title===titleRef.current) return "nav_review_clicked20.png";
                else return "nav_review20.png";
        }
    }

    return (
        <div id="mypage" className="inner">
            <h1 onClick={(e)=>{changeContent(e)}}>마이페이지</h1>
            <section>
                <aside>
                    <ul>
                        <li ref={addNavRef} onClick={(e)=>{changeContent(e)}}>
                            <img src={images[`${changeIcon("회원정보 관리")}`]} alt=""/>
                            <h2>회원정보 관리</h2>
                        </li>
                        <li ref={addNavRef} onClick={(e)=>{changeContent(e)}}>
                            <img src={images[`${changeIcon("즐겨찾기 관리")}`]} alt=""/>
                            <h2>즐겨찾기 관리</h2>
                        </li>
                        <li ref={addNavRef} onClick={(e)=>{changeContent(e)}}>
                            <img src={images[`${changeIcon("리뷰 관리")}`]} alt=""/>
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