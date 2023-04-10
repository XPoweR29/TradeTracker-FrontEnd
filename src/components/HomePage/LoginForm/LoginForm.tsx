import styles from './LoginForm.module.scss';
import {HiOutlineLockClosed} from 'react-icons/hi';
import {FiMail} from 'react-icons/fi';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Common/Contexts/AppContext';
import { toast } from 'react-toastify';
import { apiUrl } from '../../../config/api';

export const LoginForm = () => {
    
    const [user, setUser] = useState({email: '', pwd: ''});
    const {setIsAuthenticated, setUserData} = useContext(AppContext)!;
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user, 
            [e.target.name]: e.target.value,
        }));
    }

    const sendForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const rawRes = await fetch(`${apiUrl}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await rawRes.json();
             
            if(!rawRes.ok) {
                throw new Error(res.message);
            };
            
            setIsAuthenticated(true);
            setUserData(res);
            navigate('/dashboard/transactions', {replace: true});
        } 
        
        catch (err: any) {
            console.error(err)
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
        }
    }

    return <>
        <div id='form' className={styles.wrapper}>
            <h2 className={styles.title}>Zaloguj</h2>
            <form onSubmit={sendForm}>
                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<FiMail/>}</span>
                    <input 
                    id='email'
                    type="email" 
                    required 
                    placeholder=' ' 
                    name='email'
                    onChange={handleChange}
                    />
                    <label htmlFor='email'>Email</label>
                </div>

                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<HiOutlineLockClosed/>}</span>
                    <input 
                    id='pwd' 
                    type="password" 
                    required 
                    placeholder=' ' 
                    name='pwd'
                    onChange={handleChange}
                    />
                    <label htmlFor='pwd'>Hasło</label>
                </div>

                <button 
                className={styles.confirmBtn}
                type="submit"
                >Zaloguj</button>
            </form>
        </div>
    </>
}