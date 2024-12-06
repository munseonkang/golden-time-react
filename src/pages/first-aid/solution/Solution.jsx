import { images } from "../../../utils/images";
import axios from "axios";
import { useState, useEffect } from "react";

const Solution = () => {
    const [youtube, setyoutube] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
    const [pageSet, setPageSet] = useState(1); // 현재 페이지 세트 상태 (1부터 시작)

    // Modal 상태
    const [modalVisible, setModalVisible] = useState(false);  // 모달의 가시성
    const [videoUrl, setVideoUrl] = useState('');  // 선택된 유튜브 영상의 URL

    const fetchyoutube = async (page = 1) => {
        try {
            const response = await axios.get(`/api/youtube/video`, {
                params: {
                    page: page,
                    size: 9,  // 한 페이지에 9개씩 가져오기
                },
            });

            console.log('받은 값:', response.data);
            setyoutube(response.data);
            if (response.data.length > 0) {
                setTotalPages(response.data[0].totalPages);  // youtube[0].totalPages
            }
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    };

    useEffect(() => {
        fetchyoutube(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePrevSet = () => {
        if (pageSet > 1) {
            setPageSet(pageSet - 1);
            setCurrentPage((pageSet - 2) * 10 + 1);
        }
    };

    const handleNextSet = () => {
        const maxSet = Math.ceil(totalPages / 10);
        if (pageSet < maxSet) {
            setPageSet(pageSet + 1);
            setCurrentPage(pageSet * 10 + 1);
        }
    };

    const handleVideoClick = (youtubeId) => {
        setVideoUrl(`https://www.youtube.com/embed/${youtubeId}`); // 유튜브 ID로 URL 설정
        setModalVisible(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setModalVisible(false); // 모달 닫기
        setVideoUrl(''); // 영상 URL 초기화
    };

    // 페이지 세트 계산
    const startPage = (pageSet - 1) * 10 + 1;
    const endPage = Math.min(pageSet * 10, totalPages);

    // 이전 페이지와 다음 페이지 활성 및 비활성
    const isPrevDisabled = pageSet === 1;
    const isNextDisabled = pageSet === Math.ceil(totalPages / 10);

    

    return (
        <>
            <div id="youtube" className="inner">
                <div className="box1">
                    <div className="text">
                        <p>상황별 대처방법 (Youtube)</p>
                    </div>
                </div>

                <div className="box2">
                    {youtube && Array.isArray(youtube) && youtube.map((video, index) => (
                        <div key={index} className="video-box">
                            <div className="video">
                                {/* YouTube 썸네일 이미지 URL에 youtubeId 삽입 */}
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                    alt={video.title}
                                    onClick={() => handleVideoClick(video.youtubeId)} // 클릭 시 영상 열기
                                />
                            </div>
                            <div className="title">
                                <p>{video.title}</p>
                            </div>
                            <div className="ref">
                                <p>{video.reference}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="box3">
                    <div className="pagination-box">
                        <ul>
                            {/* 이전 세트 */}
                            {!isPrevDisabled && (
                                <li>
                                    <button
                                        className="clickable"
                                        onClick={handlePrevSet}
                                    >
                                        <img src={images['arrow_left6.png']} />
                                    </button>
                                </li>
                            )}
                            {/* 페이지 번호 동적 생성 */}
                            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        className={currentPage === startPage + index ? 'current-page r15w' : 'r15mc'}
                                        onClick={() => handlePageChange(startPage + index)}
                                    >
                                        {startPage + index}
                                    </button>
                                </li>
                            ))}
                            {/* 다음 세트 */}
                            {!isNextDisabled && (
                                <li>
                                    <button
                                        className="clickable"
                                        onClick={handleNextSet}
                                    >
                                        <img src={images['arrow_right6.png']} />
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* 모달 */}
                {modalVisible && (
                    <div className="modal" onClick={handleCloseModal}>
                        {/* <div className="img1">
                            <img src={images['tube_prev.png']} />
                        </div> */}
                        <div className="modalbox" onClick={(e) => e.stopPropagation()}>

                            <iframe width="1024" height="580" src={videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


                        </div>
                        {/* <div className="img2">
                            <img src={images['tube_next.png']} />
                        </div> */}
                    </div>
                )}

            </div>
        </>
    );
};

export default Solution;