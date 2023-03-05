import styles from './HomePageView.module.scss';
import { Content } from '../components/HomePage/Content/Content';
import { Logo } from '../components/HomePage/Logo/Logo';
import { FeatureList } from '../components/HomePage/FeatureList/FeatureList';
import { LoginForm } from '../components/HomePage/LoginForm/LoginForm';
import { HomePageContext } from '../components/Common/Contexts/Contexts';
import { useState } from 'react';
import { RegisterForm } from '../components/HomePage/RegisterForm/RegisterForm';

export const HomePage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    return <>

        <HomePageContext.Provider value={{showLoginForm, setShowLoginForm, showRegisterForm, setShowRegisterForm}}>
            <div className={styles.wrapper}>
                <main>
                    <Logo/>
                    <Content/>
                    {showRegisterForm && <RegisterForm/>}
                    {showLoginForm && <LoginForm/>}
                </main>

                <footer>
                    <FeatureList/>
                </footer>
            </div>
        </HomePageContext.Provider>
    </>
}

//>> Pomyśl czy nie zorbić jeszcze komponentów głownych <Main> i <Footer>. Jak dokładnie wyglądała by struktura w folderze components?