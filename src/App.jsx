import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './components/Chat';
import Login from './components/Login';
import { hot } from 'react-hot-loader';
const isMacOs = window.require('process').platform === 'darwin';

class App extends Component {
   render = () => {
      const { isAuth } = this.props;
      return (
         <>
            {isMacOs && <div className="titlebar" />}
            {isAuth ? <Chat /> : <Login />}
         </>
      );
   };
}

export default hot(module)(
   connect(st => ({ isAuth: st.auth.isAuth }), null)(App)
);
