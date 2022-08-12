import { relative } from "path";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Paragraf } from "../book-changer/book-change.type";

const style = {
  wrapper: {
    display: 'flex',
    'flex-direction': 'row-reverse',
  },
  pagesWrapper: {
    display: 'flex',
    'flex-direction': 'row-reverse',
    'margin-top': '300px',
  },
  paragrafs: {
    paddingLeft: 30,
    paddingTop: 50,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
  },
  title: {
    paddingBottom: 30
  },
  paragrafText: {
    display: 'flex',
    'justify-content': 'flex-center',
    border: 'none',
    background: '#FDEBD3',
    paddingBottom: '5px',
    marginTop: '10px',
  },
  homeBtn: {
    width: '230px',
    height: '30px',
    'margin-top': '200px', 
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

export default function SinglePage(props: { pdf: string; onClick: (e: any) => void; paragrafs: Paragraf[] }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const { pdf } = props;

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
    changePage(1);
  }

  return (
    <div style={style.wrapper}>
      <div style={style.paragrafs}>
        <h2 style={style.title}>Содержание</h2>
        {props.paragrafs.map((el) => <button style={style.paragrafText} id={el.page.toString()} onClick={goToTheParagraf}>
          {el.name}
        </button>
        )
        }
        <div style={{position: 'relative'}}>
          <img style={{position: 'absolute', top: '195px'}} src="./images/Home.png" alt=""/>
        <button style={style.homeBtn} onClick={props.onClick}>Вернуться</button>
        </div>
      </div>
      <div style={{position: 'relative'}}>
        <Document
          file={pdf}
          options={{ workerSrc: "./pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div style={style.pagesWrapper}>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage} style={{border: 'none', backgroundImage: 'url(images/Vector.png)', width: 67, height: 67,transform: 'rotate(180deg)'}}>
            
          </button>
          { pageNumber !== numPages ?
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
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
        <img style={{position: 'absolute', right: '-200px', bottom: '0px'}} src="./images/Group.png" alt=""/>
      </div>
    </div>
  );
}
