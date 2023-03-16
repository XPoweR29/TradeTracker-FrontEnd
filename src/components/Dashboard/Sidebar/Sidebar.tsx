import {useContext} from 'react';
import { NavLink} from 'react-router-dom';
import styles from './Sidebar.module.scss';
import {FaThList} from 'react-icons/fa';
import {BsFillPieChartFill} from 'react-icons/bs';
import {IoSettingsSharp} from 'react-icons/io5';
import {BiLogOut} from 'react-icons/bi';
import { AppContext } from '../../Common/Contexts/AppContext';

interface Props {
    setTitle: (val: string) => void;
}

export const Sidebar = (props: Props) => {
    const {setIsAuthenticated} = useContext(AppContext)!;

    return(
    <div className={styles.wrapper}>
        <div className={styles.logo}>Trade<strong>Tracker</strong></div>

        <section className={styles.mainSection}>
            <NavLink 
                to={'./transactions'} 
                className={({isActive}) => isActive? styles.active : ''}
                onClick={()=>props.setTitle('TRANSAKCJE')}
            ><FaThList/><span>Transkacje</span>
            </NavLink>

            <NavLink 
                to={'/dashboard/stats'} 
                className={({isActive}) => isActive? styles.active : ''}
                onClick={()=>props.setTitle('STATYSTYKI')}
                ><BsFillPieChartFill/><span>Statystyki</span>
            </NavLink>

            <NavLink 
                to={'/dashboard/settings'} 
                className={({isActive}) => isActive? styles.active : ''}
                onClick={()=>props.setTitle('USTAWIENIA')}
                ><IoSettingsSharp/><span>Ustawienia</span>
            </NavLink>
        </section>

        <section className={styles.minorSection}>
            <a className={styles.contact}>Kontakt</a>
            <a className={styles.logout} onClick={()=>setIsAuthenticated(false)}><BiLogOut/> Wyloguj</a>
        </section>
    </div>
    ) 
}