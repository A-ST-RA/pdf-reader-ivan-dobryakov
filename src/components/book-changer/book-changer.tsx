import React from "react"
import SinglePage from "../pdf-viewer/single.page.viewer";
import { BookChangeType } from "./book-change.type"

const style = {
    content: {
        padding: '200px 350px',
    },
    bookName: {
        display: 'flex',
        'justify-content': 'center',
        'margin-top': '10px',
        'max-wigth': '250px'
    },
    bookInfo: {
        display: 'flex',
        'flex-direction': 'column',
        border: 'none',
        'border-radius': '1%',
        width: '300px',
        height: '300px',
    },
    booksList: {
        display: 'grid',
        'grid-template-columns': '1fr 1fr 1fr',
        'grid-template-rows': '1fr 1fr 1fr',
        'grid-row-gap': '120px',
        'grid-column-gap': '10px',
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
            <div style={style.content}>
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