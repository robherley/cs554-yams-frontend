import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socket from '../../util/socket';
import { loadUserInfo } from '../../actions/user.actions';
import { logout } from '../../actions/auth.actions';

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
         <div className="col tall align-center">
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
         </div>
      ) : null;
   };
}

export default connect(st => ({ user: st.user }), {
   loadUserInfo,
   logout
})(Chat);
