import { images } from "../../../utils/images";

const Solution = () => {
    return (
        <>
            <div id="youtube" className="inner">

                <div class="box1">
                    <div class="text">
                        <p>상황별 대처방법 (Youtube)</p>
                    </div>
                </div>

                <div class="box2">

                    <div class="video-box">
                        <div class="video">
                            <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                        </div>
                        <div class="title">
                            <p>올바른 심폐소생술과 제세동기 사용법</p>
                        </div>
                        <div class="ref">
                            <p>질병관리청 아프지마TV</p>
                        </div>
                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/2ZIdOeTZRMk/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>멈춘 심장을 다시 뛰게하는 '두 손의 기적'</p>
                            </div>
                            <div class="ref">
                                <p>행정안전부</p>
                            </div>
                        </div>

                    </div>


                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/PxP2VArWh94/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>성인의 하임리히법</p>
                            </div>
                            <div class="ref">
                                <p>행정안전부</p>
                            </div>
                        </div>

                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>올바른 심폐소생술과 제세동기 사용법</p>
                            </div>
                            <div class="ref">
                                <p>질병관리청 아프지마TV</p>
                            </div>
                        </div>

                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>올바른 심폐소생술과 제세동기 사용법</p>
                            </div>
                            <div class="ref">
                                <p>질병관리청 아프지마TV</p>
                            </div>
                        </div>

                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>올바른 심폐소생술과 제세동기 사용법</p>
                            </div>
                            <div class="ref">
                                <p>질병관리청 아프지마TV</p>
                            </div>
                        </div>

                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>올바른 심폐소생술과 제세동기 사용법</p>
                            </div>
                            <div class="ref">
                                <p>질병관리청 아프지마TV</p>
                            </div>
                        </div>

                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>올바른 심폐소생술과 제세동기 사용법</p>
                            </div>
                            <div class="ref">
                                <p>질병관리청 아프지마TV</p>
                            </div>
                        </div>

                    </div>

                    <div class="video-box">

                        <div class="video-box">
                            <div class="video">
                                <img src="https://img.youtube.com/vi/q7J2T6MFA9g/hqdefault.jpg"/>
                            </div>
                            <div class="title">
                                <p>올바른 심폐소생술과 제세동기 사용법</p>
                            </div>
                            <div class="ref">
                                <p>질병관리청 아프지마TV</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="box3">
                <div class="pagination-box">
                    <ul>
                        <li>
                            <button class=""><img src={images['arrow_left6.png']}/></button>
                        </li>
                        <li>
                            <button class="current-page r15w">1</button>
                        </li>
                        <li>
                            <button class="r15mc">2</button>
                        </li>
                        <li>
                            <button class="r15mc">3</button>
                        </li>
                        <li>
                            <button class="r15mc">4</button>
                        </li>
                        <li>
                            <button class="r15mc">5</button>
                        </li>
                        <li>
                            <button class="r15mc">...</button>
                        </li>
                        <li>
                            <button class="r15mc">10</button>
                        </li>
                        <li>
                            <button class="clickable"><img src={images['arrow_right6.png']}/></button>
                        </li>
                    </ul>
                </div>
                </div>

                <div class="modal">
                    <div class="img1">
                        <img src={images['tube_prev.png']}/>
                    </div>
                    <div class="modalbox">
                        <iframe width="1024" height="580" src="https://www.youtube.com/embed/51kx-BVfdCU?si=PoqxppV9q0a_yjI8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div class="img2">
                        <img src={images['tube_next.png']}/>
                    </div>

                </div>

            </div>
        </>
    );
}
export default Solution;