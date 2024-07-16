import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get(`/authors/${authorId}`);
        setAuthor(data.author);
        const responseBooks = await api.get(`/authors/${authorId}/books`);
        setBooks(responseBooks.data.books);
        console.log(responseBooks.data.books);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [authorId]);
  return (
    <div className='section'>
      <div className='container'>
        {author && (
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <div className='media-left'>
                  <figure className='image is-48x48'>
                    <img src={author.avatar} alt='Placeholder image' />
                  </figure>
                </div>
                <div className='media-content'>
                  <p className='title is-4'>
                    {author.firstName} {author.lastName}
                  </p>
                  <p className='subtitle is-6'>@{author.nickname}</p>
                </div>
              </div>

              <div className='content'>
                <nav className='panel is-info'>
                  <p className='panel-heading'>Libros</p>
                  <div className='panel-block'>
                    <p className='control has-icons-left'>
                      <input
                        className='input'
                        type='text'
                        placeholder='Search'
                      />
                      <span className='icon is-left'>
                        <i className='fas fa-search' aria-hidden='true'></i>
                      </span>
                    </p>
                  </div>
                  {books &&
                    books.map((book) => (
                      <Link
                        to={`/books/${book._id}`}
                        className='panel-block'
                        key={book._id}
                      >
                        <span className='panel-icon'>
                          <i className='fas fa-book' aria-hidden='true'></i>
                        </span>
                        {book.title}
                      </Link>
                    ))}
                </nav>
              </div>
            </div>
          </div>
        )}
        {!author && <div className='skeleton-block'></div>}
      </div>
    </div>
  );
};

export default Author;
