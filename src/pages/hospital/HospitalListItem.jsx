import { useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';
import axios from 'axios';
import { checkOpenStatus, cleanHospitalName } from "./Hospital";

const HospitalListItem = ({ 
    hospital, 
    index,
    handleOpenDetail,
    handleCloseDetail,
    renameClassification,
    favoriteStar,
    favorites,
}) => {
    // 오픈 유/무
    const { status, open, close } = checkOpenStatus(hospital);

    // 평점 및 리뷰수 상태
    const [ratingReview, setRatingReview] = useState({
        rating: 0,
        reviewCount: 0,
    });

    // 병원의 평점 및 리뷰 요청
    const fetchHospitalData = async (hpid) => {
        try {
            const response = await axios.get(`/api/review/${hpid}/reviews`);
            const { rating, reviewCount } = response.data;

            setRatingReview({
                rating: rating || 0,
                reviewCount: reviewCount || 0,
            });
        } catch (error) {
            console.error("Failed to fetch hospital data:", error);
        }
    };

    useEffect(() => {
        fetchHospitalData(hospital.hpid);
    }, [hospital.hpid]);


    return (
        <li key={index} onClick={() => handleOpenDetail(hospital, index)}>
            <div className="name">
                {cleanHospitalName(hospital.dutyName)}
                <span> {renameClassification(hospital.dutyDivNam, hospital.dutyName)}</span>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); 
                        favoriteStar(hospital, index);
                        handleCloseDetail();
                    }}
                >
                    <img
                        src={images[favorites[index] ? 'star20_on.png' : 'star20_off.png']}
                    />
                </a>
            </div>
            <span>{hospital.dutyAddr}</span>
            <div className="open"><p className={status === "진료중" ? "green" : "red"}>{status}</p>{open && close ? `${open} ~ ${close}` : ""}</div>

            {ratingReview.reviewCount > 0 &&
            <div className="grade flex">
                <span>{ratingReview.rating.toFixed(1)}</span>
                <div className="img" >
                    <img src={images[`grade${Math.round(ratingReview.rating)}.png`]} alt=""/>
                </div>
                리뷰 {ratingReview.reviewCount}건
            </div>
            }
        </li>
    );
};
export default HospitalListItem;