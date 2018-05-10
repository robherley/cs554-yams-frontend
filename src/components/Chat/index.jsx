import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as socket from '../../util/socket';
import { loadUserInfo } from '../../actions/user.actions';
import { loadUserChats } from '../../actions/chats.actions';
import { logout } from '../../actions/auth.actions';
import yams from '../../util/fetchYams';

import Sidebar from './Sidebar';
import Messages from './Messages';

class Chat extends Component {
   state = {
      currentChat: null,
      modal: false,
      userSearch: [],
      wantedUsers: [],
      newGroup: ''
   };

   componentDidMount = () => {
      this.props.loadUserInfo();
      this.props.loadUserChats();
      socket.connect();
      this.escapeListen = document.addEventListener('keyup', e => {
         if (e.code === 'Escape') this.closeModal();
      });
   };

   componentWillUnmount = () => {
      socket.disconnect();
      document.removeEventListener('touchstart', this.escapeListen);
   };

   findUsers = _.debounce(async e => {
      let data = [];
      try {
         if (e.target.value) {
            data = _.pull(
               (await yams.get(`/user/search/${e.target.value}`)).data,
               this.props.user.username
            );
         }
      } catch (e) {
         console.error(e);
      }
      this.setState({ userSearch: data, searching: false });
   }, 500);

   handleUserClick = user => {
      const { wantedUsers } = this.state;
      if (wantedUsers.indexOf(user) !== -1) {
         this.setState({ wantedUsers: _.pull(wantedUsers, user) });
      } else {
         this.setState({ wantedUsers: [...wantedUsers, user] });
      }
   };

   closeModal = () => {
      if (this.refs.modal) {
         this.refs.modal.className += ' fadeOut';
         // dank fade effects
         setTimeout(
            () =>
               this.setState({
                  modal: false,
                  userSearch: [],
                  newGroup: '',
                  wantedUsers: []
               }),
            300
         );
      }
   };

   newUsers = () => {
      const newUsers = _.difference(
         this.state.userSearch,
         this.state.wantedUsers
      );
      return (
         <ul>
            {newUsers.map((e, i) => (
               <li key={i} onClick={() => this.handleUserClick(e)}>
                  {e}
               </li>
            ))}
         </ul>
      );
   };

   selectedUsers = () => (
      <ul>
         {this.state.wantedUsers.map((e, i) => (
            <li key={i} className="has" onClick={() => this.handleUserClick(e)}>
               {e}
            </li>
         ))}
      </ul>
   );

   createNewChat = async () => {
      const { newGroup, wantedUsers } = this.state;
      try {
         if (!newGroup) throw 'No Group Name Specified';
         if (!wantedUsers) throw 'You must add one user.';
         await yams.post('/chat/new', {
            chatname: newGroup,
            usernames: [...wantedUsers, this.props.user.username]
         });
         socket.newChat(newGroup, wantedUsers);
         this.props.loadUserChats();
         this.closeModal();
      } catch (e) {
         console.log(e);
         toastr.error(e.error ? e.error.msg : e.toString());
      }
   };

   renderModal = () => {
      if (this.state.modal) {
         return (
            <div className="modal-wrapper" ref="modal">
               <div className="modal col">
                  <h1>Create a New Chat</h1>
                  <div className="m-b-1">
                     <label htmlFor="chatname">Chat Name</label>
                     <input
                        type="text"
                        name="chatname"
                        placeholder="chat name"
                        className="alt"
                        onChange={e =>
                           this.setState({ newGroup: e.target.value })
                        }
                     />
                  </div>
                  <div className="m-b-1">
                     <label htmlFor="users">Chat Name</label>
                     <input
                        type="text"
                        name="users"
                        className="alt"
                        placeholder="users"
                        onChange={e => {
                           e.persist();
                           this.setState({ searching: true });
                           this.findUsers(e);
                        }}
                     />
                  </div>
                  <div className="modal-search">
                     <div className="row wide justify-space-between">
                        <div className="modal-half">
                           {this.state.searching ? (
                              <div className="row wide justify-center">
                                 <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size="lg"
                                 />
                              </div>
                           ) : (
                              this.newUsers()
                           )}
                        </div>
                        <div className="modal-half">{this.selectedUsers()}</div>
                     </div>
                  </div>
                  <div className="row wide justify-center">
                     <button
                        className="btn grad-1 m-l-1"
                        onClick={this.createNewChat}
                        style={{
                           height: '1em',
                           width: '8em'
                        }}
                     >
                        Create
                     </button>
                  </div>
                  <FontAwesomeIcon
                     icon={faTimesCircle}
                     size="2x"
                     className="exit"
                     onClick={this.closeModal}
                  />
               </div>
            </div>
         );
      } else {
         return null;
      }
   };

   renderInfo = () =>
      Object.entries(this.props.user).map(e => (
         <span key={e[0]}>
            {e[0]}: {e[1]}
         </span>
      ));

   changeChat = chat => {
      this.setState({ currentChat: chat });
   };

   render = () => {
      return this.props.user ? (
         <div className="row tall">
            <Sidebar
               chats={this.props.chats}
               addChat={() => this.setState({ modal: true })}
               handleClick={this.changeChat}
            />
            <Messages
               chatId={this.state.currentChat}
               user={this.props.user}
               logout={() => this.props.logout()}
            />
            {this.renderModal()}
         </div>
      ) : (
         <div className="row tall wide justify-center m-t-2">Loading...</div>
      );
   };
}

export default connect(st => ({ user: st.user, chats: st.chats }), {
   loadUserInfo,
   loadUserChats,
   logout
})(Chat);
