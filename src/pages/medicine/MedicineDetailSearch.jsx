const MedicineDetailSearch = ({ onSearch }) => {

    // 사용자 입력 수집
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = {
            query: formData.get('query'),
            company: formData.get('company'),
            ingredient: formData.get('ingredient'),
            effect: formData.get('effect'),
            type: formData.get('type') || '전체',
            form: formData.get('form') || '전체',
        };

        onSearch(formValues);
    };

    return (
        <div className="ddetail-search">
            <div className="ddetail-title">
                <h3>의약품 상세검색</h3>
                <p>
                    상세검색에서 각 항목에 검색어를 입력한 후 검색 버튼을 클릭하면 해당 조건에 맞는 내용이 검색됩니다. 여러 항목을 동시에 검색할 수 있습니다.
                </p>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="dform-row">
                    <label>제품명<br />(한글/영문)</label>
                    <input type="text" name="query" id="" />
                    <label>성분명<br />(한글/영문)</label>
                    <input type="text" name="ingredient" id="" />
                </div>
                <div className="dform-row">
                    <label>회사명</label>
                    <input type="text" name="company" id="" />
                    {/* <label>효능효과</label>
                    <input type="text" name="effect" id="" /> */}
                    <label>제형</label>
                    <select name="form" id="">
                        <option value="전체">전체</option>
                        <option value="정제">정제</option>
                        <option value="액상">액상</option>
                        <option value="산제">산제</option>
                        <option value="다층정">다층정</option>
                        <option value="경질캡슐제">경질캡슐제</option>
                        <option value="필름코팅정">필름코팅정</option>
                    </select>
                </div>
                <div className="dform-row checkbox">
                    <label>구분</label>
                    <div className="check">
                        <input type="radio" name="type" id="전체" value="전체" />
                        <label htmlFor="전체">전체</label>
                        <input type="radio" name="type" id="일반" value="일반의약품" />
                        <label htmlFor="일반">일반</label>
                        <input type="radio" name="type" id="전문" value="전문의약품" />
                        <label htmlFor="전문">전문</label>
                    </div>
                </div>
                <div className="dbutton-row">
                    <button type="reset" className="dreset-button">초기화</button>
                    <button type="submit" className="dsubmit-button">검색</button>
                </div>
            </form>
        </div>
    )
}
export default MedicineDetailSearch;