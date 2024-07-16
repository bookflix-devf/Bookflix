import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item'></a>
        {'//TODO logo'}
        <a
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <Link className='navbar-item' to='/'>
            Libros
          </Link>

          <Link className='navbar-item' to='/authors'>
            Autores
          </Link>
          <Link className='navbar-item' to='/genres'>
            TODO GENRES
          </Link>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            {auth.user ? (
              <div className='buttons'>
                <Link to='/profile'>
                  <span className='navbar-item'>{`${auth.user.firstName} ${auth.user.lastName}`}</span>
                </Link>
                <button className='button is-warning' onClick={handleLogout}>
                  <strong>Logout</strong>
                </button>
              </div>
            ) : (
              <div className='buttons'>
                <Link className='button is-primary' to='/register'>
                  <strong>Register</strong>
                </Link>
                <Link className='button is-light' to='/login'>
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
