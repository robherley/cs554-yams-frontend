import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Chat from './components/Chat';
import PreAuth from './components/PreAuth';
import { hot } from 'react-hot-loader';
const isMacOs = window.require('process').platform === 'darwin';

class App extends Component {
   render = () => {
      const { isAuth } = this.props;
      return (
         <>
            {isMacOs && <div className="titlebar" />}
            <ReduxToastr
               timeOut={3000}
               newestOnTop={false}
               preventDuplicates
               position="top-right"
               showCloseButton={false}
               transitionIn="fadeIn"
               transitionOut="fadeOut"
               progressBar
            />
            {isAuth ? <Chat /> : <PreAuth />}
         </>
      );
   };
}

export default hot(module)(
   connect(st => ({ isAuth: st.auth.isAuth }), null)(App)
);
