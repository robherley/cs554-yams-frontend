import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socket from '../../util/socket';

class Messages extends Component {
   state = {
      msg: ''
   };

   renderInfo = () => (
      <>
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

   sendMessage = chatId => {
      if (this.state.msg) {
         socket.sendMsg(chatId, this.state.msg, false);
         this.setState({ msg: '' });
      }
   };

   renderChat = chat => (
      <>
         <h2>Current Chat: {chat.chatname}</h2>
         <ul style={{ maxHeight: '300px', overflow: 'auto' }}>
            {chat.messages.map((e, i) => <li key={i}>{e.content}</li>)}
         </ul>
         <input
            style={{ width: '20em' }}
            onChange={e => this.setState({ msg: e.target.value })}
            value={this.state.msg}
         />
         <button
            className={`btn grad-1`}
            style={{ width: '10em' }}
            onClick={() => this.sendMessage(chat._id)}
         >
            Send
         </button>
      </>
   );

   render() {
      const { chats, chatId } = this.props;
      return (
         <div className="message-container col tall align-center wide">
            <h1>Chat Component</h1>
            {this.props.chatId
               ? this.renderChat(chats[chatId])
               : this.renderInfo()}
         </div>
      );
   }
}

export default connect(st => ({ chats: st.chats }), null)(Messages);
