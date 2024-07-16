import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get(`/books/${bookId}`);
        console.log(data);
        setBook(data.book);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [bookId]);
  return (
    <div>
      {!book ? (
        <div className='container'>
          <div className='skeleton-lines'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>
          <section className='hero is-link'>
            <div className='hero-body'>
              <p className='title'>{book.title}</p>
              <p className='subtitle'>
                {book.author.firstName} {book.author.lastName}
              </p>
            </div>
          </section>
          <div className='section'>
            <div className='container'>
              <strong>Sinopsis:</strong>
              <div className='block'>{book.synopsis}</div>
            </div>
          </div>
          <div className='section'>
            <div className='container'>
              <div className='block'>{book.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
