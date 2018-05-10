import React, { Component } from 'react';
import * as socket from '../../util/socket';

class Messages extends Component {
   state = {
      msg: null
   };

   componentDidMount = () => {
      this.scrollToBottom();
   };

   componentDidUpdate = () => {
      this.scrollToBottom();
   };

   scrollToBottom = () => {
      this.el.scrollIntoView({ behavior: 'smooth' });
   };

   renderInfo = () =>
      Object.entries(this.props.user).map(e => (
         <span key={e[0]}>
            {e[0]}: {e[1]}
         </span>
      ));

   sendMessage = () => {
      if (this.state.msg) {
         socket.sendMsg(this.props.chat.chatname, this.state.msg);
      }
   };

   renderChat = () => (
      <>
         <h2>Current Chat: {this.props.chat.chatname}</h2>
         <ul>{this.props.chat.messages.map((e, i) => <li>{e.content}</li>)}</ul>
         <input
            style={{ width: '20em' }}
            onChange={e => this.setState({ msg: e.target.value })}
         />
         <button
            className={`btn grad-1`}
            style={{ width: '10em' }}
            onClick={this.sendMessage}
         >
            Send
         </button>
      </>
   );

   render() {
      return (
         <div className="message-container col tall align-center wide">
            <h1>Chat Component</h1>
            {this.props.chat ? this.renderChat() : this.renderInfo()}
            <button
               className={`btn grad-2`}
               style={{ width: '10em' }}
               onClick={() => this.props.logout()}
            >
               Logout
            </button>
            <div
               ref={el => {
                  this.el = el;
               }}
            />
         </div>
      );
   }
}

export default Messages;
