const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};
export default Pagination;