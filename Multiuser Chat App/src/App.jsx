import {
  useState,
  useEffect,
  useRef
} from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchOnlineUsers,
  fetchMessages,
  fetchAddMessage,
} from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import Chatpage from './Chatpage';

function App() {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [currentOnlineUsers, setCurrentOnlineUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

  const intervalRef = useRef(null);

  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        setError('');
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        initiateRefreshSequence();
        return fetchOnlineUsers();
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        onLogout();
        return Promise.reject(err);
      })
      .then(onlineUsers => {
        setCurrentOnlineUsers(onlineUsers);
        return fetchMessages();
      })
      .catch(err => {
        onLogout();
        setError(err?.error || 'ERROR');
        return Promise.reject(err);

      })
      .then(updatedMessages => {
        setChatMessages(updatedMessages);
      })
      .catch(err => {
        onLogout();
        setError(err?.error || 'ERROR');
        return;
      });
  }

  function stopRefreshSequence() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

  }

  function initiateRefreshSequence() {
    intervalRef.current = setInterval(function() {
      refreshUserListAndMessages();
    }, 5000)
  }

  function onLogout() {
    setError('');
    setUsername('');
    setCurrentOnlineUsers([]);
    setChatMessages([]);
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    stopRefreshSequence();
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onChatMessages(message) {
    fetchAddMessage(message)
      .then(updatedMessages => {
        setChatMessages(updatedMessages);
        setError('');
      })
      .catch(err => {
        setError(err?.error || 'ERROR');

      });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchOnlineUsers();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({
            error: CLIENT.NO_SESSION
          })
        }
        return Promise.reject(err);
      })
      .then(onlineUsers => {
        setCurrentOnlineUsers(onlineUsers);
        return fetchMessages();
      })
      .catch(err => {

        if (err?.error === CLIENT.NO_SESSION) {
          onLogout();
          return Promise.reject({
            error: CLIENT.NO_SESSION
          });
        }
        setError(err?.error || 'ERROR');
      })
      .then(updatedMessages => {
        setChatMessages(updatedMessages);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          onLogout();
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  function refreshUserListAndMessages() {
    fetchOnlineUsers()
      .then(onlineUsers => {
        setCurrentOnlineUsers(onlineUsers);
        return fetchMessages();
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          onLogout();
          return;
        }
        setError(err?.error || 'ERROR');
      })
      .then(updatedMessages => {
        setChatMessages(updatedMessages);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          onLogout();
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return ( <
      div className = "app" >
      <
      main className = "chat-main" >
      <
      h1 > Chat App < /h1> {
      error && < Status error = {
        error
      }
      /> } {
      loginStatus === LOGIN_STATUS.PENDING && < Loading className = "login-waiting" > Loading user... < /Loading> } {
      loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && < LoginForm onLogin = {
        onLogin
      }
      /> } {
      loginStatus === LOGIN_STATUS.IS_LOGGED_IN && ( <
        div className = "chat-content" >
        <
        h2 > Logged in user: {
          username
        } <
        Controls onLogout = {
          onLogout
        }
        /> < /
        h2 > <
        Chatpage currentOnlineUsers = {
          currentOnlineUsers
        }
        chatMessages = {
          chatMessages
        }
        onChatMessages = {
          onChatMessages
        }
        /> < /
        div >
      )
    } <
    /main> < /
  div >
);
}

export default App;