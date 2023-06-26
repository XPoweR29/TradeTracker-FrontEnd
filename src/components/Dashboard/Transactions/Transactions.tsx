import {useContext, useEffect, useState} from 'react';
import { Transaction } from './Transaction/Transaction';
import styles from './Transactions.module.scss';
import {AiOutlinePlus, AiOutlineDoubleRight, AiOutlineDoubleLeft} from 'react-icons/ai';
import { AppContext } from '../../Common/Contexts/AppContext';
import { AddingForm } from './AddingForm/AddingForm';
import { apiUrl } from '../../../config/api';
import { Loader } from '../../Common/Loader/Loader';
import {authHandleFetch } from '../../../utils/authHandleFetch';


export const Transactions = () => {
    const {positions, setPositions, setIsAuthenticated, isFilters, setIsFilters} = useContext(AppContext)!;
    const [showAddingForm, setShowAddingForm] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {getPositions()}, [currentPage]);

    const getPositions = async() => { 
        const data = await authHandleFetch(`${apiUrl}/api/positions/${currentPage}/`, setIsAuthenticated, {credentials: 'include'});
        setTotalPage(Math.ceil(data.totalCount/5));
        setPositions(data.positions);
        setIsFilters(false);
    };

    const switchPage =(e: React.MouseEvent<HTMLLIElement, MouseEvent>, current?: number) => {
        const target = e.target as HTMLLIElement;
        const liType = target.closest("li")?.dataset.type;

        if (!liType && currentPage !== current) {
            setPositions(null);
            setCurrentPage(current!);

        } else if(liType === 'prev' && currentPage !== 1){
            setPositions(null);
            setCurrentPage(prev => prev-1); 
            
        } else if(liType === 'next' && currentPage !== totalPage){
            setPositions(null);
            setCurrentPage(prev => prev+1); 
        }
    }

    return (
      <div className={styles.wrapper}>
        <button
          className={styles.addBtn}
          onClick={() => setShowAddingForm(true)}>
          <AiOutlinePlus />
          Dodaj pozycję
        </button>

        {isFilters && <a onClick={getPositions}>wyczyść filtry</a>}
        
        { positions ?
        <>
            <ul className={styles.positionsList}>
            {positions.map((position, i) => (
                <li key={position.id}>
                    <Transaction
                    posData={position}
                    index={(currentPage-1)*5+(i+1)}
                    refreshList={getPositions}
                    />
                </li>
            ))}
            </ul>
        </>
        :
        <Loader/>
        }

        { (positions && positions.length > 0) &&

        <ul className={styles.pageList}>
            <li data-type='prev' onClick={(e)=>switchPage(e)}><AiOutlineDoubleLeft/></li>
            {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                <li
                key={page}
                className= {page === currentPage ? styles.activePage : ''}
                onClick={(e) => switchPage(e, page)}
                >{page}</li>
            ))}
            <li data-type='next' onClick={(e)=>switchPage(e)}><AiOutlineDoubleRight/></li>
        </ul>
        }

        {showAddingForm && (
          <AddingForm
            showForm={setShowAddingForm}
            refreshList={getPositions}
          />
        )}
      </div>
    ); 
}