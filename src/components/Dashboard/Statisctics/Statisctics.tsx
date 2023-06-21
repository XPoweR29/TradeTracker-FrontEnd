import { useContext, useEffect } from 'react';
import { AppContext } from '../../Common/Contexts/AppContext';
import { apiUrl } from '../../../config/api';
import { MonthlyChart } from './AllTimeChart/MonthlyChart';
import { Effectivness } from './Effectivness/Effectivness';
import styles from './Statistics.module.scss';
import { PositionStats } from 'types';

export const Statistics = () => {
    const {setPositionsStats} = useContext(AppContext)!;
    useEffect(() => {
        (async() => {
            const rawRes = await fetch(`${apiUrl}/api/positions/all`, {credentials: 'include'});
            const data: PositionStats[] = await rawRes.json();
            setPositionsStats(data);
        })(); 
    }, []);

    return (
        <div className={styles.wrapper}>
                <MonthlyChart/>
                <Effectivness/>
        </div>

    )
}