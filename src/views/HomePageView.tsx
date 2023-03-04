import styles from './HomePageView.module.scss';
import { Content } from '../components/HomePage/Content/Content';
import { Logo } from '../components/HomePage/Logo/Logo';
import { FeatureList } from '../components/HomePage/FeatureList/FeatureList';

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