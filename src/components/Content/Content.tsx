import { MainBtn } from '../MainBtn/MainBtn';
import styles from './Content.module.scss';

export const Content = () => {
    return <>
        <div className={styles.content}>
            <h1>Śledź swoje pozycje i zwiększaj skuteczność!</h1>
            <p>
            TradeTracker to idealna aplikacja do śledzenia swoich transakcji i analizowania wyników inwestycyjnych. Notuj swoje pozycje, opisuj je, dodawaj zdjęcia wykresów i uskuteczniaj swoją metodę handlową w oparciu o własne wnioski. <br />
            Dołącz już teraz i zacznij kontrolować swoje inwestycje!
            </p>
            

            <section className={styles.mainBtns}>
                <MainBtn text='ZALOGUJ' dark/>
                <MainBtn text='ZAREJESTRUJ'/>
            </section>

        </div>
    </> 
}