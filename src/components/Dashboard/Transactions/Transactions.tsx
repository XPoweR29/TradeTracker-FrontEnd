import {useContext, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import { Transaction } from './Transaction/Transaction';
import styles from './Transactions.module.scss';
import {AiOutlinePlus, AiOutlineDoubleRight, AiOutlineDoubleLeft} from 'react-icons/ai';
import { AppContext } from '../../Common/Contexts/AppContext';
import { AddingForm } from './AddingForm/AddingForm';

interface Props {
    refreshList: () => void;
}

export const Transactions = (props: Props) => {
    const {positions} = useContext(AppContext)!;
    const [showAddingForm, setShowAddingForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage] = useState(5);

    const pagesVisited = currentPage * itemsPerPage;
    

    const validatePageNumber = (pageNumber: number) => {
        if (pageNumber < 0) {
            return 0;
        } 
        else if (pageNumber >= pageCount) {
            return pageCount - 1;
        } 
        else {
            return pageNumber;
        }
    };

    const changePage = ({selected}: {selected: number}) => {
      setCurrentPage(selected);
    };

    useEffect(() => {
        if(positions && positions.length > 0) {
            setPageCount(Math.ceil(positions.length / itemsPerPage));
        }

        setCurrentPage(validatePageNumber(pageCount - 1));   
    }, [positions]);
    

    return (
        <div className={styles.wrapper}>
            <button className={styles.addBtn} onClick={()=>setShowAddingForm(true)}><AiOutlinePlus/>Dodaj pozycję</button>


            <ul className={styles.positionsList}>
                { positions && positions
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((position, i) => (
                    <li key={position.id}>
                    <Transaction posData={position} index={pagesVisited + i + 1} refreshList={props.refreshList}/>
                    </li>))}
            </ul>
        
            {positions && positions.length > 5 &&
                <ReactPaginate
                    previousLabel={<AiOutlineDoubleLeft/>}
                    nextLabel={<AiOutlineDoubleRight/>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    forcePage={currentPage}
                    containerClassName={styles.pagination}
                    previousLinkClassName={styles.previous}
                    nextLinkClassName={styles.next}
                    disabledClassName={styles.disabled}
                    activeClassName={styles.active}
                />
            }

            {showAddingForm && <AddingForm showForm={setShowAddingForm} refreshList={props.refreshList}/>}
        </div>
    ) 
}

//IMPROVE: Dodać nagłówek dla całej listy z tytuami poszczególnych kolumn