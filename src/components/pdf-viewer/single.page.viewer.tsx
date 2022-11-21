import React, { useLayoutEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { Paragraf } from "../book-changer/book-change.type";
import BookMark from "../bookmark";
import Markup from "../markup";

const style = {
  wrapper: {
    display: 'flex',
    'flex-direction': 'row-reverse',
  },
  pagesWrapper: {
    display: 'flex',
    'flex-direction': 'row-reverse',
    'margin-top': '50px',
  },
  paragrafs: {
    paddingLeft: 30,
    paddingTop: 50,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
  },
  title: {
    marginLeft: '0',
    paddingBottom: 30
  },
  paragrafText: {
    display: 'flex',
    'justify-content': 'flex-start',
    border: 'none',
    background: '#FDEBD3',
    marginLeft: '0',
    paddingBottom: '5px',
    'text-align': 'left',
    marginTop: '10px',
  },
  homeBtn: {
    width: '230px',
    height: '30px',
    'margin-top': '70px', 
    border: 'none',
    'background-color': 'rgb(253, 235, 211)',
    'font-size': '25px',
  },
  
  homeArrow: {
    width: '30px',
    position: 'absolute',
    top: 150
  }
};

// TODO: Вынеси в отдельный компонент

export default function SinglePage(props: { pdf: string; onClick: (e: any) => void; paragrafs: Paragraf[] }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const { pdf } = props;
  
  const [isMarkupModalOpen, setIsMarkupModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  
  const createMarkup = (data: string) => {
    const localStorageMarkupData = JSON.parse(localStorage.getItem('markups' + pdf) || '{"list":[]}');
    
    if (localStorageMarkupData?.list) {
      localStorageMarkupData.list.push(data);
    } else {
      localStorage.setItem('markups' + pdf, JSON.stringify({ list: [data]}));
    }
    localStorage.setItem('markups' + pdf, JSON.stringify({ list: localStorageMarkupData.list}));
  }
  
  const createBookmarks = (data: { mark: string; pageNumber: number }) => {
    const localStorageMarkupData = JSON.parse(localStorage.getItem('bookmarks' + pdf) || '{"list":[]}');
    
    if (localStorageMarkupData?.list) {
      localStorageMarkupData.list.push(data);
    } else {
      localStorage.setItem('bookmarks' + pdf, JSON.stringify({ list: [data]}));
    }
    localStorage.setItem('bookmarks' + pdf, JSON.stringify({ list: localStorageMarkupData.list}));
  }
  
  const markaups = JSON.parse(localStorage.getItem('markups' + pdf) || '{"list":[]}')?.list;
  const bookmark = JSON.parse(localStorage.getItem('bookmarks' + pdf) || '{"list":[]}')?.list;
  
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function goToTheParagraf(e: any) {
    setPageNumber(parseInt(e.target.id));
  }

  function firstPage() {
    setPageNumber(1);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    console.log('aaa')
    changePage(1);
  }
  
  return (
    <div style={style.wrapper}>
      <div style={style.paragrafs}>
        <button onClick={() => setIsMarkupModalOpen(true)}>Открыть заметки</button>
        <button onClick={() => setIsBookmarkModalOpen(true)}>Открыть закладки</button>
        <h2 style={style.title}>Содержание</h2>
        {props.paragrafs.map((el) => <button style={style.paragrafText} id={el.page.toString()} onClick={goToTheParagraf}>
          {el.name}
        </button>
        )
        }
        <div style={{position: 'relative'}}>
          <img style={{position: 'absolute', top: '65px'}} src="./images/Home.png" alt=""/>
        <button style={style.homeBtn} onClick={props.onClick}>Вернуться</button>
        </div>
      </div>
      <div style={{position: 'relative'}}>
        <Document
          file={pdf}
          options={{ workerSrc: "./pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page width={600} height={600} pageNumber={pageNumber} />
        </Document>
        <div style={style.pagesWrapper}>
          <button type="button" disabled={pageNumber >= numPages} onClick={nextPage} style={{border: 'none', backgroundImage: 'url(images/Vector.png)', width: 67, height: 67,transform: 'rotate(180deg)'}}>
            
          </button>
          { pageNumber !== numPages ?
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              style={{border: 'none', backgroundImage: 'url(images/Vector.png)', width: 67, height: 67,backgroundColor: 'rgb(253, 235, 211)',}}
            >
              
            </button> :
            <button
              type="button"
              onClick={firstPage}
            >
              В начало
            </button>
          }
        </div>
      </div>
      <Markup isOpen={isMarkupModalOpen} onCloseClick={() => setIsMarkupModalOpen(false)} list={markaups || []} storeNewItem={createMarkup}></Markup>
      <BookMark isOpen={isBookmarkModalOpen} onCloseClick={() => setIsBookmarkModalOpen(false)} list={bookmark || []} storeNewItem={createBookmarks} changePage={changePage}></BookMark>
    </div>
  );
}
