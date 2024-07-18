// import Router from './router/Router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BooksCatalogue from './components/BooksCatalogue';
import AuthorsCatalogue from './components/AuthorsCatalogue';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Book from './components/Book';
import Author from './components/Author';
import Community from './components/Community';

import AuthProvider from './context/AuthContext';
import PrivateRouter from './router/PrivateRouter';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<BooksCatalogue />} />
            <Route path='/books/:bookId' element={<Book />} />
            <Route path='/authors' element={<AuthorsCatalogue />} />
            <Route path='/authors/:authorId' element={<Author />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRouter />}>
              <Route
                path='/authors/:authorId/community'
                element={<Community />}
              />
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
