import { useEffect, useRef, useState } from "react";
import DashBoard from "./DashBoard";
import { images } from '../../../utils/images';
import MemberInfo from "./MemberInfo";
import Reviews from "./Reviews";
import { Title } from "../../../constants/constants";
import Likes from "./like/Likes";
import { useNavigate } from "react-router-dom";

const MyPage = ()=>{
    const { DASHBOARD, MEMBERINFO, LIKES, REVIEWS } = Title;

    const [content, setContent] = useState();

    const titleRef = useRef(DASHBOARD);
    const navRef = useRef([]);
    
    const navigate = useNavigate();

    const addNavRef = (e)=>{
        navRef.current.push(e)
    }

    const changeContent = (title)=>{
        let result;
        switch(title) {
            case DASHBOARD:
                result=(<DashBoard changeContent={changeContent}/>);
                break;
            case MEMBERINFO:
                result=(<MemberInfo changeContent={changeContent}/>);
                break;
            case LIKES:
                result=(<Likes/>);
                break;
            case REVIEWS:
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
            case MEMBERINFO:
                if(title===titleRef.current) return "nav_memberInfo_clicked20.png";
                else return "nav_memberInfo20.png";
            case LIKES:
                if(title===titleRef.current) return "nav_like_clicked20.png";
                else return "nav_like20.png";
            case REVIEWS:
                if(title===titleRef.current) return "nav_review_clicked20.png";
                else return "nav_review20.png";
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem("loginMember")===null) navigate('/member/login', {replace: true});
        else changeContent(DASHBOARD);
    },[])

    return (
        <div id="mypage" className="inner">
            <h1 onClick={()=>{changeContent(DASHBOARD)}}>{DASHBOARD}</h1>
            <section>
                <aside>
                    <ul>
                        <li ref={addNavRef} onClick={()=>{changeContent(MEMBERINFO)}}>
                            <img src={images[`${changeIcon(MEMBERINFO)}`]} alt=""/>
                            <h2>{MEMBERINFO}</h2>
                        </li>
                        <li ref={addNavRef} onClick={()=>{changeContent(LIKES)}}>
                            <img src={images[`${changeIcon(LIKES)}`]} alt=""/>
                            <h2>{LIKES}</h2>
                        </li>
                        <li ref={addNavRef} onClick={()=>{changeContent(REVIEWS)}}>
                            <img src={images[`${changeIcon(REVIEWS)}`]} alt=""/>
                            <h2>{REVIEWS}</h2>
                        </li>
                    </ul>
                </aside>
                { content }
            </section>
        </div>
    );
}
export default MyPage;