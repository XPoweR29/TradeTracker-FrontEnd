import styles from '../Statistics.module.scss';
import {useContext,} from 'react';
import { AppContext } from '../../../Common/Contexts/AppContext';

import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const Effectivness = () => {
    const {positions} = useContext(AppContext)!;
    
    const posResults = {
        profits: (positions?.filter(pos => pos.result === 'zysk') ?? []).length,
        be: (positions?.filter(pos => pos.result === 'be') ?? []).length,
        losses: (positions?.filter(pos => pos.result === 'strata') ?? []).length,
    };
    
    const sumRR = (positions ?? []).reduce((prev, {rr}) => {return prev + rr!}, 0);
    const avgRR = ((sumRR / ((positions?.filter(pos => pos.rr !==0 && pos.rr !==null))?.length ?? 0)).toFixed(1));
    const effectivness = Number(((posResults?.profits / (posResults?.losses+posResults?.profits))*100).toFixed(0));

const data = {
    labels: [`Zyskowne`, `Stratne`, `BreakEven`],
    datasets: [{
        data: [posResults.profits, posResults.losses, posResults.be],
        backgroundColor: ['rgb(77, 199, 124)', 'rgb(180, 66, 66)', 'rgb(177, 168, 48)'],
        borderColor: ['rgb(77, 199, 124)', 'rgb(180, 66, 66)', 'rgb(177, 168, 48)'],
        spacing: 15,
    }],
}

const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: any, arg: any, pluginOptions: any) {
        const {ctx, data} = chart;
        const innerTxt = isNaN(effectivness) ? '- - -' : `${effectivness}%`
            
    ctx.save();
    ctx.font = 'bolder 5em sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(

        innerTxt, 
        chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y 
            
    )
    }
}

const options: ChartOptions<'doughnut'> = {
    plugins: {
        legend: {
            display: false,
        }
    },

    elements: {
        arc: {
            borderRadius: 100,
        }
    },

    cutout: 130,
}


return (
    <div className={styles.effectivness}>
        <h1 className={styles.title}>Skuteczność ogólna</h1>
        <Doughnut className={styles.circleChart} data={data} options={options} plugins={[textCenter]}/>

        <div className={styles.legend}>
            <p>Zyskowne: <span>{posResults.profits}</span></p>
            <p>Stratne: <span>{posResults.losses}</span></p>
            <p>BreakEven: <span>{posResults.be}</span></p>
        </div>

        <div className={styles.rr}>
            <h1 className={styles.title}>Średni stosunek zystk / strata:</h1>
            <span className={styles.avgRR}>{avgRR === 'NaN' ? '- - -' : avgRR}</span>
        </div>
    </div>
);
}