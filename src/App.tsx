import React from 'react';
import { BookChanger } from './components/book-changer/book-changer';
import { FirstBookParagrafs } from './first_book';
import { SecondBookParagrafs } from './second_paragrafs';
import { ThirdParagrafs } from './third_paragraf';

const style = {
  app: {
    background: '#FDEBD3',
    height: '100vh',
  }
}

function App() {
  const books = [
    {
      name: 'История Донского Края Книга 1',
      img: './history_of_russia_book_1/book.png',
      path: './history_of_russia_book_1/book.pdf',
      paragrafs: FirstBookParagrafs,
    },
    {
      name: 'История Донского Края Книга 2',
      img: './history_of_russia_book_2/book.png',
      path: './history_of_russia_book_2/book.pdf',
      paragrafs: SecondBookParagrafs,
    },
    {
      name: 'История Донского класса 9 класс',
      img: './history_of_russia_book_3/book.png',
      path: './history_of_russia_book_3/book.pdf',
      paragrafs: ThirdParagrafs,
    }
  ];

  return (
    <div style={style.app}>
      <BookChanger booksInfo={books} />
    </div>
  );
}

export default App;