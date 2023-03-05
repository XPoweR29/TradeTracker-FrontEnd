import styles from './MainBtn.module.scss';

interface Props {
    text: string;
    dark?: boolean;
    onClick?: () => void;
}

export const MainBtn = (props: Props) => {

    return <>
        <button 
        className={props.dark ? styles.dark : styles.primary}
        onClick={props.onClick}
        >{props.text}</button>
    </>
}