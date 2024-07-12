import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <div className='section'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-one-third'>
              <h1 className='title'>Login</h1>
              <div className='box'>
                <form onSubmit={handleSubmit}>
                  <div className='field'>
                    <label className='label'>Email</label>
                    <div className='control'>
                      <input
                        className='input'
                        type='text'
                        placeholder='email@example.com'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='field'>
                    <label className='label'>Password</label>
                    <div className='control'>
                      <input
                        className='input'
                        type='password'
                        placeholder='********'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='field'>
                    <button
                      type='submit'
                      className='button is-fullwidth is-primary'
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
