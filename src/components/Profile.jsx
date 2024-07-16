import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const auth = useAuth();
  const { user } = auth;
  return (
    <div className='container'>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <div className='box'>
            <h1 className='title is-4'>Perfil de Usuario</h1>
            <div className='field'>
              <label className='label'>Nickname</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  value={user.nickname ?? 'Nickname'}
                  readOnly
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Nombre</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  value={user.firstName || 'FirstName'}
                  readOnly
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Apellido</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  value={user.lastName}
                  readOnly
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Correo Electrónico</label>
              <div className='control'>
                <input
                  className='input'
                  type='email'
                  value={user.email}
                  readOnly
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Género</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  value={user.gender}
                  readOnly
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Activo</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  value={user.isActive ? 'Sí' : 'No'}
                  readOnly
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Avatar</label>
              <div className='control'>
                <figure className='image is-64x64'>
                  <img src={user.avatar} alt='Avatar' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
