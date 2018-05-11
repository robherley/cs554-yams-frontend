import React, { Component } from 'react';
import { connect } from 'react-redux';
import yams from '../../util/fetchYams';
import * as socket from '../../util/socket';
import * as auth from '../../util/auth';
import { toastr } from 'react-redux-toastr';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';
import _ from 'lodash';

const Message = ({ content, sentBy, ts, you, media }) => {
   return (
      <div className={you === sentBy ? 'you' : 'them'}>
         <div className="row align-center">
            {/* <div className="col">
               {you !== sentBy && <div className="profile">heck</div>}
            </div> */}
            <div className="col wide">
               <div>
                  <span className="user">{sentBy}</span>{' '}
                  <span className="timestamp">
                     {' '}
                     {new Date(ts).toLocaleString()}
                  </span>
               </div>
               <div className="content">
                  {media ? (
                     <img
                        src={`https://s3.amazonaws.com/${
                           window.require('process').env.AWS_BUCKET_NAME
                        }/${content}`}
                        className="pic"
                     />
                  ) : (
                     <span>{content}</span>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

class Messages extends Component {
   state = {
      msg: '',
      media: false,
      chatprefs: false
   };

   scrollToBottom = () => {
      if (this.dummy) this.dummy.scrollIntoView({ behavior: 'smooth' });
   };

   componentDidMount = () => {
      this.scrollToBottom();
      this.enterListen = document.addEventListener('keypress', e => {
         if (e.code === 'Enter') {
            this.sendMessage();
         }
      });
      this.escapeListen = document.addEventListener('keyup', e => {
         if (e.code === 'Escape') this.closeModal();
      });
   };

   componentWillUnmount = () => {
      document.removeEventListener('keypress', this.enterListen);
      document.removeEventListener('keyup', this.escapeListen);
   };

   componentDidUpdate = (prevProps, prevState, snapshot) => {
      const { chatId, chats } = this.props;
      if (prevProps.chatId !== chatId) {
         this.scrollToBottom();
         return;
      }
      if (prevProps.chats[chatId] && chats[chatId]) {
         if (
            prevProps.chats[chatId].messages.length !==
            chats[chatId].messages.length
         ) {
            this.scrollToBottom();
         }
      }
   };

   sendMessage = () => {
      if (this.state.msg) {
         socket.sendMsg(this.props.chatId, this.state.msg, false);
         this.setState({ msg: '' });
      }
   };

   sendImage = async () => {
      try {
         let form = new FormData();
         form.append('img', this.fileInput.files[0]);
         const { data } = await yams.post(
            `/chat/photo/${this.props.chatId}`,
            form,
            {
               headers: {
                  Authorization: `Bearer ${auth.getToken()}`
               }
            }
         );
         socket.sendMsg(this.props.chatId, data.fileName, true);
         this.closeModal();
      } catch (e) {
         toastr.error('Image Upload Error');
      }
   };

   closeModal = () => {
      if (this.refs.media) {
         this.refs.media.className += ' fadeOut';
         setTimeout(
            () =>
               this.setState({
                  media: false,
                  chatprefs: false
               }),
            200
         );
      }
   };

   addUser = async username => {
      try {
         await yams.post(
            `/chat/add/${this.props.chatId}`,
            {
               username
            },
            {
               headers: {
                  Authorization: `Bearer ${auth.getToken()}`
               }
            }
         );
         socket.updateChat(this.props.chatId);
      } catch (e) {
         toastr.error('Unable to add user.');
      }
      this.setState({ newUser: '' });
   };

   removeUser = async (username, leave = false) => {
      let conf = () =>
         leave
            ? confirm(
                 `Are you sure you want to leave ${
                    this.props.chats[this.props.chatId].chatname
                 }?`
              )
            : confirm(`Are you sure you want to remove ${username}?`);
      if (conf) {
         try {
            await yams.post(
               `/chat/remove/${this.props.chatId}`,
               {
                  username
               },
               {
                  headers: {
                     Authorization: `Bearer ${auth.getToken()}`
                  }
               }
            );
            socket.updateChat(this.props.chatId);
            socket.updateUser(username);
         } catch (e) {
            toastr.error('Unable to remove user.');
         }
      }
   };

   leaveChat = async () => {
      await this.removeUser(this.props.user.username);
   };

   renderChatPrefs = () => {
      const currChat = this.props.chats[this.props.chatId];
      return (
         <>
            <h1>Edit Chat</h1>
            <div>
               <span style={{ fontWeight: 'bold' }}>Chat Name:</span>{' '}
               <span>{currChat.chatname}</span>
            </div>
            <div>
               <span style={{ fontWeight: 'bold' }}>Chat ID:</span>{' '}
               <span>{currChat._id}</span>
            </div>
            <div>
               <span style={{ fontWeight: 'bold' }}>Messages Sent:</span>{' '}
               <span>{currChat.messages.length}</span>
            </div>

            <div className="row wide m-t-1" style={{ width: '15em' }}>
               <input
                  className="tiny"
                  placeholder="Add User"
                  onChange={e => this.setState({ newUser: e.target.value })}
               />
               <button
                  className="btn square"
                  style={{ width: '6em' }}
                  onClick={() => this.addUser(this.state.newUser)}
               >
                  Add
               </button>
            </div>
            <div
               className="col wide m-t-1"
               style={{ width: '20em', maxHeight: '150px', overflow: 'scroll' }}
            >
               {_.reject(currChat.users, {
                  username: this.props.user.username
               }).map((e, i) => (
                  <div key={i}>
                     <div className="row">
                        <span className="box">{e.username}</span>
                        <button
                           className="btn square"
                           style={{ width: '8em' }}
                           onClick={() => this.removeUser(e.username)}
                        >
                           Remove
                        </button>
                     </div>
                  </div>
               ))}
            </div>
            <button
               className="btn grad-3 m-t-1"
               style={{ width: '12em' }}
               onClick={() => this.leaveChat()}
            >
               Leave Group
            </button>
         </>
      );
   };

   renderImgUpload = () => (
      <>
         <h1>Upload an Image</h1>
         <div className="btn file-up">
            <label htmlFor="file-up">
               <FontAwesomeIcon icon={faUpload} size="2x" className="exit" />
            </label>
            <input
               name="file-up"
               type="file"
               accept="image/*"
               ref={input => {
                  this.fileInput = input;
               }}
            />
         </div>

         <button
            className={`btn grad-1 m-t-2`}
            style={{ width: '10em' }}
            onClick={this.sendImage}
         >
            Send
         </button>
      </>
   );

   renderModal = () => {
      if (this.state.media || this.state.chatprefs) {
         return (
            <div className="modal-wrapper" ref="media">
               <div className="modal col align-center">
                  {this.state.media && this.renderImgUpload()}
                  {this.state.chatprefs && this.renderChatPrefs()}
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

   renderInfo = () => (
      <>
         <h1 className="m-t-3">
            Howdy {this.props.user.firstName}, you're looking good today.
         </h1>
         {/* {Object.entries(this.props.user).map(e => (
            <span key={e[0]}>
               {e[0]}: {e[1]}
            </span>
         ))} */}
         <button
            className={`btn grad-2`}
            style={{ width: '10em' }}
            onClick={() => this.props.logout()}
         >
            Logout
         </button>
      </>
   );

   renderChat = chat => {
      return (
         <>
            {this.renderModal()}
            <div className="chat-titlebar">
               <div className="row align-center">
                  {/* <img
                     src="https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png"
                     className="chat-logo m-l-1"
                  /> */}
                  <div className="col m-l-1">
                     <span className="chat-name">{chat.chatname}</span>
                     <span className="chat-tiny">
                        {chat.users.length} Members
                     </span>
                  </div>
               </div>
               <FontAwesomeIcon
                  icon={faBars}
                  className="chat-settings exit"
                  size="2x"
                  onClick={() => this.setState({ chatprefs: true })}
               />
            </div>
            <div className="col tall wide">
               <div className="chat-messages">
                  {chat.messages.map((e, i) => (
                     <Message you={this.props.user.username} key={i} {...e} />
                  ))}
                  <div
                     style={{ float: 'left', clear: 'both' }}
                     ref={el => {
                        this.dummy = el;
                     }}
                  />
               </div>
               <div className="row">
                  <input
                     onChange={e => this.setState({ msg: e.target.value })}
                     className="chat-send"
                     placeholder="Write something..."
                     value={this.state.msg}
                  />
                  <button
                     className="btn send-img"
                     style={{
                        width: '6em',
                        borderRadius: '0px'
                     }}
                     onClick={() => this.setState({ media: true })}
                  >
                     img
                  </button>
                  <button
                     className="btn send-txt"
                     style={{
                        width: '6em',
                        borderRadius: '0px'
                     }}
                     onClick={() => this.sendMessage(chat._id)}
                  >
                     txt
                  </button>
               </div>
            </div>
         </>
      );
   };

   render() {
      const { chats, chatId } = this.props;
      if (!chats[chatId]) {
         return (
            <div className="message-container col tall align-center wide">
               {this.renderInfo()}
            </div>
         );
      } else {
         return (
            <div className="message-container col tall align-center wide">
               {this.props.chatId
                  ? this.renderChat(chats[chatId])
                  : this.renderInfo()}
            </div>
         );
      }
   }
}

export default connect(st => ({ user: st.user, chats: st.chats }), null)(
   Messages
);
