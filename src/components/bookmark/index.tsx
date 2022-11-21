import React, { FC } from "react"
import { useForm } from "react-hook-form";

import Modal from 'react-modal';

interface IModalProps {
    isOpen: boolean;
    onCloseClick: () => void;
    list: { mark: string; pageNumber: number }[];
    storeNewItem: (data: { mark: string; pageNumber: number }) => void;
    changePage: (pageNumber: number) => void;
}

const BookMark: FC<IModalProps> = ({ isOpen, onCloseClick, list, storeNewItem, changePage }) => {
    const {register, handleSubmit, reset} = useForm();
    
    const formSubmit = (data: any) => {
        storeNewItem({
            mark: data.mark,
            pageNumber: data.pageNumber
        });
        reset();
    } 
    
    return (
        <Modal isOpen={isOpen}>
            <div>
                {list.map(el => (
                    <button onClick={() => changePage(+el.pageNumber)}>{el.mark}</button>
                ))}
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
                <input placeholder="Текст пометки" {...register('mark')}></input>
                <input placeholder="Номер страницы" {...register('pageNumber')}></input>
                
                <button type="submit">Создать пометку</button>
            </form>
            <button onClick={onCloseClick}>Закрыть</button>
        </Modal>
    );
}

export default BookMark;