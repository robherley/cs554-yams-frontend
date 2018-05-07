import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserInfo } from './actions/user.actions';
import { hot } from 'react-hot-loader';
const isMacOs = window.require('process').platform === 'darwin';

class App extends Component {
   componentWillMount = () => {
      this.props.loadUserInfo();
   };

   render = () => {
      return (
         <>
            {isMacOs && <div className="titlebar" />}
            <div className="app">
               <p>Msg from server: {this.props.user}</p>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  magnam omnis quibusdam ratione quaerat nesciunt quia
                  reprehenderit minus consequuntur aliquid dolorum cumque
                  accusantium placeat laudantium, ducimus eius maxime incidunt
                  ipsum?
               </p>
               {[1, 2, 3, 4].map(i => (
                  <button
                     className={`btn grad-${i}`}
                     key={i}
                     style={{ width: '10em' }}
                  >
                     test
                  </button>
               ))}
            </div>
         </>
      );
   };
}

export default connect(st => ({ ...st }), { loadUserInfo })(hot(module)(App));
