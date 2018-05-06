import React, { Component } from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';
const isMacOs = window.require('process').platform === 'darwin';

class App extends Component {
   state = {
      debug: null
   };

   tryServer = async () => {
      try {
         let { data } = await axios.get('http://localhost:3000/test');
         this.setState({ debug: data.msg });
      } catch (e) {
         this.setState({ debug: 'An error occurred.' });
         console.log(e);
      }
   };

   componentDidMount = async () => {
      await this.tryServer();
      console.log(window.require('process'));
   };

   render = () => {
      return (
         <>
            {isMacOs && <div className="titlebar" />}
            <div className="app">
               <p>Debug: {this.state.debug}</p>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  magnam omnis quibusdam ratione quaerat nesciunt quia
                  reprehenderit minus consequuntur aliquid dolorum cumque
                  accusantium placeat laudantium, ducimus eius maxime incidunt
                  ipsum?
               </p>
               {[1, 2, 3, 4].map(i => (
                  <button className={`btn grad-${i}`} style={{ width: '10em' }}>
                     test
                  </button>
               ))}
            </div>
         </>
      );
   };
}

export default hot(module)(App);
