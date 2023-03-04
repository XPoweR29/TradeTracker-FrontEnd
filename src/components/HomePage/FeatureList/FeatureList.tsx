import { BsCardText } from 'react-icons/bs';
import { FaChartLine } from 'react-icons/fa';
import { IoStatsChartSharp } from 'react-icons/io5';
import { Feature } from '../Feature/Feature';
import styles from './FeatureList.module.scss';

export const FeatureList = () => {
    return <>
        <ul className={styles.featureList}>
            <Feature icon={<BsCardText/>} title='OPISY TRANSAKCJI' desctiption='Zapisz każdy szczegół dotyczący zawarcia twojej transakcji, wraz z emocjami które w tym czasie ci towarzyszyły'/>
            
            <Feature icon={<FaChartLine/>} title='GRAFIKA WYKRESU' desctiption='Dodaj zrzut ekranu aby lepiej zobrazować czym się kierowałeś w momencie zawierania pozycji.'/>

            <Feature icon={<IoStatsChartSharp/>} title='STATYSTYKA' desctiption='Monitoruj ma bieżąco swoją skuteczność i maksymalizuj zyski.'/>
        </ul>
    </>
}