import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Paragraf } from "../book-changer/book-change.type";

const style = {
  wrapper: {
    display: 'flex',
  },
  paragrafs: {
    paddingLeft: 30,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'overflow-y': 'scroll',
    height: '100vh',
  },
  paragrafText: {
    display: 'flex',
    'justify-content': 'flex-center',
    border: 'none',
    background: '#FDEBD3',
    paddingBottom: '5px',
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
      <button onClick={props.onClick}>Home</button>
      <div style={style.paragrafs}>
        <h2>Содержание</h2>
        {props.paragrafs.map((el) => <button style={style.paragrafText} id={el.page.toString()} onClick={goToTheParagraf}>
          {el.name}
        </button>)}
      </div>
      <div>
        <Document
          file={pdf}
          options={{ workerSrc: "./pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div style={style.wrapper}>
          <p>
            Страница {pageNumber || (numPages ? 1 : "--")} из {numPages || "--"}
          </p>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Назад
          </button>
          { pageNumber !== numPages ?
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Далее
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
    </div>
  );
}
