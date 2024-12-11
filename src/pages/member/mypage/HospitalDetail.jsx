import axios from "axios";
import { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import { checkOpenStatus, cleanHospitalName, getFormattedTime } from "../../hospital/Hospital";
import HospitalReviewModal from "../../hospital/HospitalReviewModal";


const HospitalDetail = ({hpid, classification, setIsDetailOpen})=>{
    // 기본 tab1 활성화
    const [activeTab, setActiveTab] = useState('tab1');
    // 리뷰 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedHospital, setSelectedHospital] = useState(null);

    const [isFavorite, setIsFavorite] = useState(true);
    // 탭메뉴
    const handleTabClick = (tab) => setActiveTab(tab);

    // 평점 및 리뷰수 상태
    const [ratingReview, setRatingReview] = useState({
        reviews: [],
        rating: 0,
        reviewCount: 0,
        ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });

    // 병원 상세정보 불러오기
    const fetchHospitalDetail = async (hpid) => {
        const apiUrl = "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire";
        const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;

        try {
            const response = await axios.get(
                `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`
            );
            const result = response?.data?.response?.body?.items?.item || null;
            setSelectedHospital(result);

        } catch (error) {
            console.log(error);
        }
    };

    // 병원의 평점 및 리뷰 요청
    const fetchHospitalData = async (hpid) => {
        try {
            const response = await axios.get(`/api/review/${hpid}/reviews`);
            const { reviews, rating, reviewCount, ratingCounts } = response.data;

            setRatingReview({
                reviews: reviews || [],
                rating: rating || 0,
                reviewCount: reviewCount || 0,
                ratingCounts: ratingCounts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, 
            });
        } catch (error) {
            console.error("Failed to fetch hospital data:", error);
        }
    };

    // 약국 상세정보 불러오기
    const fetchPharmacyDetail = async (hpid) => {
        const apiUrl = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire";
        const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;

        try {
            const response = await axios.get(
                `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`
            );
            const result = response?.data?.response?.body?.items?.item || null;
            setSelectedHospital(result);

        } catch (error) {
            console.log(error);
        }
    };

    // 약국의 평점 및 리뷰 요청
    const fetchPharmacyData = async (hpid) => {
        try {
            const response = await axios.get(`/api/review/pharmreview`, {
                params: { hpid }
            });

            const reviews = response.data;
            // console.log('HPIDs sent to Spring Boot, status:', response.status);
            // console.log('받은 값:', response.data);

            let rating;
            const totalReviews = reviews.length;
            if (reviews.length === 0) rating = 0;
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            rating = Math.round(averageRating * 10) / 10;

            const fiveStarWidth = countRatings(reviews)[5];
            const fourStarWidth = countRatings(reviews)[4];
            const threeStarWidth = countRatings(reviews)[3];
            const twoStarWidth = countRatings(reviews)[2];
            const oneStarWidth = countRatings(reviews)[1];

            setRatingReview({
                reviews: response.data || 0,
                rating: rating || 0,
                reviewCount: reviews.length || 0,
                ratingCounts: {1: oneStarWidth,
                                2: twoStarWidth,
                                3: threeStarWidth,
                                4: fourStarWidth,
                                5: fiveStarWidth
                } || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, 
            });

        } catch (error) {
            console.error('Error sending hpid to Spring Boot:', error);
        }
    };

    const countRatings = (reviews) => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach((review) => {
            if (counts[review.rating] !== undefined) {
                counts[review.rating]++;
            }
        });
        return counts;
    };

    useEffect(() => {
        if(classification==="병원") {
            fetchHospitalDetail(hpid);
            fetchHospitalData(hpid);
        } else {
            fetchPharmacyDetail(hpid);
            fetchPharmacyData(hpid);
        }
    }, []);


    return (
        <>
            {/* 병원 상세정보 표시 */}
            {selectedHospital && (
                <div className="detail">
                    <div className="scroll">
                        <p>{(classification==="병원")?"병원":"약국"} 상세<span><img src={images['close16.png']} alt="" 
                        onClick={()=>{setIsDetailOpen(false)}}/></span></p>
                        <div className="data">
                            <p>{cleanHospitalName(selectedHospital.dutyName)}
                            {/* <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // favoriteStar(selectedHospital, selectIndex);
                                }}
                            >
                                <img
                                    src={images[isFavorite ? 'star25_on.png' : 'star25_off.png']}
                                />
                            </a> */}
                            </p>
                            <span>{
                            // renameClassification(selectedHospital.dutyDivNam, selectedHospital.dutyName)
                            }</span>
                            <div className="open">
                                <p className={checkOpenStatus(selectedHospital).status === "진료중" ? "green" : "red"}>
                                    {checkOpenStatus(selectedHospital).status}
                                </p>
                                {checkOpenStatus(selectedHospital).open && checkOpenStatus(selectedHospital).close ? `${checkOpenStatus(selectedHospital).open} ~ ${checkOpenStatus(selectedHospital).close}` : ""}
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><img src={images['detail_icon_place.png']} alt=""/></th>
                                        <td>({`${String(selectedHospital.postCdn1).trim()}${String(selectedHospital.postCdn2).trim()}`}) {selectedHospital.dutyAddr}</td>
                                    </tr>
                                    <tr>
                                        <th><img src={images['detail_icon_tel.png']} alt=""/></th>
                                        <td>{selectedHospital.dutyTel1}</td>
                                    </tr>
                                    {/* {selectedHospital.emergency != "응급의료기관 이외" && (
                                        <tr className="emergency">
                                            <th><img src={images['detail_icon_emergency.png']} alt=""/></th>
                                            <td>응급실 운영</td>
                                        </tr>
                                    )} */}
                                </tbody>
                            </table>
                        </div>
                        <div className="detail-tab flex">
                            <p className={`tab1 ${activeTab === 'tab1' ? 'on' : ''}`} onClick={() => handleTabClick('tab1')}>정보</p>
                            <p className={`tab2 ${activeTab === 'tab2' ? 'on' : ''}`} onClick={() => handleTabClick('tab2')}>리뷰</p>
                        </div>
                        <div className="tab-container">
                            <div className={`tab-con con1 ${activeTab === 'tab1' ? 'show' : 'hide'}`}>
                                <div className="time">
                                    <h4>운영시간</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>월요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime1s)} - {getFormattedTime(selectedHospital.dutyTime1c)}</td>
                                            </tr>
                                            <tr>
                                                <th>화요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime2s)} - {getFormattedTime(selectedHospital.dutyTime2c)}</td>
                                            </tr>
                                            <tr>
                                                <th>수요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime3s)} - {getFormattedTime(selectedHospital.dutyTime3c)}</td>
                                            </tr>
                                            <tr>
                                                <th>목요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime4s)} - {getFormattedTime(selectedHospital.dutyTime4c)}</td>
                                            </tr>
                                            <tr>
                                                <th>금요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime5s)} - {getFormattedTime(selectedHospital.dutyTime5c)}</td>
                                            </tr>
                                            <tr>
                                                <th>토요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime6s)} - {getFormattedTime(selectedHospital.dutyTime6c)}</td>
                                            </tr>
                                            <tr>
                                                <th>일요일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime7s)} - {getFormattedTime(selectedHospital.dutyTime7c)}</td>
                                            </tr>
                                            <tr className="holiday">
                                                <th>공휴일</th>
                                                <td>{getFormattedTime(selectedHospital.dutyTime8s)} - {getFormattedTime(selectedHospital.dutyTime8c)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="subject">
                                    <h4>진료과목</h4>
                                    <ul>
                                        {selectedHospital.dgidIdName ? (
                                            selectedHospital.dgidIdName.split(',').map((subject, index) => (
                                                <li key={index}>{subject.trim()}</li>
                                            ))
                                        ) : (
                                            <p>진료과목 정보가 없습니다.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className={`tab-con con2 ${activeTab === 'tab2' ? 'show' : 'hide'}`}>
                                <div className="score">
                                    <h4>평점</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>5</th>
                                                <td>
                                                    <div>
                                                        <p style={{ width: `${ratingReview.reviewCount === 0 ? 0 : (ratingReview.ratingCounts[5] / ratingReview.reviewCount) * 100}%` }}></p>
                                                    </div>
                                                </td>
                                                <td rowSpan='5'>
                                                    <p>{ratingReview.rating.toFixed(1)}</p>
                                                    <img src={images[`grade${Math.round(ratingReview.rating)}.png`]} alt=""/>
                                                    <span>리뷰 {ratingReview.reviewCount}개</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>4</th>
                                                <td>
                                                    <div>
                                                        <p style={{ width: `${ratingReview.reviewCount === 0 ? 0 : (ratingReview.ratingCounts[4] / ratingReview.reviewCount) * 100}%` }}></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <td>
                                                    <div>
                                                        <p style={{ width: `${ratingReview.reviewCount === 0 ? 0 : (ratingReview.ratingCounts[3] / ratingReview.reviewCount) * 100}%` }}></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <td>
                                                    <div>
                                                        <p style={{ width: `${ratingReview.reviewCount === 0 ? 0 : (ratingReview.ratingCounts[2] / ratingReview.reviewCount) * 100}%` }}></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>
                                                    <div>
                                                        <p style={{ width: `${ratingReview.reviewCount === 0 ? 0 : (ratingReview.ratingCounts[1] / ratingReview.reviewCount) * 100}%` }}></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* <a href="#" 
                                        onClick={() => {
                                            if (sessionStorage.getItem("loginMember")!==null) {
                                                setIsModalOpen(true);
                                            } else {
                                                alert('로그인이 필요합니다.');
                                            }
                                        }}
                                    > 리뷰작성</a> */}
                                </div>
                                <div className="review">
                                    <h4>리뷰</h4>
                                    <ul>
                                        {ratingReview.reviews.length > 0 ? (
                                            ratingReview.reviews.map((review, index) => (
                                                <li key={index}>
                                                    <div className="flex">
                                                        <div className="img">
                                                            <img src={images['default_image.jpg']} alt=""/>
                                                        </div>
                                                        <div>
                                                            {review.nickname}
                                                            <p>{review.createdAt}</p>
                                                        </div>
                                                    </div>
                                                    <img src={images[`grade${review.rating}.png`]} alt=""/>
                                                    <p>{review.content}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <p>리뷰가 없습니다.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 리뷰 모달 */}
            {/* <HospitalReviewModal 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
                selectedHospital={selectedHospital}
                hpName={cleanHospitalName(selectedHospital.dutyName)}
            /> */}
        </>
    );
}
export default HospitalDetail;