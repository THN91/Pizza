import React from "react";
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

function Pagination({currentPage, changePage}) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(number) => changePage(number.selected + 1)}
            pageRangeDisplayed={9}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;
