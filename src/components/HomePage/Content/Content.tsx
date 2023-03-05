import { useContext } from 'react';
import { HomePageContext } from '../../Common/Contexts/Contexts';
import { MainBtn } from '../../Common/MainBtn/MainBtn';
import styles from './Content.module.scss';

export const Content = () => {

    const {setShowLoginForm} = useContext(HomePageContext)!;

    return <>
        <div className={styles.content}>
            <h1>Śledź swoje pozycje i zwiększaj skuteczność!</h1>
            <p>
            TradeTracker to idealna aplikacja do śledzenia swoich transakcji i analizowania wyników inwestycyjnych. Notuj swoje pozycje, opisuj je, dodawaj zdjęcia wykresów i uskuteczniaj swoją metodę handlową w oparciu o własne wnioski. <br />
            Dołącz już teraz i zacznij kontrolować swoje inwestycje!
            </p>
            

            <section className={styles.mainBtns}>
                <MainBtn text='ZALOGUJ' dark onClick={()=>setShowLoginForm(true)}/>
                <MainBtn text='ZAREJESTRUJ'/>
            </section>

        </div>
    </> 
}