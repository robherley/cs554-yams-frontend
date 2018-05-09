import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, register } from '../../actions/auth.actions';

class Login extends Component {
   state = {
      isRegister: true
   };

   handleFormSubmit = e => {
      e.preventDefault();
      if (this.state.isRegister) {
         const {
            firstName,
            lastName,
            username,
            password,
            passConfirm,
            email
         } = this.state;
         this.props.register({
            firstName,
            lastName,
            username,
            password,
            passConfirm,
            email
         });
      } else {
         const { username, password } = this.state;
         this.props.login(username, password);
      }
   };

   handleInputChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   swap = () => {
      this.setState({
         isRegister: !this.state.isRegister
      });
   };

   renderLogin = () => (
      <>
         <div className="m-b-1">
            <label htmlFor="username">User Name</label>
            <input
               type="text"
               name="username"
               placeholder="username"
               onChange={e => this.handleInputChange(e)}
            />
         </div>
         <div className="m-b-1">
            <label htmlFor="password">Password</label>
            <input
               type="password"
               name="password"
               placeholder="password"
               onChange={e => this.handleInputChange(e)}
            />
         </div>

         <div className="col wide justify-center align-center">
            <button
               className="btn grad-2"
               type="submit"
               style={{ width: '10em' }}
            >
               Log In
            </button>
            <div className="m-t-1">
               <span>New Here?</span>
               <a
                  className="link"
                  onClick={() => this.swap()}
                  style={{ marginLeft: '0.2em' }}
               >
                  Register
               </a>
            </div>
         </div>
      </>
   );

   renderSignup = () => (
      <>
         <div className="row justify-space-evenly m-b-1">
            <div className="col wide">
               <label htmlFor="firstName">First Name</label>
               <input
                  type="text"
                  name="firstName"
                  placeholder="first"
                  onChange={e => this.handleInputChange(e)}
               />
            </div>
            <div className="col wide m-l-1">
               <label htmlFor="lastName">Last Name</label>
               <input
                  type="text"
                  name="lastName"
                  placeholder="last"
                  onChange={e => this.handleInputChange(e)}
               />
            </div>
         </div>
         <div className="m-b-1">
            <label htmlFor="email">Email</label>
            <input
               type="text"
               name="email"
               placeholder="email"
               onChange={e => this.handleInputChange(e)}
            />
         </div>
         <div className="m-b-1">
            <label htmlFor="username">User Name</label>
            <input
               type="text"
               name="username"
               placeholder="username"
               onChange={e => this.handleInputChange(e)}
            />
         </div>
         <div className="m-b-1">
            <label htmlFor="password">Password</label>
            <input
               type="password"
               name="password"
               placeholder="password"
               onChange={e => this.handleInputChange(e)}
            />
         </div>
         <div className="m-b-1">
            <label htmlFor="passConfirm">Confirm Password</label>
            <input
               onChange={e => this.handleInputChange(e)}
               type="password"
               name="passConfirm"
               placeholder="confirm password"
            />
         </div>

         <div className="col wide justify-center align-center">
            <button
               className="btn grad-2 m-l-1"
               type="submit"
               style={{ width: '10em' }}
            >
               Sign Up
            </button>
            <div className="m-t-1">
               <span>Have an Account?</span>
               <a
                  className="link"
                  onClick={() => this.swap()}
                  style={{ marginLeft: '0.2em' }}
               >
                  Login
               </a>
            </div>
         </div>
      </>
   );

   render = () => {
      return (
         <div className="col tall align-center min-window">
            <div className="row align-baseline">
               <h1 className="logo">🍠 YAMS</h1>
               <p className="m-l-1">
                  {this.state.isRegister ? 'Registation' : 'Login'}
               </p>
            </div>
            <form className="col auth" onSubmit={e => this.handleFormSubmit(e)}>
               {this.state.isRegister
                  ? this.renderSignup()
                  : this.renderLogin()}
            </form>
         </div>
      );
   };
}

export default connect(null, { login, register })(Login);
