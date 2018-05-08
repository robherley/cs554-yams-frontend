import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.actions';

class Chat extends Component {
   render() {
      return (
         <div className="col tall align-center">
            <h1>Chat Component</h1>
            <button
               className={`btn grad-2`}
               style={{ width: '10em' }}
               onClick={() => this.props.logout()}
            >
               Logout
            </button>
         </div>
      );
   }
}

export default connect(null, { logout })(Chat);
