import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
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
            {isAuthenticated ? (
              <div>
                {user.firstName} {user.lastName}
                <a
                  className='button is-danger is-rounded'
                  onClick={handleLogout}
                >
                  <strong>Logout</strong>
                </a>
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
