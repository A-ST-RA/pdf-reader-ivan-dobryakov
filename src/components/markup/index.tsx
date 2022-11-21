import React, { FC } from "react"
import { useForm } from "react-hook-form";

import Modal from 'react-modal';

interface IModalProps {
    isOpen: boolean;
    onCloseClick: () => void;
    list: string[];
    storeNewItem: (mark: string) => void;
}

const Markup: FC<IModalProps> = ({ isOpen, onCloseClick, list, storeNewItem }) => {
    const {register, handleSubmit, reset} = useForm();
    
    const formSubmit = (data: any) => {
        storeNewItem(data.mark);
        reset();
    } 
    
    return (
        <Modal isOpen={isOpen}>
            <ul>
                {list.map(el => (
                    <li>{el}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit(formSubmit)}>
                <input placeholder="Текст пометки" {...register('mark')}></input>
                <button type="submit">Создать пометку</button>
            </form>
            <button onClick={onCloseClick}>Закрыть</button>
        </Modal>
    );
}

export default Markup;