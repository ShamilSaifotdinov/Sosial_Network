import c from "./UserContacts.module.css";
import React from 'react';
import { NavLink } from 'react-router-dom';

import DialogSearch from './DialogSearch/DialogSearch';
import { auth } from "../../../hook/firebase";

const UserContacts = ({ match, chats, setActiveChat }) => {
  return (
    <div className={c.UserContacts}>
      <h1>Диалоги</h1>
      <DialogSearch />{/*url={url}*/}
      {
        chats.length !== 0
          ?
          <ul className={c.UserList}>
            {
              chats.map(chat =>
                <li key={chat.id}>
                  <NavLink onClick={() => setActiveChat(chat)} to={`${match.path}/${chat.isGroup ? chat.id : Object.keys(chat.members).find(e => e !== auth.currentUser.uid)}`} activeClassName={c.active}>{chat.Name}</NavLink>
                </li>)
            }
          </ul>
          : <h1>Загрузка...</h1>
      }
      {/* <li><NavLink to={`${url}/5ygh1v7qlcapds1gekke2cg0sye2`} activeClassName={c.active}>Владимир Владимирович</NavLink></li> */}
      {/* <li><NavLink to="/DialogWindowShimova" activeClassName={c.active}>Шимова Татьяна</NavLink></li> */}
    </div>
  );
}

export default UserContacts;
