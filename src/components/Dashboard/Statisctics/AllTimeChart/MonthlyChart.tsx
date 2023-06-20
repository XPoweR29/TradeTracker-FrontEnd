import styles from '../Statistics.module.scss';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartData, ChartOptions} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useContext, useState } from 'react';
import { AppContext } from '../../../Common/Contexts/AppContext';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
);

enum Month {
    jan = '01',feb = '02',mar = '03',apr = '04',may = '05',jun = '06',
    jul = '07',aug = '08',sep = '09',oct = '10',nov = '11',dec = '12',
}

export const MonthlyChart = () => {
    const {positions} = useContext(AppContext)!;
    const [selectedYear, setSeletcedYear] = useState((new Date().getFullYear()).toString());

    const years = positions?.map(pos => pos.date.substring(0, 4));
    const uniqueYears = positions?.length === 0 ? [] : [...new Set(years)];
    

    const monthlyEff = (month: Month) => {
        const yearPositions = positions?.filter(pos => pos.date.includes(selectedYear));
        const monthlyPosition = yearPositions?.filter(pos => pos.date.slice(5,7) === month);

        const posResults = {
            profits: monthlyPosition?.filter(pos => pos.result === 'zysk').length,
            be: monthlyPosition?.filter(pos => pos.result === 'be').length,
            losses: monthlyPosition?.filter(pos => pos.result === 'strata').length
        };
        
        const eff = Number(((posResults?.profits! / (posResults?.losses! + posResults?.profits!))*100).toFixed(0));
        
        return ({
            ...posResults,
            effectivness: eff
        });
    };

    const data: ChartData<'bar', number[], string> = {
        labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Lis', 'Gru'],
        datasets: [{
            data: [
                monthlyEff(Month.jan).effectivness,
                monthlyEff(Month.feb).effectivness,
                monthlyEff(Month.mar).effectivness,
                monthlyEff(Month.apr).effectivness,
                monthlyEff(Month.may).effectivness,
                monthlyEff(Month.jun).effectivness,
                monthlyEff(Month.jul).effectivness,
                monthlyEff(Month.aug).effectivness,
                monthlyEff(Month.sep).effectivness,
                monthlyEff(Month.oct).effectivness,
                monthlyEff(Month.nov).effectivness,
                monthlyEff(Month.dec).effectivness,
            ],
            backgroundColor: 'rgb(125, 170, 0, 0.5)',
            borderColor: 'black',
            borderWidth: 2, 
        }],
    };

    const options: any= {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    callback: (value: any) => value.toString() + '%',
                    color: 'whitesmoke'
                }
            },

            x: {
                ticks: {
                    color: 'whitesmoke',
                }
            }
        }
    }

    return (
        <div className={styles.chartWrapper}>

            <section>
                <h1 className={styles.title}>Skutecznosć w poszczególnych miesiącah</h1>
                <select id="yearSelect" value={selectedYear} onChange={(e)=>setSeletcedYear(e.target.value)}>
                    {uniqueYears.map((year, i) => <option key={i} value={year}>{year}</option>)}
                </select>
            </section>
            
            <Bar
                className={styles.chart}
                data={data}
                options={options}
            />
        </div>
    );
}