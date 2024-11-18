import { images } from '../../../utils/images';
import times from '../../../constants/times';
import { sido } from '../../../constants/regions';
import { forwardRef, useEffect, useRef, useState } from 'react';

const SelectBox = ({ id }) => {
    const [selectedOption, setSelectedOption] = useState("");
    
    const sidoRef = useRef([
        if(id=="region") {

        } else {
            
        }
    ]);
    const addSidoRef = (el) => {
        sidoRef.current.push(el);
    }

    
    const options = useRef(null);

    const selectSido = (key) => {
        for(const el of sidoRef.current) {
            el.classList.remove('r17dp');
            el.classList.add('r17g');
            if(el.innerText === key) {
                el.classList.remove('r17g');
                el.classList.add('r17dp');
                el.appendChild(
                    `<div>
                        <img src={images['check14_p.png']} alt="" />
                    </div>`
                );
            }
        }
        setSelectedOption(key);
    }
    const unSelectSido = () => {

    }

    useEffect(()=>{
        switch(id) {
            case "region":
                options.current = [
                    sido.map((item)=>{
                        return (
                                <li className="r17g" key={item} ref={addSidoRef} onClick={()=>{selectSido(item);}}>{item}</li>
                        )
                    })
                ]
                break;
        }
        setSelectedOption("서울특별시");
    }, [])
    
    return (
        <>
            <section>
                <ul className="scroll-y">{ options.current }</ul>
            </section>
        </>
    );
}
export default SelectBox;