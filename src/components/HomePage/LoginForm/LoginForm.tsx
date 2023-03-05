import styles from './LoginForm.module.scss';

import {HiOutlineLockClosed} from 'react-icons/hi';
import {FiMail} from 'react-icons/fi';

export const LoginForm = () => {
    return <>
        <div id='form' className={styles.wrapper}>
            <h2 className={styles.title}>Zaloguj</h2>
            <form>
                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<FiMail/>}</span>
                    <input id='email' type="email" required placeholder=' ' />
                    <label htmlFor='email'>Email</label>
                </div>

                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<HiOutlineLockClosed/>}</span>
                    <input id='pwd' type="password" required placeholder=' ' />
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