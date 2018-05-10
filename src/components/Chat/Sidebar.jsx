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

const Add = ({ onClick }) => (
   <Circle icon={faPlus} color="#8fbcbb" label="New Chat" onClick={onClick} />
);
const Settings = ({ onClick }) => (
   <Circle icon={faCogs} label="Preferences" onClick={onClick} />
);

const Sidebar = ({ chats, handleClick }) => (
   <div className="sidebar-container tall">
      <div className="chats">
         <Add />
         {Object.entries(chats).map((e, i) => (
            <Circle
               key={i}
               label={e[1].chatname}
               onClick={() => handleClick(e[0])}
            />
         ))}
      </div>
      <div className="settings">
         <Settings onClick={() => handleClick(null)} />
      </div>
   </div>
);

export default Sidebar;
