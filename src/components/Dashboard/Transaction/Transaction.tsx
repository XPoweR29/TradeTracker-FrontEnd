import styles from './Transaction.module.scss';

import {AiFillInfoCircle, AiTwotoneEdit} from 'react-icons/ai';
import {FaTrashAlt} from 'react-icons/fa';
import {BsFlag} from 'react-icons/bs';
import { Position } from 'types';

interface Props {
    position: Position;
}

export const Transaction = (props: Props) => {
    const {position} = props;
    const changeFlag = () => {
        //FIXME: nadpisuje flag w danych pozycji które będa tutaj dostepne z DashboardContext. W zależności od tego czy fafa bedzie false czy true będzie wyświetlana odpowiednia ikona przycisku.
    }

    return (
        <div className={styles.wrapper}>
            <section className={styles.positionInfo}>
                <span className={styles.lp}>1</span>
                <span className={styles.market}>{position.market}</span>
                <span className={styles.direction}>{position.direction}</span>
                <span className={styles.result}>{position.result}</span>
                <span className={styles.date}>{position.date}</span>
            </section>


            <section className={styles.positionTools}>
                <button className={styles.details}><AiFillInfoCircle/></button>
                <button className={styles.edit}><AiTwotoneEdit/></button>
                <button className={styles.remove}><FaTrashAlt/></button>
                <button className={styles.flag} onClick={changeFlag}><BsFlag/></button>
            </section>
        </div> 
    )
}