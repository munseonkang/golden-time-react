import { images } from "../../../utils/images";

const Faq = () => {
    return (
        <>
            <div id="faq" className="inner">
                <div className="box1">
                    <div className="text">
                        <p>자주 묻는 질문 (FAQ)</p>
                    </div>
                </div>
                <div className="box2">


                    <input type="checkbox"
                        id="answer01" />
                    <label htmlFor="answer01">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">심폐소생술(CPR) 방법</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                1. 심정지 및 무호흡 확인
                                <br />
                                - 양어깨를 두드리며 말을 걸고 눈과 귀로 심정지 및 무호흡 유무를 확인한다.
                                (반응과 호흡이 있으면 심정지 아님)

                                <br /><br />

                                2. 도움 및 119신고 요청
                                <br />
                                - 주변사람에게(꼭 집어서) 119신고를 부탁하고 자동심장충격기를 요청한다.

                                <br /><br />

                                3. 가슴압박 30회 시행
                                <br />
                                - 환자의 가슴 중앙에 깍지낀 두손으로 몸과 수직이 되도록 압박한다.
                                <br />
                                - 압박은 성인기준 5cm 이상 1분에 100 ~ 120회 이상의 속도로 압박한다.

                                <br /><br />

                                4. 인공호흡 2회 시행
                                <br />
                                - 코를 막고 구조자의 입을 완전히 밀착하여 정상호흡을 약 1초에 걸쳐 2회 숨을 불어 넣는다.
                                <br />
                                &nbsp;&nbsp;&nbsp;(인공호흡이 어려울 경우 가슴압박을 지속적으로 시행)

                                <br /><br />

                                5. 가슴압박, 인공호흡 반복
                                <br />
                                - 이후에는 30회의 가슴압박과 2회의 인공호흡을 119구급대원이 현장에 도착할 때까지 반복해서 시행한다.
                                <br />
                            </p>
                        </div>
                    </div>



                    <input type="checkbox" id="answer02" />
                    <label htmlFor="answer02">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">자동심장충격기(AED) 사용법</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                1. 자동심장충격기(AED)를 심폐소생술에 방해가 되지 않는 위치에 놓은 뒤에 전원 버튼을 눌러 전원을 켠다.

                                <br />
                                <br />

                                2. 준비된 자동심장충격기(AED)의 패드를 부착부위에 정확히 부착한다.
                                <br />
                                - 패드1 : 오른쪽 빗장뼈 바로 아래 부착
                                <br />
                                - 패드2 : 왼쪽 젖꼭지 옆 겨드랑이 부착
                                <br />
                                * 패드와 자동심장충격기 본체가 분리되어 있는 경우 연결하며, 패드 부착부위에 이물질이 있다면 제거한다.
                                <br /><br />

                                3. "분석 중...." 이라는 음성 지시가 나오면 심폐소생술을 멈추고 환자에게서 손을 뗀다.
                                <br />
                                * 자동심장충격이 필요 없는 경우에는 "환자의 상태를 확인하고, 심폐소생술을 계속 하십시오" 라는 음성 지시가 나온다.
                                <br /><br />

                                4. "쇼크 버튼을 누르십시오" 라는 음성 지시가 나오면 점멸하고 있는 쇼크 버튼을 눌러 자동심장충격을 시행한다.
                                <br />
                                * 쇼크버튼을 누르기 전에는 반드시 다른 사람이 환자에게서 떨어져 있는지 확인하여야 한다.
                                <br /><br />

                                5. 자동심장충격을 시행한 뒤에는 즉시 가슴압박과 인공호흡 비율을 30 : 2로 심폐소생술을 다시 시행한다.
                                <br />
                                * 자동심장충격기는 2분마다 심장리듬 분석을 반복해서 시행하며, <br />
                                &nbsp;&nbsp;&nbsp;자동심장충격기 사용과 심폐소생술 시행은 119구급대가 현장에 도착할 때까지 지속되어야 한다.
                                <br />
                            </p>
                        </div>
                    </div>



                    <input type="checkbox"
                        id="answer03" />
                    <label htmlFor="answer03">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">소아 심폐소생술</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                1. 심정지 확인 후 도움 및 119 신고요청
                                <br />
                                - 어깨를 흔들며 반응을 확인한다.
                                (1세 미만의 영아의 경우 발바닥을 때려 반응을 확인한다.)
                                <br />
                                - 반응이 없는 경우 주변에 사람에게 119 호출 및 자동심장충격기를 가져올 것을 요청한다.

                                (혼자인 경우 1분간 심폐소생술 시행 후 응급기관에 연락한다.)
                                <br /><br />


                                2. 가슴압박 30회 실시
                                <br />
                                - 압박할 위치는 양쪽 젖꼭지 부위를 잇는 선의 정중앙의 바로 아래부분이다.
                                <br />
                                - 한 손으로 손바닥의 아래 부위만을 환자의 흉골부위에 접촉시킨다.
                                <br />
                                - 시술자의 어깨는 환자의 흉골이 맞닿는 부위와 수직이 되게 위치한다.
                                <br />
                                - 한 손으로 1분당 100 ~ 120회 이상의 속도와 4 ~ 5cm 이상 깊이로 강하고 빠르게 30회 눌러준다.
                                <br /><br />

                                3. 영아에서의 흉부압박
                                <br />
                                - 압박할 위치는 양쪽 젖꼭지 부위를 잇는 선 정 중앙의 바로 아래 부분이다.
                                <br />
                                - 검지와 중지 또는 중지와 약지 손가락을 모은 후 첫마디 부위를 환자의 흉골부위에
                                접촉시킨다.
                                <br />
                                - 시술자의 손가락은 환자의 흉골이 맞닿는 부위와 수직이 되게 위치한다.
                                <br />
                                - 1분당 100 ~ 120회 이상의 속도와 4cm 정도의 깊이로 강하고 빠르게 30회 눌러준다.
                                <br /><br />

                                4. 인공호흡 2회 실시
                                <br />
                                - 호흡이 없으면 환아의 기도를 유지한채 1초 간 구조호흡을 한다.
                                <br />
                                - 가슴이 올라 오는 정도를 본다.
                                <br />
                                - 2회 연속 시행한다.

                                (소아의 경우 입 대 입, 영아(1세 미만)의 경우 입으로 입과 코를 막고 호흡을 한다.)
                                <br /><br />
                                5. 가슴압박과 인공호흡을 반복
                                <br />
                                - 30회의 가슴압박과 2회의 인공호흡을 119구급대원이 도착할 때까지 반복하여 시행한다.
                                <br />
                            </p>
                        </div>
                    </div>


                    <input type="checkbox"
                        id="answer04" />
                    <label htmlFor="answer04">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">성인&소아 기도폐쇄 응급처치 (하임리히법)</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                1. 상태체크 및 119신고 요청
                                <br />
                                - 환자가 숨쉬기 힘들어 하거나 목을 감싸 괴로움을 호소할 경우 기도폐쇄로 판단하고 주변에 119에 신고를 요청한다.
                                <br /><br />
                                2. 하임리히법 실시 - 의식이 있는 경우
                                <br />
                                - 환자의 등 뒤에 서서 주먹을 쥔 손의 엄지손가락 방향을 배 윗부분에 대고
                                <br /> &nbsp;&nbsp; 다른 한 손을 위에 겹친 후 환자의 배꼽에서 명치 사이의 배 부위를 두 손으로 위로 쓸어올리듯 강하게 밀어 올려서 이물을 제거하고
                                <br /> &nbsp;&nbsp; 이물이 밖으로 나왔는지 확인한다.
                                임신한 여성이나 비만이 심한 사람의 경우 가슴부위를 밀어낸다.
                                <br />
                            </p>
                        </div>
                    </div>


                    <input type="checkbox"
                        id="answer05" />
                    <label htmlFor="answer05">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">영아 기도폐쇄 응급처치 (하임리히법 실시)</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                ※영아 환자 : 1세 이하, 혹은 2세라도 체중이 10kg 이하인 환자
                                <br />
                                <br />
                                1. 자세취하기 및 119 신고요청
                                <br />
                                - 주변에 119 신고를 요청한다.
                                <br />
                                - 환자의 얼굴이 우로 향하도록 환자를 자신의 팔위에 올려놓고 손으로는 환자의 머리와 경부가 고정되도록 잡는다.
                                <br />
                                - 다음에는 다른 팔을 이용해 환자의 얼굴이 아래로 향하도록 뒤집어서(돌려서) 턱을 잡은 손이 환자를 떠받친다.
                                <br /><br />
                                2. 등 두드리기 5회
                                <br />
                                영아의 머리를 가슴보다 낮게 하고, 영아를 안은 팔을 허벅지에 고정시킨 뒤 손바닥으로 영아의 어깨죽지 사이(견갑골)를 5회 두드린다.
                                <br /><br />
                                3. 흉부압박 5회
                                <br />
                                - 영아의 등을 받치고, 머리를 가슴보다 낮게 하여, 영아를 안은 팔을 무릎 위에 놓는다.
                                <br />
                                - 영아의 유두사이에 가상선을 긋고, 검지와 중지를 흉골에 올려놓고 (심폐소생술과 비슷하나 속도 는 조금 천천히 처치를) <br />&nbsp;&nbsp;&nbsp;분명하고 확실하게 5회의 압박을 시행 한다.
                                (압박시 손가락은 가슴에서 떼지 않는다.)
                                <br /><br />

                                4. 입안의 이물질 제거
                                <br />
                                - 영아의 구강내 이물질을 확인하여 제거한다.

                                (손에 닿지 않은 이물질은 일부러 제거하지 않는다.)
                                <br />
                                - 영아가 의식을 잃거나, 이물이 배출되거나, 힘차게 숨을 쉬거나, 기침을 할 때까지 계속 반복 실시한다.
                                <br />
                                - 119구급대원이 도착할 때까지 위의 과정을 반복 시행한다.
                                <br />
                            </p>
                        </div>
                    </div>


                    <input type="checkbox"
                        id="answer06" />
                    <label htmlFor="answer06">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">눈에 이물질이 들어갔을 때</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                알갱이 종류가 들어간 경우
                                <br />
                                - 절대로 눈을 비벼서는 안 된다.
                                <br />
                                - 세수대야에 물을 담아서 얼굴을 물에 잠기게 하여 물 속에서 눈뜨기를 반복한다.
                                <br />
                                &nbsp;&nbsp;&nbsp;이때는 눈을 손으로 문지르면 안된다.
                                <br />
                                - 안되면 눈을 감은 상태로 병원으로 간다.
                                <br /><br />

                                액체 종류가 들어간 경우
                                <br />
                                - 유독한 액체나 성분미상의 액체가 눈에 튀어 들어가면, 즉시 반드시 흐르는 물을 사용하여
                                눈을 최소한 15분 정도는 씻어야 한다.
                                <br />&nbsp;&nbsp;&nbsp;주변에 수도꼭지가 없으면 병에 든 생수를 사용한다.
                                <br />
                                - 빨리 눈을 흐르는 물로 씻는 것이 무엇보다도 제일 중요하다는 사실을 잊지 않는다.
                                <br />
                                - 119에 연락하여 병원으로 가서 검진을 받아야 한다.
                                <br />
                            </p>
                        </div>
                    </div>


                    <input type="checkbox"
                        id="answer07" />
                    <label htmlFor="answer07">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">독극물을 마셨을 때</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                1. 독극물 정보 수집
                                <br />
                                - 복용한 독극물 종류 및 섭취량 등의 정보를 수집한다.
                                <br /><br />

                                2. 기도/호흡/맥박 확인
                                <br />
                                - 환자가 의식이 없는 경우에 ABC(기도/호흡/맥박)을 확인 후에 필요에 따라 처치한다.
                                <br /><br />

                                3. 회복자세
                                <br />
                                - 의식이 있는 환자의 경우 환자를 회복자세로 눕인다.
                                <br />&nbsp;&nbsp;&nbsp;회복 자세는 환자가 좌측 옆구리로 엎드려 누워있는 상태로 이 자세를 취할 때 위의 내용물이 소장으로 넘어가는 시간을 늦출 뿐만이 아니라,
                                <br />&nbsp;&nbsp;&nbsp;환자가 구토하는 경우에 기도가 막히지 않도록 한다.
                                <br /><br />

                                4. 병원이송
                                <br />
                                - 신속하게 병원으로 이송한다.
                                <br />
                            </p>
                        </div>
                    </div>


                    <input type="checkbox"
                        id="answer08" />
                    <label htmlFor="answer08">
                        <div className="quest">
                            <p className="qq">Q.</p>
                            <p className="text">저체온증</p>
                            <div className="img-box">
                                <img src={images['faqarrow.png']} />
                            </div>
                        </div>
                    </label>

                    <div className="answer">
                        <div className="answer-b">
                            <p className="aa">A.</p>
                            <p className="text">
                                - 먼저 환자를 추운 환경 원인으로부터 따뜻한 환경으로 옮긴다.
                                <br/>
                                - 젖은 옷은 벗기고 환자의 몸 전체를 담요로 감싸주며, 환자의 머리도 반드시 감싸준다.
                                &nbsp;&nbsp;&nbsp;이는 체온 소실의 50% 이상이 머리를 통해 일어나기 때문이다.
                                <br/>
                                &nbsp;&nbsp;&nbsp;(의식이 있는 경증의 환자에게는 따뜻한 물, 당분을 공급할 수도 있다.)
                                <br/>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
export default Faq;