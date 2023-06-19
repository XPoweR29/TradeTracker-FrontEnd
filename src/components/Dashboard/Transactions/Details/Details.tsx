import style from './Details.module.scss';
import { TransactionContext } from '../../../Common/Contexts/TransactionContext';
import { AppContext } from '../../../Common/Contexts/AppContext';
import {IoClose} from 'react-icons/io5';
import {BsFillBackspaceFill} from 'react-icons/bs';
import { DetailsSection } from '../DetailsSection/DetailsSection';
import { useState, useContext } from 'react';
import { Position } from 'types';
import { apiUrl } from '../../../../config/api';
import { toast } from 'react-toastify';

interface Props {
    showDetails: (val: boolean) => void;
    refreshList: () => void;
}


export const Details = (props: Props) => {
    const {setIsAuthenticated} = useContext(AppContext)!;
    const {position, setPosition} = useContext(TransactionContext)!;
    const [selectedRadio, setSelectedRadio] = useState(position.result);


    const dataUpdate = async() => {

        const rawRes = await fetch(`${apiUrl}/api/positions/${position.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(position),
            credentials: 'include'
        });
        const res = await rawRes.json();
            
        if(!rawRes.ok){
            toast.error(res.message, {
                position: "top-right",
                theme: "colored",
            });
            if(rawRes.status === 401 || rawRes.status === 403) setIsAuthenticated(false);  
        };

        props.refreshList();
        props.showDetails(false);
    };

            
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

                <DetailsSection dataKind='before'/>
                <DetailsSection dataKind='after'/>

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