import style from './RemoveImgPopup.module.scss';
import {useState, useContext} from 'react';
import {IoCloseSharp} from 'react-icons/io5';
import {BsCheckLg} from 'react-icons/bs';
import { TransactionContext } from '../../../Common/Contexts/TransactionContext';
import { apiUrl } from '../../../../config/api';



interface Props {
    showPopup: (val: boolean) => void;
    when: string;
}

export const RemoveImgPopup = (props: Props) => {
    const {position, setCurrentUrls, currentUrls} = useContext(TransactionContext)!;
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const before = props.when === 'before' ? true : false;
    const allImages = before ? currentUrls.before : currentUrls.after;


    const checkToRemove = (e: React.MouseEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        
        const isSelected = selectedImages.includes(target.src);

        if(isSelected) {
            const filteredImages = selectedImages.filter(imgUrl => imgUrl !== target.src);
            setSelectedImages(filteredImages);
            target.classList.remove(style.selected);
        } 
        else {
            setSelectedImages(prevSelectedImages => [...prevSelectedImages, target.src]);
            target.classList.add(style.selected)
        }
    }

    const confirmRemove = async () => {

        selectedImages.forEach(async (imgLink) => {
            await fetch(`${apiUrl}/positions/image/${position.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                
                imgLink,
                when: before ? 'imgUrlBefore' : 'imgUrlAfter',
            }),
        });
        });

        const filteredImages = allImages.filter(img => !selectedImages.includes(img));
        const updated = currentUrls
        before ? updated.before = filteredImages : updated.after = filteredImages;
        setCurrentUrls(updated);

        props.showPopup(false);
    }
    
    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <h1>Wybierz grafiki które chcesz usunąć</h1>

                <div className={style.thumbnails}>
                    {allImages.map(img => <img src={img} onClick={checkToRemove} key={img}/>)}
                </div>

                <div className={style.btnSection}>
                    <button disabled={selectedImages.length === 0} onClick={confirmRemove}><BsCheckLg/></button>
                    <button onClick={()=>props.showPopup(false)}><IoCloseSharp/></button>
                </div>
            </div>
        </div>
    );
}