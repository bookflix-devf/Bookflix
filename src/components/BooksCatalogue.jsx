import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
const BooksCatalogue = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get(
        `/books?offset=${(currentPage - 1) * 10}&searchTerm=${query}`
      );

      const { paginationInfo } = data;
      console.log(data);
      setBooks(data.books);
      setTotalPages(paginationInfo.totalPages);
      setCurrentPage(paginationInfo.currentPage);
      const tmpPages = [];
      for (let i = 0; i < paginationInfo.totalPages; i++) {
        tmpPages.push(i);
      }
      setPages(tmpPages);
    };

    getData();
  }, [currentPage, query]);

  const handleNext = () => {
    if (currentPage == totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQueryButton = () => {};

  return (
    <>
      <div className='section'>
        <div className='container'>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <div className='is-fullwidth'>
                <input
                  className='input is-large'
                  type='text'
                  placeholder='Authores, Título, Género etc...'
                  value={query}
                  onChange={handleQueryChange}
                />
              </div>
            </div>
            <div className='control'>
              <button
                type='submit'
                className='button is-primary is-large'
                onClick={handleQueryButton}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className='fixed-grid has-5-cols mt-6'>
          <div className='grid is-gap-5'>
            {books.map((book) => (
              <div key={book._id} className='cell'>
                <div className='card'>
                  <div className='card-image'>
                    <figure className='image is-4by3'>
                      <img src={book.cover} alt='Placeholder image' />
                    </figure>
                  </div>
                  <div className='card-content'>
                    <div className='content'>
                      <Link to={`/books/${book._id}`}>
                        <h3 className='subtitle is-3'>{book.title}</h3>
                      </Link>
                      <Link to={`/authors/${book.author._id}`}>
                        <h5 className='subtitle is-5'>{`${book.author.firstName} ${book.author.lastName}`}</h5>
                      </Link>
                      <span className='tag is-link'>Score: {book.score}</span>
                      <span className='ml-2 tag is-info'>{book.genre}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <nav
          className='pagination is-rounded is-centered'
          role='navigation'
          aria-label='pagination'
        >
          <a
            className={`pagination-previous ${
              currentPage == 1 ? 'is-disabled' : ''
            }`}
            title='This is the first page'
            onClick={handlePrevious}
          >
            Anterior
          </a>
          <a
            className={`pagination-next ${
              currentPage == totalPages ? 'is-disabled' : ''
            }`}
            onClick={handleNext}
          >
            Siguiente
          </a>
          <ul className='pagination-list'>
            {/* <li>
              <a
                className='pagination-link is-current'
                aria-label='Page 1'
                aria-current='page'
              >
                1
              </a>
            </li>
            <li>
              <a href='#' className='pagination-link' aria-label='Goto page 2'>
                2
              </a>
            </li>
            <li>
              <a href='#' className='pagination-link' aria-label='Goto page 3'>
                3
              </a>
            </li> */}
            {pages.map((page) => (
              <li key={page}>
                <a
                  className={`pagination-link ${
                    page + 1 == currentPage ? 'is-current' : ''
                  }`}
                  onClick={() => {
                    handlePageChange(page + 1);
                  }}
                >
                  {page + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default BooksCatalogue;
