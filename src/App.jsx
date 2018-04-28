import React from 'react';
import { hot } from 'react-hot-loader';

// console.log(window.require('fs'));

const App = () => {
   return (
      <>
         <h1>Wow, it actually works...</h1>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            magnam omnis quibusdam ratione quaerat nesciunt quia reprehenderit
            minus consequuntur aliquid dolorum cumque accusantium placeat
            laudantium, ducimus eius maxime incidunt ipsum?
         </p>
         <p>bleh</p>
         <iframe src="https://tidepod.fun" frameborder="0" width="100%" />
      </>
   );
};

export default hot(module)(App);
