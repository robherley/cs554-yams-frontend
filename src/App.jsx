import React, { Component } from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';

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
   };

   render = () => {
      return (
         <>
            <h1>Testing</h1>
            <h2>Debug: {this.state.debug}</h2>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
               magnam omnis quibusdam ratione quaerat nesciunt quia
               reprehenderit minus consequuntur aliquid dolorum cumque
               accusantium placeat laudantium, ducimus eius maxime incidunt
               ipsum?
            </p>
            <p>bleh</p>
         </>
      );
   };
}

export default hot(module)(App);
