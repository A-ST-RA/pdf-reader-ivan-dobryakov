import React from 'react';
import { BookChanger } from './components/book-changer/book-changer';
import { FirstBookParagrafs } from './first_book';
import { SecondBookParagrafs } from './second_paragrafs';
import { ThirdParagrafs } from './third_paragraf';
import { FourthBookParagrafs } from './fourth_book';
import { FifthBookParagrafs } from './fifth_book';
import { SixthBookParagrafs } from './sixth_book';

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
    },
    {
      name: 'История Донского Края Книга 3',
      img: './history_of_russia_book_4/book.png',
      path: './history_of_russia_book_4/book.pdf',
      paragrafs: FourthBookParagrafs,
    },
    {
      name: 'История Донского Края Книга 4',
      img: './history_of_russia_book_5/book.png',
      path: './history_of_russia_book_5/book.pdf',
      paragrafs: FifthBookParagrafs,
    },
    {
      name: 'История Донского Края Книга 5',
      img: './history_of_russia_book_6/book.png',
      path: './history_of_russia_book_6/book.pdf',
      paragrafs: SixthBookParagrafs,
    }
  ];

  return (
    <div style={style.app}>
      <BookChanger booksInfo={books} />
    </div>
  );
}

export default App;