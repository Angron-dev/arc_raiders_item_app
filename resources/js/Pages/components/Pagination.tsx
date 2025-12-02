type PaginationProps = {
    currentPage: number;
    lastPage: number;
    fetchItems: (page: number) => void;
};

export default function Pagination({ currentPage, lastPage, fetchItems }: PaginationProps) {
    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => fetchItems(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {Array.from({ length: lastPage }, (_, i) => (
                    <li
                        key={i + 1}
                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => fetchItems(i + 1)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => fetchItems(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
