import styles from './HomePageView.module.scss';
import { Content } from '../../components/HomePage/Content/Content';
import { Logo } from '../../components/HomePage/Logo/Logo';
import { FeatureList } from '../../components/HomePage/FeatureList/FeatureList';
import { LoginForm } from '../../components/HomePage/LoginForm/LoginForm';
import { HomePageContext } from '../../components/Common/Contexts/HomePageContext';
import { useState } from 'react';
import { RegisterForm } from '../../components/HomePage/RegisterForm/RegisterForm';

export const HomePage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const contextValues = {
        showLoginForm, setShowLoginForm,
        showRegisterForm, setShowRegisterForm,
    }

    return ( 
        <HomePageContext.Provider value={contextValues}>
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
    )
};