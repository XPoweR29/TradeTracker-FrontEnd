import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import styles from './RegisterForm.module.scss';

export const RegisterForm = () => {

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        pwd: '',
        confirmPwd: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(user => ({
            ...newUser, 
            [e.target.name]: e.target.value,
        }));
    }

    const sendForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(newUser);
    }

    return <>
        <div id='form' className={styles.wrapper}>
            <h2 className={styles.title}>Zarejestruj</h2>
            <form onSubmit={sendForm}>
                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<FaUserAlt/>}</span>
                    <input 
                    id='username' 
                    type="text" 
                    required placeholder=' ' 
                    name='username'
                    onChange={handleChange}
                    />
                    <label htmlFor='username'>Użytkownik</label>
                </div>

                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<FiMail/>}</span>
                    <input 
                    id='email' 
                    type="email" 
                    required placeholder=' ' 
                    name='email'
                    onChange={handleChange}/>
                    <label htmlFor='email'>Email</label>
                </div>

                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<HiOutlineLockClosed/>}</span>
                    <input 
                    id='pwd' 
                    type="password" 
                    required placeholder=' ' 
                    name='pwd'
                    onChange={handleChange}/>
                    <label htmlFor='pwd'>Hasło</label>
                </div>

                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<HiOutlineLockClosed/>}</span>
                    <input 
                    id='confirmPwd' 
                    type="password" 
                    required placeholder=' ' 
                    name='confirmPwd'
                    onChange={handleChange}
                    />
                    <label htmlFor='confirmPwd'>Potwierdź hasło</label>
                </div>

                <button 
                className={styles.confirmBtn}
                type="submit"
                >Dołącz!</button>
            </form>
        </div>
    </>
}