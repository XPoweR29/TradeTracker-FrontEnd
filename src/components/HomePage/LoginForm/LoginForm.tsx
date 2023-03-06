import styles from './LoginForm.module.scss';

import {HiOutlineLockClosed} from 'react-icons/hi';
import {FiMail} from 'react-icons/fi';
import React, { useState } from 'react';

export const LoginForm = () => {
    
    const [user, setUser] = useState({email: '', pwd: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user, 
            [e.target.name]: e.target.value,
        }));
    }

    const sendForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
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