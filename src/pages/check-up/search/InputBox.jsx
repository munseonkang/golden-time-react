import { useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import Input from './Input';
import time from '../../../constants/times';
import specialty from '../../../constants/specialties';
import region from '../../../constants/regions';
import SelectBox from './SelectBox';

export default function InputBox({img, id, ...props}) {
    const [isVisible, setIsVisible] = useState(false);

    const inputBoxRef = useRef(null);
    const selectBoxRef = useRef(null);

    const showSelectBox = () => {
        setIsVisible(true);
    }
    const hideSelectBox = (e) => {
        if(inputBoxRef.current && selectBoxRef.current && !inputBoxRef.current.contains(e.target) && !selectBoxRef.current.contains(e.target)) {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', hideSelectBox);
    }, [])

    return (
        <>
            <div className="input-box" ref={inputBoxRef} onClick={showSelectBox}>
                <Input {...props}/>
                <div className="icon-box">
                    <img src={images[`${img}`]} alt="" />
                </div>
            </div>
            <div className={`select-box ${isVisible ? '' : 'hidden'}`} ref={selectBoxRef}>
                <SelectBox id={id}/>
            </div>
            {/* <div className={`select-box ${isVisible ? '' : 'hidden'}`}>
                <section>
                    <ul className="scroll-y">
                        <li className="r17dp">서울특별시
                            <div>
                                <img src={images['check14_p.png']} alt="" />
                            </div>
                        </li>
                        <li className="r17g">부산광역시</li>
                        <li className="r17g">인천광역시</li>
                    </ul>
                    <span></span>
                    <ul className="scroll-y">
                        <li className="r17dp">강남구
                            <div>
                                <img src={images['check14_p.png']} alt="" />
                            </div>
                        </li>
                        <li className="r17g">강서구</li>
                        <li className="r17g">서초구</li>
                    </ul>
                </section>
            </div> */}
        </>
    );
}