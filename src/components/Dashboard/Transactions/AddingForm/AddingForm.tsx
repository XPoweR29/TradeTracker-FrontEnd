import style from './AddingForm.module.scss';
import {IoCloseSharp} from 'react-icons/io5';
import {BsCheckLg} from 'react-icons/bs';
import { useContext, useState } from 'react';
import { AppContext } from '../../../Common/Contexts/AppContext';
import { toast } from 'react-toastify';

interface Props {
    showForm: (val: boolean) => void;
    refreshList: () => void;
}



export const AddingForm = (props: Props) => {
    const {showForm} = props;
    const {userData,} = useContext(AppContext)!;
    const [newPosition, setNewPosition] = useState({
        date: new Date().toLocaleDateString('en-CA'),
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
            toast.error(err.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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
                    
                <input 
                    type="date" 
                    name='date' 
                    onChange={handleChange}
                    value={newPosition.date}
                    required/>
                <input type="text" name='market' onChange={handleChange} placeholder='WALOR'/>

                <input type="number" name='entryPrice' step='any' onChange={handleChange} placeholder='Cena wejścia'/>

                <input type="text" name='slValue' onChange={handleChange} placeholder='Wartość SL'/>

                <section className={style.btnSection}>
                    <button className={style.btn} type='submit'><BsCheckLg/></button>
                    <button className={style.btn} onClick={()=>showForm(false)}><IoCloseSharp/></button>
                </section>

            </form>
        </div>
    );
}