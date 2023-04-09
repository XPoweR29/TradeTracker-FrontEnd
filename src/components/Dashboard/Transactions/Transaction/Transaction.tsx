import styles from './Transaction.module.scss';

import { CurrUrls, TransactionContext } from '../../../Common/Contexts/TransactionContext';
import {AiFillInfoCircle, AiTwotoneEdit, AiOutlineCheck} from 'react-icons/ai';
import {FaTrashAlt} from 'react-icons/fa';
import {BsFlag, BsFlagFill} from 'react-icons/bs';
import { Position } from 'types';
import { useState } from 'react';
import { Confirm } from '../../../Common/Confirm/Confirm';
import { Details } from '../Details/Details';

interface Props {
    posData: Position;
    index: number;
    refreshList: () => void;
}

export const Transaction = (props: Props) => {
    const refresh = props.refreshList;
    const [position, setPosition] = useState(props.posData);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isFlagChecked, setIsFlagChecked] = useState(position.flag);
    const [currentUrls, setCurrentUrls] = useState<CurrUrls>({
        before: JSON.parse(position.imgUrlBefore!),
        after: JSON.parse(position.imgUrlAfter!),
    });

    const changeFlag = async() => {
        const newFlag = !isFlagChecked ? 1 : 0;
        setIsFlagChecked(newFlag);
        await fetch(`http://localhost:3001/positions/${position.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({flag: newFlag}),
        });
        props.refreshList();
    }


    const remove = async() => {
        try {
            const rawRes = await fetch(`http://localhost:3001/positions/${position.id}`,{
            method: 'DELETE',
            });
            const res = await rawRes.json();

            if(!rawRes.ok) {
                throw new Error(res.message);
            }

            setShowConfirm(false);
            props.refreshList();
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(position => ({
            ...position, 
            [e.target.name]: e.target.value,
        }));
    }

    const edit = async() => {
        setIsEditing(!isEditing);

        if(isEditing){
            await fetch(`http://localhost:3001/positions/${position.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(position),
            });
            props.refreshList();
        }
    }

    const contextValues = {
        position, setPosition, 
        currentUrls, setCurrentUrls,
        refresh,
    };

    return (
        <TransactionContext.Provider value={contextValues}>
        <div className={styles.wrapper}>
            <section className={styles.positionInfo}>
                <span className={styles.lp}>{props.index}</span>
                {isEditing ? 
                <>
                    <input className={styles.market} 
                        value={position.market} 
                        name='market'
                        onChange={handleChange}
                        />
                    <input className={styles.direction} 
                        value={position.direction} 
                        name='direction'
                        pattern='BUY | SELL'
                        title='Wprowadź wartość BUY lub SELL'
                        onChange={handleChange}
                        />
                    <span className={styles[position.result!]}>{position.result !== "" ? position.result : '- - -'}</span>
                    <input className={styles.date} 
                        type='date' 
                        value={position.date} 
                        name='date' 
                        onChange={handleChange}
                    />
                </>
                
            :
                <>
                    <span className={styles.market}>{position.market}</span>
                    <span className={styles.direction}>{position.direction}</span>
                    <span className={styles[position.result!]}>{position.result !== "" ? position.result : '- - -'}</span>
                    <span className={styles.date}>{position.date}</span>
                    
                </>
            }
            </section>


            <section className={styles.positionTools}>
                <button className={styles.details} onClick={()=>setShowDetails(true)}><AiFillInfoCircle/></button>
                <button className={isEditing ? styles.edit: ''} 
                    onClick={()=>edit()}>
                    {isEditing ? <AiOutlineCheck/> : <AiTwotoneEdit/>}
                </button>
                
                <button className={styles.remove} onClick={()=>setShowConfirm(true)}><FaTrashAlt/></button>
                <button className={styles.flag} onClick={()=> changeFlag()}>
                    {isFlagChecked ? <BsFlagFill color='orange'/> : <BsFlag/>}
                </button>
            </section>

            {showDetails && <Details
                refreshList={props.refreshList} 
                showDetails={setShowDetails}/>}

            {showConfirm && 
            <Confirm 
            message='Czy napewno chcesz usunąć pozycję?' 
            onConfirm={remove} 
            showConfirm={setShowConfirm}/>}
        </div> 
        </TransactionContext.Provider> 
    )
}