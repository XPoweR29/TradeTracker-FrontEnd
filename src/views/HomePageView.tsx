import styles from './HomePageView.module.scss';
import { Content } from '../components/Content/Content';
import { Logo } from '../components/Logo/Logo';
import { MainBtn } from '../components/MainBtn/MainBtn';
import { FeatureList } from '../components/FeatureList/FeatureList';

export const HomePage = () => {
    return <>
        <div className={styles.wrapper}>
            <main>
                <Logo/>
                <Content/>
            </main>

            <footer>
                <FeatureList/>
            </footer>
        </div>
    </>
}

//>> Pomyśl czy nie zorbić jeszcze komponentów głownych <Main> i <Footer>. Jak dokładnie wyglądała by struktura w folderze components?