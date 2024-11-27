import { useEffect, useState } from "react";
import { images } from "../../../utils/images";

const Principle = () => {
    const [activeChoice, setActiveChoice] = useState("choice01");

    const handleChoiceChange = (choiceId) => {
        setActiveChoice(choiceId);
    };

    useEffect(() => {
        const boxClasses = ['box3', 'box4', 'box5'];
        const aidNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

        boxClasses.forEach(box => {
            aidNumbers.forEach(aid => {
                const element = document.querySelector(`.${box} .aid${aid}`);
                if (activeChoice.endsWith(aid)) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        });
    }, [activeChoice]);


    useEffect(() => {
        setActiveChoice('choice01');
    }, []);

    return (
        <>
            <div id="first-aid" className="inner">

                <div className="box1">
                    <div className="text">
                        <p>상황별 응급처치</p>
                    </div>
                </div>

                <div className="box2">
                    <input type="radio" name="aid-choice" id="choice01" checked={activeChoice === 'choice01'} onChange={() => handleChoiceChange('choice01')} />
                    <label htmlFor="choice01">
                        <div className="aid01">
                            <p className="text">목에 이물질이 걸린 경우</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice02" checked={activeChoice === 'choice02'} onChange={() => handleChoiceChange('choice02')} />
                    <label htmlFor="choice02">
                        <div className="aid02">
                            <p className="text">숨을 쉬지 않는 경우</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice03" checked={activeChoice === 'choice03'} onChange={() => handleChoiceChange('choice03')} />
                    <label htmlFor="choice03">
                        <div className="aid03">
                            <p className="text">출혈</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice04" checked={activeChoice === 'choice04'} onChange={() => handleChoiceChange('choice04')} />
                    <label htmlFor="choice04">
                        <div className="aid04">
                            <p className="text">골절 및 쇼크</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice05" checked={activeChoice === 'choice05'} onChange={() => handleChoiceChange('choice05')} />
                    <label htmlFor="choice05">
                        <div className="aid05">
                            <p className="text">화상</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice06" checked={activeChoice === 'choice06'} onChange={() => handleChoiceChange('choice06')} />
                    <label htmlFor="choice06">
                        <div className="aid06">
                            <p className="text">전기 감전</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice07" checked={activeChoice === 'choice07'} onChange={() => handleChoiceChange('choice07')} />
                    <label htmlFor="choice07">
                        <div className="aid07">
                            <p className="text">일사병 / 열사병</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice08" checked={activeChoice === 'choice08'} onChange={() => handleChoiceChange('choice08')} />
                    <label htmlFor="choice08">
                        <div className="aid08">
                            <p className="text">벌에 쏘인 경우</p>
                        </div>
                    </label>

                    <input type="radio" name="aid-choice" id="choice09" checked={activeChoice === 'choice09'} onChange={() => handleChoiceChange('choice09')} />
                    <label htmlFor="choice09">
                        <div className="aid09">
                            <p className="text">뱀에 물린 경우</p>
                        </div>
                    </label>

                </div>

                <div className="box3">
                    <div className="aid01">
                        <p className="big">목에 이물질이 걸린 경우</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid02">
                        <p className="big">숨을 쉬지 않는 경우</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid03">
                        <p className="big">출혈</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid04">
                        <p className="big">골절 및 쇼크</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid05">
                        <p className="big">화상</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid06">
                        <p className="big">전기 감전</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid07">
                        <p className="big">일사병 / 열사병</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid08">
                        <p className="big">벌에 쏘인 경우</p>
                        <p className="small">(조치방법)</p>
                    </div>

                    <div className="aid09">
                        <p className="big">뱀에 물린 경우</p>
                        <p className="small">(조치방법)</p>
                    </div>
                </div>

                <div className="box4">
                    <div className="aidcover">
                        <div className="aid01">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;주변에 도움을 요청한다</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;하임리히법을 통해 이물질을 제거한다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;이물질을 뱉어 내고도 숨을 쉬지 못할 경우 심폐소생술을 실시한다.</p>
                        </div>

                        <div className="aid02">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;심정지 및 무 호흡 확인 후 도움요청 및 119 신고 한다</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;가습압박 30회 시행, 인공호흡 2회 시행, 가슴압박과 인공호흡의 반복</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;호흡이 회복되었으면 환자를 옆으로 돌려 눕혀 기도가 막히는 것을 예방한다.</p>
                        </div>

                        <div className="aid03">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;소독거즈로 상처를 완전히 덮고 압박해 지혈합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;같은 힘으로 계속 압박하며 피가 계속 날 경우, 새 드레싱을 그 위에 덮어 재 압박합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;상처부위를 심장보다 높게 들어 혈액순환 량을 줄이고 출혈이 멈추면 압박붕대를 이용해 위, 아래를 감습니다.</p>
                        </div>

                        <div className="aid04">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;주변에 부목이 될만한 물건을 찾아 처치 후 구급요원이 올 때 까지 움직이지 말아야 합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;쇼크는 담요를 바닥에 깔고 눕힌 후 다리 쪽을 높게 하고, 물과 음식물을 절대 주지 않습니다.</p>
                        </div>

                        <div className="aid05">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;흐르는 찬물에 10분 이상 상처를 대고 식혀줍니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;옷을 벗기려 하지 말고 가위로 잘라냅니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;소독거즈로 화상부위를 덮고 붕대로 느슨히 감아, 병원으로 가서 의사의 진찰을 받습니다.</p>
                        </div>

                        <div className="aid06">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;전원 차단을 확인할 때까지 행동하지 않아야 합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;의식변화에 유의해야 합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;심폐소생술, 제세동기, 쇼크, 화상처치 필요 / 쇼크 (환자의 몸이 차가워지지 않도록 주의)</p>
                        </div>

                        <div className="aid07">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;즉시 환자를 서늘한 곳으로 옮깁니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;옷을 벗기고 찬물로 몸을 적시거나 바람을 쏘입니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;물과 이온음료 등을 마시게 하여 충분한 수분 섭취를 할 수 있도록 도와줍니다. (의식이 없는 상태일 경우 섭취해서는 안 됨)</p>
                        </div>

                        <div className="aid08">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;식초나 암모니아수로 쏘인 부위의 독을 중화 / 소독 합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;벌침이 남아있는 경우 단단한 도구로 밀어 제거합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;상처를 깨끗이 씻고 통증이 있는 경우 얼음찜질을 합니다.</p>
                        </div>

                        <div className="aid09">
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;수건으로 묶어 독이 심장으로 퍼져나가지 않도록 합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;절대 입으로 독을 빼내려고 하지 말아야 합니다.</p>
                            <p>&nbsp;&nbsp;·&nbsp;&nbsp;환자가 움직이지 않도록 업거나, 들것을 이용하여
                                15분 내로 도착할 수 있는 곳으로 이동합니다.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="box5">
                    <div className="aid01">
                        <img src={images['aid_1.png']} className="img1" />
                        <img src={images['aid_2.png']} className="img2" />
                    </div>
                    <div className="aid02">
                        <img src={images['aid_3.png']} className="img1" />
                        <img src={images['aid_4.png']} className="img2" />
                    </div>
                    <div className="aid03">
                        <img src={images['aid_5.png']} className="img1" />
                        <img src={images['aid_6.png']} className="img2" />
                    </div>
                    <div className="aid04">
                        <img src={images['aid_7.png']} className="img1" />
                        <img src={images['aid_8.jpg']} className="img2" />
                    </div>
                    <div className="aid05">
                        <img src={images['aid_9.jpg']} className="img1" />
                        <img src={images['aid_8.jpg']} className="img2" />
                    </div>
                    <div className="aid06">
                        <img src={images['aid_3.png']} className="img1" />
                        <img src={images['aid_1.png']} className="img2" />
                    </div>
                    <div className="aid07">
                        <img src={images['aid_4.png']} className="img1" />
                        <img src={images['aid_2.png']} className="img2" />
                    </div>
                    <div className="aid08">
                        <img src={images['aid_7.png']} className="img1" />
                        <img src={images['aid_5.png']} className="img2" />
                    </div>
                    <div className="aid09">
                        <img src={images['aid_8.jpg']} className="img1" />
                        <img src={images['aid_6.png']} className="img2" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Principle;
