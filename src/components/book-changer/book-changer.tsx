import React from "react"
import SinglePage from "../pdf-viewer/single.page.viewer";
import { BookChangeType } from "./book-change.type"

const style = {
    bookName: {
        display: 'flex',
        'justify-content': 'center',
    },
    bookInfo: {
        display: 'flex',
        'flex-direction': 'column',
        background: '#FDEBD3',
        border: 'none',
        'border-radius': '1%',
        height: '300px',
    },
    booksList: {
        display: 'flex',
        'align-items': 'center',
        'flex-direction': 'row',
        'justify-content': 'space-around'
    }
};

export const BookChanger = (props: {booksInfo: BookChangeType[]}) => {
    const [bookPath, setBookPath] = React.useState();
    const openPdf = (e: any) => setBookPath(e.target.id);

    const getParagrafsListByPath = (bookPath: string) =>
        props.booksInfo[props.booksInfo
            .findIndex(el => el.path === bookPath)]
                .paragrafs;

    return bookPath ? 
            <SinglePage pdf={bookPath} paragrafs={getParagrafsListByPath(bookPath)} onClick={openPdf}/> : 
            <div>
                <div style={style.booksList}>
                    {
                        props.booksInfo.map((el: BookChangeType) => 
                            <button style={style.bookInfo} key={el.path} id={el.path} onClick={openPdf}>
                                <img style={style.bookInfo} id={el.path} src={el.img} onClick={openPdf} alt='png'/> 
                                <h3 style={style.bookName} id={el.path} onClick={openPdf}>{el.name}</h3>
                            </button>)
                    }
                </div>
            </div>
}