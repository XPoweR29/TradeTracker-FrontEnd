import style from './ImagePreview.module.scss';
import {useState} from 'react';
import {AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai';
import {IoClose} from 'react-icons/io5';

interface Props {
    showPreview: (val: boolean) => void;
    images: string[];
}

export const ImagePreview = (props: Props) => {
    const [index, setIndex] = useState(0);
    const [currentPrev, setCurrentPrev] = useState(props.images[0]);

    const changePrev = (e: React.MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement;

        if(target.value === 'prev') {
            const newIndex = index === 0 ? props.images.length - 1 : index -1;
            setIndex(newIndex);
            setCurrentPrev(props.images[newIndex]);
        }
        else if(target.value === 'next')  {
            const newIndex = index === props.images.length - 1 ? 0 : index +1;
            setIndex(newIndex);
            setCurrentPrev(props.images[newIndex]);

        } 

    }

    return (
        <div className={style.previewWrapper}>
            <button className={style.close} onClick={()=>props.showPreview(false)}><IoClose/></button>

            <button className={style.left} value='prev' onClick={changePrev}><AiFillCaretLeft/></button>
            
            <img className={style.image} src={currentPrev}/>

            <button className={style.right} value='next' onClick={changePrev}><AiFillCaretRight/></button>

            <span className={style.amount}>{`${index+1} / ${props.images.length}`}</span>
        </div>
    );
}