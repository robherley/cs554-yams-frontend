import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socket from '../../util/socket';
import { loadUserInfo } from '../../actions/user.actions';
import { loadUserChats } from '../../actions/chats.actions';
import { logout } from '../../actions/auth.actions';

import Sidebar from './Sidebar';
import Messages from './Messages';

class Chat extends Component {
   state = {
      currentChat: null
   };

   componentWillReceiveProps = nextProps => {
      if (this.state.currentChat) {
         // we are not in settings
         console.log(nextProps);
      }
   };

   componentDidMount = () => {
      console.log('mounted');
      this.props.loadUserInfo();
      this.props.loadUserChats();
      socket.connect();
   };

   componentWillUnmount = () => {
      console.log('Chat Component Unmounted');
      socket.disconnect();
   };

   renderInfo = () =>
      Object.entries(this.props.user).map(e => (
         <span key={e[0]}>
            {e[0]}: {e[1]}
         </span>
      ));

   changeChat = chat => {
      this.setState({ currentChat: chat }, () => console.log(this.state));
   };

   render = () => {
      return this.props.user ? (
         <div className="row tall">
            <Sidebar chats={this.props.chats} handleClick={this.changeChat} />
            <Messages
               chatId={this.state.currentChat}
               user={this.props.user}
               logout={() => this.props.logout()}
            />
         </div>
      ) : null;
   };
}

export default connect(st => ({ user: st.user, chats: st.chats }), {
   loadUserInfo,
   loadUserChats,
   logout
})(Chat);
