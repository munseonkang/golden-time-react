import { useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';


const HospitalModal = ({ isModalOpen, onCloseModal, hpName })=>{
    
    if (!isModalOpen) return null; 
    
    return (
        <>
            <div className="review-modal">
                <div className="box">
                    <form name="reviewForm" id="reviewForm" action="">
                        <p>{hpName}</p>
                        <div className="flex">
                            <div className="flex">
                                <div className="img">
                                    <img src={images['default_image.jpg']} alt=""/>
                                </div>
                                <p>애플이</p>
                            </div>
                            <div className="grade">
                                <img src={images['grade29_on.png']} alt=""/>
                                <img src={images['grade29_on.png']} alt=""/>
                                <img src={images['grade29_on.png']} alt=""/>
                                <img src={images['grade29_off.png']} alt=""/>
                                <img src={images['grade29_off.png']} alt=""/>
                            </div>
                        </div>
                        <textarea name="" id="" rows="4" placeholder="이곳에 다녀온 경험을 자세히 공유해 주세요."></textarea>
                        <div className="btn flex">
                            <a id="cancel-btn" className="cancel-btn" onClick={onCloseModal}>취소</a>
                            <a id="review-btn" className="review-btn">게시</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default HospitalModal;