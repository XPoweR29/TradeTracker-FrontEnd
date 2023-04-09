import React, { useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { toast } from 'react-toastify';
import styles from './RegisterForm.module.scss';

export const RegisterForm = () => {

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        pwd: '',
        confirmPwd: '',
    });

    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(user => ({
            ...newUser, 
            [e.target.name]: e.target.value,
        }));
    }

    const sendForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const rawRes = await fetch('http://localhost:3001/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            });
            const res = await rawRes.json();

            if(!rawRes.ok) {
                throw new Error(res.message);
            };

            toast.success(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            formRef.current?.reset();
        }
        catch(err: any) {
            console.error(err.message)
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
            <h2 className={styles.title}>Zarejestruj</h2>
            <form ref={formRef} onSubmit={sendForm}>
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