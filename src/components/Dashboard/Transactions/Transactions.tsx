import {useContext} from 'react';
import { Transaction } from '../Transaction/Transaction';
import styles from './Transactions.module.scss';
import {AiOutlinePlus} from 'react-icons/ai';
import { AppContext } from '../../Common/Contexts/AppContext';

export const Transactions = () => {
    const {positions} = useContext(AppContext)!;

    return (
        <div className={styles.wrapper}>
            <button className={styles.addBtn}><AiOutlinePlus/>Dodaj pozycję</button>

            <ul className={styles.positionsList}>
                {positions && positions.map(position => <li key={position.id}><Transaction position={position}/></li>)}
            </ul>
        </div>
    ) 
}

//IMPROVE: Dodać nagłówek dla całej listy z tytuami poszczególnych kolumn