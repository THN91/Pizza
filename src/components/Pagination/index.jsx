import React from "react";
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

function Pagination({setCurrentPage}) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(number) => setCurrentPage(number.selected + 1)}
            pageRangeDisplayed={9}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;