import styles from './Settings.module.scss';
import React, {useContext, useState} from 'react';
import { AppContext } from '../../Common/Contexts/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Settings = () => {
    const {userData, setUserData} = useContext(AppContext)!;
    const [isPwdChange, setIsPwdChange] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [user, setUser] = useState({...userData, confirmPwd: ''});


    const confirmChange = async(e: React.MouseEvent) => {
            const target = e.target as HTMLButtonElement;

            if(user[target.name as keyof typeof user] === userData[target.name as keyof typeof userData]){
                toast.error('Dane muszą się różnić', {
                    position: 'bottom-center',
                    theme: 'dark',
                });
                return;
            }

            if(editUsername && !user.username){
                toast.error('Podaj nazwę użytkownika', {
                    position: 'bottom-center',
                    theme: 'dark',
                });
                return;
            }

            if(editEmail && !user.email){
                toast.error('Podaj adres e-mail', {
                    position: 'bottom-center',
                    theme: 'dark',
                });
                return;
            }

            if(isPwdChange && !user.pwd){
                toast.error('Podaj nowe hasło', {
                    position: 'bottom-center',
                    theme: 'dark',
                });
                return;
            }
    
            const fetchData = await fetch(`http://localhost:3001/user/update-${target.name}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user),
            });
    
            switch(target.name) {
                case 'username':
                    setEditUsername(false);
                    break;

                case 'email':
                    setEditEmail(false);
                    break;

                case 'pwd':
                    setIsPwdChange(false);
                    break;
            }

            const res = await fetchData.json();
            setUserData(res.user);
            
            toast.success(res.message, {
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className={styles.wrapper}>

            <div className={styles.accountSet}>
                <h1 className={styles.title}>Profil</h1>

                <div className={styles.inputBox}>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id='username' type="text" value={user.username} disabled={!editUsername} onChange={handleChange} name='username'/>
                    {!editUsername ?
                    <button onClick={()=>setEditUsername(true)}>Zmień</button>
                    :
                    <button className={styles.confirm} name='username' onClick={confirmChange}>Zapisz</button>
                    }
                </div>

                <div className={styles.inputBox}>
                    <label htmlFor="email">Email</label>
                    <input id='email' type="email" value={user.email} disabled={!editEmail} onChange={handleChange} name='email'/>
                    {!editEmail ?
                    <button onClick={()=>setEditEmail(true)}>Zmień</button>
                    :
                    <button className={styles.confirm} name='email' onClick={confirmChange}>Zapisz</button>
                    }
                </div>

                {isPwdChange && 
                <section>
                    <div className={styles.inputBox}>
                        <label htmlFor="newPwd">Nowe hasło</label>
                        <input id='newPwd' type="password" autoFocus onChange={handleChange} name='pwd'/>
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="confirmPwd">Powtórz hasło</label>
                        <input className={user.pwd!==user.confirmPwd ? styles.incorrect:''} id='confirmPwd' type="password" onChange={handleChange} name='confirmPwd'/>

                        {(user.pwd === user.confirmPwd) && 
                        <button className={styles.confirmBtn} name='pwd' onClick={confirmChange}>Zapisz nowe hasło</button>
                        }
                    </div>

                </section>
                
                }


                {!isPwdChange &&
                <button 
                    className={styles.changePwdBtn} 
                    onClick={()=>setIsPwdChange(true)}  
                    >Zmień hasło
                </button>
                }
            </div>
        </div>
    )
}