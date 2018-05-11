import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socket from '../../util/socket';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

const Message = ({ content, sentBy, ts, you }) => {
   return (
      <div className={you === sentBy ? 'you' : 'them'}>
         <div>
            <span className="user">{sentBy}</span>{' '}
            <span className="timestamp"> {new Date(ts).toLocaleString()}</span>
         </div>
         <div className="content">{content}</div>
      </div>
   );
};

class Messages extends Component {
   state = {
      msg: ''
   };

   scrollToBottom = () => {
      if (this.dummy) this.dummy.scrollIntoView({ behavior: 'smooth' });
   };

   componentDidMount = () => {
      this.scrollToBottom();
      this.enterListen = document.addEventListener('keypress', e => {
         if (e.code === 'Enter') {
            this.sendMessage();
         }
      });
   };

   componentWillUnmount = () => {
      document.removeEventListener('keypress', this.enterListen);
   };

   componentDidUpdate = (prevProps, prevState, snapshot) => {
      const { chatId, chats } = this.props;
      if (prevProps.chatId !== chatId) {
         this.scrollToBottom();
         return;
      }
      if (prevProps.chats[chatId]) {
         if (
            prevProps.chats[chatId].messages.length !==
            chats[chatId].messages.length
         ) {
            this.scrollToBottom();
         }
      }
   };

   sendMessage = () => {
      if (this.state.msg) {
         socket.sendMsg(this.props.chatId, this.state.msg, false);
         this.setState({ msg: '' });
      }
   };

   renderInfo = () => (
      <>
         <h1 className="m-t-3">
            Howdy {this.props.user.firstName}, you're looking good today.
         </h1>
         {Object.entries(this.props.user).map(e => (
            <span key={e[0]}>
               {e[0]}: {e[1]}
            </span>
         ))}
         <button
            className={`btn grad-2`}
            style={{ width: '10em' }}
            onClick={() => this.props.logout()}
         >
            Logout
         </button>
      </>
   );

   renderChat = chat => {
      return (
         <>
            <div className="chat-titlebar">
               <div className="row align-center">
                  <img
                     src="https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png"
                     className="chat-logo m-l-1"
                  />
                  <div className="col m-l-1">
                     <span className="chat-name">{chat.chatname}</span>
                     <span className="chat-tiny">
                        {chat.users.length} Members
                     </span>
                  </div>
               </div>
               <FontAwesomeIcon
                  icon={faBars}
                  className="chat-settings exit"
                  size="2x"
               />
            </div>
            <div className="col tall wide">
               <div className="chat-messages">
                  {chat.messages.map((e, i) => (
                     <Message you={this.props.user.username} key={i} {...e} />
                  ))}
                  <div
                     style={{ float: 'left', clear: 'both' }}
                     ref={el => {
                        this.dummy = el;
                     }}
                  />
               </div>
               <div className="row">
                  <input
                     onChange={e => this.setState({ msg: e.target.value })}
                     className="chat-send"
                     placeholder="Write something..."
                     value={this.state.msg}
                  />
                  <button
                     className={`btn grad-1`}
                     style={{ width: '6em', borderRadius: '0px' }}
                     onClick={() => this.sendMessage(chat._id)}
                  >
                     Send
                  </button>
               </div>
            </div>
         </>
      );
   };

   render() {
      const { chats, chatId } = this.props;
      return (
         <div className="message-container col tall align-center wide">
            {this.props.chatId
               ? this.renderChat(chats[chatId])
               : this.renderInfo()}
         </div>
      );
   }
}

export default connect(st => ({ user: st.user, chats: st.chats }), null)(
   Messages
);
