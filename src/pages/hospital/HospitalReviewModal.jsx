import { useContext, useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';
import { getMemberProfile } from '../../apis/services/goldentimeService';
import axios from 'axios';
import { mainContext } from "../../App";

const HospitalReviewModal = ({ 
    isModalOpen, 
    setIsModalOpen,
    selectedHospital,
    hpName, 
})=>{
    const { loginMember } = useContext(mainContext); // 로그인 확인(아이디 or null)
    const [rating, setRating] = useState(3); // 별점
    const [memberInfo, setMemberInfo] = useState({});
    // 초기 상태를 상수로 선언
    const initialReviewForm = {
        content: "",
        rating: 3,
        classification: "병원",
        memberId: loginMember,
        dutyId: "",
    };
    const [reviewForm, setReviewForm] = useState(initialReviewForm);
    
    useEffect(()=>{
        getMemberProfile(sessionStorage.getItem("loginMember"), setMemberInfo)
    },[])
    
    if (!isModalOpen) return null; 

    //리뷰 작성
    const handleWriteReview = async () => {
        if (!reviewForm.content) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        // 전달할 객체(DTO)
        const reviewDTO = {
            ...reviewForm,
            content: reviewForm.content.trim(),
            rating: rating,
            dutyId: selectedHospital.hpid,
        };
        const dutyDTO = {
            dutyId: selectedHospital.hpid,
            dutyName: selectedHospital.dutyName,
            dutyDiv: selectedHospital.dutyDivNam,
            dutyTel: selectedHospital.dutyTel1,
        };
        // 두 가지 객체 병합
        const sendData = {
            reviewData: reviewDTO,
            dutyData: dutyDTO,
        };


        try {
            const response = await axios.post('/api/review/writeHospitalReview', sendData);

            console.log(response.data);
            if (response.data === 'O') {
                alert("리뷰가 등록되었습니다.");
                setIsModalOpen(false);

                // 리뷰 정보를 초기 상태로 되돌리기
                setReviewForm({
                    ...initialReviewForm,
                    rating: 3,
                });
            }
        } catch (error) {
            console.error("리뷰 등록 실패:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    
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
                                <p>{memberInfo?.nickname}</p>
                            </div>
                            <div className="grade">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <img
                                        src={images[star <= rating ? 'grade29_on.png' : 'grade29_off.png']}
                                        alt={`${star} star`}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <textarea 
                            name="reviewCon" 
                            id="reviewCon"
                            rows="4" 
                            placeholder="이곳에 다녀온 경험을 자세히 공유해 주세요."
                            value={reviewForm.content}
                            onInput={(e) => {
                                setReviewForm({
                                    ...reviewForm,
                                    content: e.target.value,
                                });
                            }}
                        ></textarea>
                        <div className="btn flex">
                            <a id="cancel-btn" className="cancel-btn" onClick={()=> {
                                setIsModalOpen(false);
                                setReviewForm({
                                    ...initialReviewForm,
                                    rating: 3,
                                });
                            }}>취소</a>
                            <a id="review-btn" className="review-btn" onClick={() => {handleWriteReview()}}>게시</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default HospitalReviewModal;