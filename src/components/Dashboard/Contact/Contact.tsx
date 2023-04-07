import { Logo } from '../../HomePage/Logo/Logo';
import styles from './Contact.module.scss';
import {AiFillLinkedin, AiFillFacebook, AiFillTwitterSquare} from 'react-icons/ai';


export const Contact = () => {
    return (
        <div className={styles.wrapper}>
            <Logo />
            <h1>SKONTAKTUJ SIĘ Z NAMI</h1>

            <div className={styles.card}>
                <p>Adres: <span>ul. Świętego Jana 10/2, 40-001 Katowice, Polska</span></p>
                <p>E-mail: <span>kontakt@tradetracker.com</span></p>
                <p>Infolinia: <span>+48 580-545-498</span></p>
            </div>

            <div className={styles.links}>
                <a href='https://www.facebook.pl' target='_blank'><AiFillFacebook/></a>
                <a href='https://www.linkedin.com' target='_blank'><AiFillLinkedin/></a>
                <a href='https://www.twitter.com' target='_blank'><AiFillTwitterSquare/></a>
            </div>
        </div>
    );
}