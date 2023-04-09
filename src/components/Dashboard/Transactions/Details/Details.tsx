import style from './Details.module.scss';
import {IoClose} from 'react-icons/io5';
import {BsFillBackspaceFill} from 'react-icons/bs';
import { DetailsSection } from '../DetailsSection/DetailsSection';
import { useState, useContext } from 'react';
import { TransactionContext } from '../../../Common/Contexts/TransactionContext';
import { Position } from 'types';

interface Props {
    showDetails: (val: boolean) => void;
    refreshList: () => void;
}


export const Details = (props: Props) => {
    const {position, setPosition} = useContext(TransactionContext)!;
    const [selectedRadio, setSelectedRadio] = useState(position.result);
    const [editing, setEditing]  = useState(false);


    const dataUpdate = async() => {
        await fetch(`http://localhost:3001/positions/${position.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(position),
        });

        props.refreshList();
        props.showDetails(false);
    }

            
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedRadio(e.target.value);
        const updated: Position = {
            ...position,
            [e.target.name]: e.target.value
        } 
        setPosition(updated);
    }


    return (
        <div className={style.wrapper}>
            <button className={style.closeBtn} onClick={dataUpdate}><IoClose/></button>
            <div className={style.detailsBox}>
                <h1 className={style.title}>Szczegóły transakcji</h1>

                <DetailsSection editingNow={setEditing} dataKind='before'/>
                <DetailsSection editingNow={setEditing} dataKind='after'/>

                <div className={style.result}>
                    <p>Wynik transakcji:</p>
                    <input 
                        id='profit' 
                        type="radio" 
                        name='result' 
                        value='zysk'
                        checked={selectedRadio === 'zysk'}
                        onChange={handleChange}
                        />
                    <label className={style.profit} htmlFor="profit">Zysk</label>

                    <input 
                        id='be' 
                        type="radio" 
                        name='result' 
                        value='be'
                        checked={selectedRadio === 'be'}
                        onChange={handleChange}
                        />
                    <label className={style.be} htmlFor="be">BE</label>

                    <input 
                        id='loss' 
                        type="radio" 
                        name='result' 
                        value='strata' 
                        checked={selectedRadio === 'strata'}
                        onChange={handleChange}
                        />
                    <label className={style.loss} htmlFor="loss">Strata</label>
                    
                    <input 
                        id='erase' 
                        type="radio" 
                        name='result' 
                        value='' 
                        onChange={handleChange}
                        />
                    <label className={style.erase} htmlFor="erase"><BsFillBackspaceFill/></label>

                </div>
            </div> 
        </div>
    );
}