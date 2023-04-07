import { MonthlyChart } from './AllTimeChart/MonthlyChart';
import { Effectivness } from './Effectivness/Effectivness';
import styles from './Statistics.module.scss';

export const Statistics = () => {

    return (
        <div className={styles.wrapper}>
                <MonthlyChart/>
                <Effectivness/>
        </div>

    )
}