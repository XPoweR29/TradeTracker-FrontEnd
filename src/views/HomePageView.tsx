import styles from './HomePageView.module.scss';
import { Slogan } from '../components/Slogan/Slogan';
import { Logo } from '../components/Logo/Logo';
import { MainBtn } from '../components/MainBtn/MainBtn';
import { FeatureList } from '../components/FeatureList/FeatureList';

export const HomePage = () => {
    return <>
        <div className={styles.wrapper}>
            <main>
                <Logo/>
                <Slogan/>

                <section className="mainBtns">
                    <MainBtn text='ZALOGUJ' dark/>
                    <MainBtn text='ZAREJESTRUJ'/>
                </section>
            </main>

            <footer>
                <FeatureList/>
            </footer>
        </div>
    </>
}

//>> Pomyśl czy nie zorbić jeszcze komponentów głownych <Main> i <Footer>. Jak dokładnie wyglądała by struktura w folderze components?