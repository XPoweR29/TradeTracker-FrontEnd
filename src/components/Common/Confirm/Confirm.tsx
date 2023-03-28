import style from './Confirm.module.scss';

interface Props {
    message: string;
    onConfirm: () => void;
    showConfirm: (val: boolean) => void;
}

export const Confirm = (props: Props) => {
    return(
        <div className={style.wrapper}>
            <div className={style.box}>
                <h1 className={style.title}>{props.message}</h1>

                <div className={style.btnSection}>
                    <button className={style.confirm} onClick={()=>props.onConfirm()}>TAK</button>
                    <button className={style.cancel} onClick={()=>props.showConfirm(false)}>NIE</button>
                </div>
            </div>
        </div>
    );
}