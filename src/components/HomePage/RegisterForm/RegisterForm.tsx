import { FaUserAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import styles from './RegisterForm.module.scss';

export const RegisterForm = () => {
    return <>
        <div id='form' className={styles.wrapper}>
            <h2 className={styles.title}>Zarejestruj</h2>
            <form>
                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<FaUserAlt/>}</span>
                    <input id='username' type="text" required placeholder=' ' />
                    <label htmlFor='username'>Użytkownik</label>
                </div>

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

                <div className={styles.inputbox}>
                    <span className={styles.icon}>{<HiOutlineLockClosed/>}</span>
                    <input id='confirmPwd' type="password" required placeholder=' ' />
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