import {
  useState
} from 'react';
import "./gg.css";
import "./Chatpage.css";

function Chatpage({
  currentOnlineUsers,
  chatMessages,
  onChatMessages
}) {

  const [message, setMessage] = useState('');

  function onChange(e) {
    setMessage(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("onSubmit message", message);
    onChatMessages(message);
    setMessage('');
  }

  return ( <
    div className = "chat-page" >
    <
    div className = "chat-users" >
    <
    span className = "span-users" > Online Users < /span> <
    ul className = "users-online" > {
      currentOnlineUsers.map((onlineUser, id) => ( <
        li className = "user-list"
        key = {
          id
        } >
        <
        div >
        <
        i className = "gg-shape-circle" > < /i></div >
        <
        div className = "user-online" >

        <
        span className = "username-online" > {
          onlineUser
        } < /span> <
        /div> <
        /li>
      ))
    } <
    /ul> <
    /div> <
    div className = "message-board" >
    <
    span className = "span-messages" > Message Board < /span> <
    div className = "chat-messages" >
    <
    ul className = "users-messages" > {
      chatMessages.map((message, id) => ( <
        li className = "message-list"
        key = {
          id
        } >
        <
        div className = "messages" >
        <
        p className = "sender" > {
          message.username
        }: < /p> <
        p className = "text" > {
          message.message
        } < /p> <
        /div> <
        /li>
      ))
    } <
    /ul> <
    /div> <
    div className = "outgoing" >
    <
    form className = "outgoing-message-form"
    onSubmit = {
      onSubmit
    } >
    <
    input className = "input-message"
    value = {
      message
    }
    type = "text"
    onChange = {
      onChange
    }
    placeholder = "Enter message to send" / >
    <
    button type = "submit"
    className = "form-submit" disabled={!message || !message.trim()}> Send < /button> <
    /form> <
    /div> <
    /div> <
    /div>
  );
}

export default Chatpage;