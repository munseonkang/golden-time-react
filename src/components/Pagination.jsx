const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {

    // 페이지 번호 생성
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        const halfVisible = Math.floor(maxVisible / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // 시작 1, 끝 페이지 조정
        if (endPage - startPage + 1 < maxVisible) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisible - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxVisible + 1);
            }
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    // 페이지 변경
    const handlePageChange = (page) => {
        if(page !== "..." && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="pagination">
            <button 
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                &lt;
            </button>
            {generatePageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`page-button ${page === currentPage ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                    style={{ backgroundColor: page === currentPage ? '#154757' : 'transparent'}}
                >
                    {page}
                </button>
            ))}
            <button 
                className="pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </div>
    );
};
export default Pagination;