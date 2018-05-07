import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth.actions';

class Login extends Component {
   render() {
      return (
         <div className="col full align-center">
            <h1>Login!</h1>
            <button
               className={`btn grad-1`}
               style={{ width: '10em' }}
               onClick={() => this.props.login('rob', 'foobar')}
            >
               Login
            </button>
         </div>
      );
   }
}

export default connect(null, { login })(Login);
