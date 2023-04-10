import style from './AddImgPopup.module.scss';
import {BsCheckLg} from 'react-icons/bs';
import {IoCloseSharp} from 'react-icons/io5';
import {useContext, useState} from 'react';
import { TransactionContext } from '../../../../components/Common/Contexts/TransactionContext';
import { toast } from 'react-toastify';
import { apiUrl } from '../../../../config/api';

interface Props {
    showPopup: (val: boolean) => void;
    when: string;
}

export const AddImgPopup = (props: Props) => {
    const {position, currentUrls, setCurrentUrls} = useContext(TransactionContext)!;
    const [imgLink, setImgLink] = useState('');
    
    
    const sendForm = async(e: React.FormEvent) => {
        e.preventDefault();
        const before = props.when === 'before' ? true : false;
        
        const isTradingViewLink = /^https:\/\/www\.tradingview\.com\/x\/[\w/]+$/.test(imgLink);
        if(!isTradingViewLink) {
            toast.error('Podany link nie jest poprawny', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        await fetch(`${apiUrl}/positions/${position.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imgLink,
                when: before ? 'imgUrlBefore' : 'imgUrlAfter',
            }),
        });

        const updatedUrls = currentUrls;
        before ? updatedUrls.before.push(imgLink) : updatedUrls.after.push(imgLink);
        setCurrentUrls(updatedUrls);

        props.showPopup(false);
    }



    return (
        <div className={style.wrapper}>
            <form className={style.box} onSubmit={sendForm}>
                <h1>Podaj link do wykresu TradingView:</h1>
                <input type="text" required onChange={(e)=>setImgLink(e.target.value)} autoFocus/>
                <div className={style.btnSection}>
                    <button type='submit'><BsCheckLg/></button>
                    <button onClick={()=>props.showPopup(false)}><IoCloseSharp/></button>
                </div>
            </form>
        </div>
    );
}