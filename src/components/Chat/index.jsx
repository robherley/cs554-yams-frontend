import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socket from '../../util/socket';
import { loadUserInfo } from '../../actions/user.actions';
import { logout } from '../../actions/auth.actions';

import Sidebar from './Sidebar';
import Messages from './Messages';

class Chat extends Component {
   componentDidMount = () => {
      console.log('mounted');
      this.props.loadUserInfo();
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

   render = () => {
      return this.props.user ? (
         <div className="row tall">
            <Sidebar />
            <Messages
               user={this.props.user}
               logout={() => this.props.logout()}
            />
         </div>
      ) : null;
   };
}

export default connect(st => ({ user: st.user }), {
   loadUserInfo,
   logout
})(Chat);
