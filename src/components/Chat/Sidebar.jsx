import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

const Circle = ({ icon, color, label, onClick }) => (
   <a className="circle-wrapper" onClick={onClick}>
      <div className="circle" style={{ backgroundColor: color }}>
         <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <span>{label}</span>
   </a>
);
Circle.defaultProps = {
   icon: faUsers,
   color: '#d8dee9',
   label: 'no label specified'
};

const Add = () => <Circle icon={faPlus} color="#8fbcbb" label="New Chat" />;
const Settings = () => <Circle icon={faCogs} label="Preferences" />;

const Sidebar = ({ chats, handleClick }) => (
   <div className="sidebar-container tall">
      <div className="chats">
         <Add />
         {chats.map((e, i) => (
            <Circle key={i} label={e.chatname} onClick={() => handleClick(e)} />
         ))}
      </div>
      <div className="settings">
         <Settings />
      </div>
   </div>
);

export default Sidebar;
