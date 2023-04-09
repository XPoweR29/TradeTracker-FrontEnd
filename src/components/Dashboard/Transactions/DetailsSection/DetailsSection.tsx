import style from './DetailsSection.module.scss';
import {useContext, useEffect, useState} from 'react';

import {MdModeEditOutline} from 'react-icons/md';
import {FaTrashAlt} from 'react-icons/fa';
import {FiUpload} from 'react-icons/fi';
import {BsCheckLg} from 'react-icons/bs';
import { AddImgPopup } from '../AddImgPopup/AddImgPopup';
import { TransactionContext } from '../../../Common/Contexts/TransactionContext';
import { Position } from 'types';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import { RemoveImgPopup } from '../RemoveImgPopup/RemoveImgPopup';

interface Props {
    dataKind: 'before' | 'after'
    editingNow: (val:boolean) => void,
}

export const DetailsSection = (props: Props) => {
    const {position, setPosition, currentUrls} = useContext(TransactionContext)!;
    const [addImg, setAddImg] = useState(false);
    const [removeImg, setRemoveImg] = useState(false);
    const [description, setDescription] = useState(true);
    const [imgPreview, setImgPreview] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    
    const before = props.dataKind === 'before' ? true : false;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updated: Position = {
            ...position,
            [e.target.name]: e.target.value
        } 
        setPosition(updated);
    }
    
    
    const showPreview = (e: React.MouseEvent) => {
        const img = e.target as HTMLImageElement
        img.src.length !== 0 ?setImgPreview(true) : setImgPreview(false);
    }
    
    const srcArray = before ? currentUrls.before : currentUrls.after;
    
    return (
        <section className={style.detailsWrapper}>
            <h2>
                {before ? 'OTWARCIE' : 'ZAMKNIĘCIE'}
                <button onClick={()=>setIsEditing(!isEditing)}>
                    {!isEditing ? <MdModeEditOutline/> : <BsCheckLg className={style.save}/>}
                </button>
            </h2>

            <div className={style.imgSection}>
                <button className={style.addBtn} onClick={()=>setAddImg(true)}><FiUpload/></button>
                <button className={style.removeBtn} disabled={srcArray.length===0} onClick={()=>setRemoveImg(true)}><FaTrashAlt/></button>
               
                {addImg && <AddImgPopup when={props.dataKind} showPopup={setAddImg}/>}

                {removeImg && <RemoveImgPopup when={props.dataKind} showPopup={setRemoveImg}/>}

                {imgPreview && <ImagePreview 
                                showPreview={setImgPreview} 
                                images={srcArray}
                                />}
                                

                {srcArray.length !== 0 ? 
                    <img className={style.imgBox} src={srcArray[0]} onClick={showPreview}/>
                    :
                    <div className={style.imgBox}></div>
                }
            </div>

            <div className={style.infoSection}>
                {isEditing ? 
                <>
                    <p>Cena: 
                        <input
                            type="number"
                            name={before ? 'entryPrice' : 'closePrice'} 
                            value={before ? position.entryPrice : position.closePrice}
                            onChange={handleChange} 
                            placeholder='!'
                            />
                    </p>

                    <p>{before ? 'Wartość SL:' : 'Osiągnięte RR:'} 
                        <input 
                            type={before ? 'string' : 'number'}
                            name={before ? 'slValue' : 'rr'}
                            value={before ? position.slValue : position.rr}
                            onChange={handleChange}
                            placeholder='!'
                            />
                    </p>
                </>
                :
                <>
                    <p>Cena: 
                        <span>
                            {before ? position.entryPrice : position.closePrice}
                        </span>
                    </p>

                    <p>{before ? 'Wartość SL:' : 'Osiągnięte RR:'} 
                        <span>
                            {before ? position.slValue : position.rr}
                        </span>
                    </p>
                </>    
                }
            </div>

            <div className={style.descSection}>
                <h3>Opis:</h3>
                <textarea 
                    disabled={description}
                    onChange={handleChange}
                    name={before ? 'descriptionBefore' : 'descriptionAfter'}
                    value={before ? position.descriptionBefore : position.descriptionAfter}
                    >
                        {before ? position.descriptionBefore : position.descriptionAfter}
                </textarea> 
                <button className={''} onClick={()=>setDescription(!description)}>
                    {description ? <MdModeEditOutline/> : <BsCheckLg className={style.save}/>}
                    
                </button>
            </div>

        </section>
    ); 
}