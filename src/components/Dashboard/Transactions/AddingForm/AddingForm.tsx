import style from './AddingForm.module.scss';
import {IoCloseSharp} from 'react-icons/io5';
import {BsCheckLg} from 'react-icons/bs';
import { useContext, useState } from 'react';
import { AppContext } from '../../../Common/Contexts/AppContext';

interface Props {
    showForm: (val: boolean) => void;
    refreshList: () => void;
}

export const AddingForm = (props: Props) => {
    const {showForm} = props;
    const {userData,} = useContext(AppContext)!;
    const [newPosition, setNewPosition] = useState({
        date: '',
        direction: '',
        market: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPosition(newPosition => ({
            ...newPosition, 
            [e.target.name]: e.target.value,
        }));
    }

    const sendForm = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const rawRes = await fetch('http://localhost:3001/positions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...newPosition, 
                userId: userData.id
            }),
        });
        const res = await rawRes.json();
        props.refreshList();

        if(!rawRes.ok){
            throw new Error(res.message);
        }

        showForm(false);
        }
        catch(err: any) {
            alert(err.message);
        }

        
    } 

    return(
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={sendForm}>
                <h2 className={style.title}>Dodaj pozycję</h2>

                <section className={style.directionSection}>
                    
                        <input id='buy' type="radio" name='direction' value='buy' onChange={handleChange}/>
                        <label className={style.buy} htmlFor="buy">BUY</label>
                    
                        <input id='sell' type="radio" name='direction' value='sell' onChange={handleChange}/>
                        <label className={style.sell} htmlFor="sell">SELL</label>
                </section>
                    
                <label htmlFor="date">Data</label>
                <input id='date' type="date" name='date' onChange={handleChange}/>

                <label htmlFor="market">Walor</label>
                <input id='market' type="text" name='market' onChange={handleChange}/>

                <section className={style.btnSection}>
                    <button className={style.btn} type='submit'><BsCheckLg/></button>
                    <button className={style.btn} onClick={()=>showForm(false)}><IoCloseSharp/></button>
                </section>

            </form>
        </div>
    );
}