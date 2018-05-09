import React, { Component } from 'react';

class Messages extends Component {
   componentDidMount() {
      this.scrollToBottom();
   }

   componentDidUpdate() {
      this.scrollToBottom();
   }

   scrollToBottom() {
      this.el.scrollIntoView({ behavior: 'smooth' });
   }

   render() {
      return (
         <div
            ref={el => {
               this.el = el;
            }}
         />
      );
   }
}
