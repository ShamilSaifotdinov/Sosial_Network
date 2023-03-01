import React from 'react';
import { NavLink } from 'react-router-dom';
import DialogSearch from '../DialogSearch/DialogSearch';
import c from "./UserContacts.module.css";

const UserContacts = ({url}) => {
  return (
    <div className={c.UserContacts}>
      <span>Диалоги</span>
      <DialogSearch url={url} />
      <hr></hr>
      <ul>
        <li><NavLink to={`${url}/5ygh1v7qlcapds1gekke2cg0sye2`} activeClassName={c.active}>Владимир Владимирович</NavLink></li>
        {/* <li><NavLink to="/DialogWindowShimova" activeClassName={c.active}>Шимова Татьяна</NavLink></li> */}
      </ul>
    </div>
);
}

export default UserContacts;
