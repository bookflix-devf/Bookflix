import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';

const Community = () => {
  const { authorId } = useParams();
  const { token, user } = useAuth();
  const [community, setCommunity] = useState(null);
  const [currentTextChannel, setCurrentTextChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const socket = useMemo(() => {
    return io('http://localhost:8000', {
      autoConnect: true,
    });
  }, []);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = () => {
    //TODO mandar mensaje al server
    socket.emit('sendMessage', {
      nickname: user.nickname,
      name: `${user.firstName} ${user.lastName}`,
      msg: inputMessage,
      room: currentTextChannel,
    });
    setInputMessage('');
  };

  const handleTextChannelClic = (textChannelIndex) => {
    const changeRoomObj = {
      from: currentTextChannel,
      to: community.textChannels[textChannelIndex].name,
    };
    setCurrentTextChannel(community.textChannels[textChannelIndex].name);
    setMessages([]);
    socket.emit('joinTextChannel', changeRoomObj);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get(`/authors/${authorId}/community`, {
          headers: {
            Authorization: token,
          },
        });
        setCommunity(data.community);

        setCurrentTextChannel(data.community.textChannels[0]?.name);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [authorId, token]);

  useEffect(() => {
    console.log('conectando desde cliente');
    //Definir todos los eventos
    socket.on('sendMessage', (msgObj) => {
      setMessages((prevMessages) => [...prevMessages, msgObj]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);
  return (
    <div className='section'>
      <div
        className='columns'
        style={{ height: 'calc(95vh - var(--bulma-navbar-height))' }}
      >
        <div className='column is-one-fifth'>
          <aside className='menu'>
            <h2 className='title menu-title'>{community && community.name}</h2>
            <p className='menu-label'>Canales de texto</p>
            <ul className='menu-list'>
              {community &&
                community.textChannels.map((textChannel, index) => {
                  return (
                    <li
                      onClick={() => {
                        handleTextChannelClic(index);
                      }}
                      key={textChannel._id}
                    >
                      <a
                        className={
                          currentTextChannel == textChannel.name
                            ? 'is-active'
                            : ''
                        }
                      >
                        {textChannel.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </aside>
        </div>

        {currentTextChannel && (
          <div
            className='column'
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 className='title'>{currentTextChannel}</h3>
            <div
              className='container'
              style={{
                maxHeight: 'calc(100vh - var(--bulma-navbar-height) - 18vh)',
                overflowY: 'auto',
              }}
            >
              {/* mensajes */}
              {messages.map((msgObj, index) => {
                return (
                  <article className='media' key={index}>
                    <figure className='media-left'>
                      <p className='image is-64x64'>
                        <img
                          src='https://bulma.io/assets/images/placeholders/128x128.png'
                          alt='Placeholder'
                        />
                      </p>
                    </figure>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>{msgObj.name}</strong>{' '}
                          <small>@{msgObj.nickname}</small> <small>31m</small>
                          <br />
                          {msgObj.msg}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            {/* Input fijo */}
            <div
              className='container is-fixed-bottom'
              style={{
                alignSelf: 'end',
                maxHeight: '18vh',
              }}
            >
              <article className='media'>
                <figure className='media-left'>
                  <p className='image is-64x64'>
                    <img
                      src='https://bulma.io/assets/images/placeholders/128x128.png'
                      alt='Placeholder'
                    />
                  </p>
                </figure>
                <div className='media-content'>
                  <div className='field'>
                    <p className='control'>
                      <textarea
                        className='textarea'
                        placeholder='Add a comment...'
                        onChange={handleChange}
                        value={inputMessage}
                      ></textarea>
                    </p>
                  </div>
                  <nav className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <a className='button is-info' onClick={handleSubmit}>
                          Submit
                        </a>
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
