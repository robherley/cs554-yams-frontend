import React, { Component } from 'react';
import * as socket from '../../util/socket';

class Messages extends Component {
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

   render() {
      return (
         <div className="col tall align-center wide">
            <h1>Chat Component</h1>
            {this.renderInfo()}
            <button
               className={`btn grad-1`}
               style={{ width: '10em' }}
               onClick={() => socket.sendMsg('testGroup', 'a secret message')}
            >
               Test Message
            </button>
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
