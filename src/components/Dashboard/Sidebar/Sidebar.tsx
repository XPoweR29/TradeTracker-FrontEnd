import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import {FaThList} from 'react-icons/fa';
import {BsFillPieChartFill} from 'react-icons/bs';
import {IoSettingsSharp} from 'react-icons/io5';
import {BiLogOut} from 'react-icons/bi';

export const Sidebar = () => {
    return(
    <div className={styles.wrapper}>
        <div className={styles.logo}>Trade<strong>Tracker</strong></div>

        <section className={styles.mainSection}>
            <NavLink 
                to={'/transactions'} 
                className={({isActive}) => isActive? styles.active : ''}
            ><FaThList/><span>Transkacje</span>
            </NavLink>

            <NavLink 
                to={'/stats'} 
                className={({isActive}) => isActive? styles.active : ''}
                ><BsFillPieChartFill/><span>Statystyki</span>
            </NavLink>

            <NavLink 
                to={'/settings'} 
                className={({isActive}) => isActive? styles.active : ''}
                ><IoSettingsSharp/><span>Ustawienia</span>
            </NavLink>
        </section>

        <section className={styles.minorSection}>
            <a className={styles.contact}>Kontakt</a>
            <a className={styles.logout}><BiLogOut/> Wyloguj</a>
        </section>
    </div>
    ) 
}