import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

const Circle = ({ icon, color }) => (
   <div className="circle" style={{ backgroundColor: color }}>
      <FontAwesomeIcon icon={icon} size="2x" />
   </div>
);
Circle.defaultProps = {
   icon: faUsers,
   color: '#d8dee9'
};

const Add = () => <Circle icon={faPlus} color="#8fbcbb" />;
const Settings = () => <Circle icon={faCogs} />;

class Sidebar extends Component {
   render() {
      return (
         <div className="sidebar-container tall">
            <div className="chats">
               <Add />
               {[1, 2].map(_ => <Circle key={_} />)}
            </div>
            <div className="settings">
               <Circle icon={faCogs} color="#81a1c1" />
            </div>
         </div>
      );
   }
}

export default Sidebar;
