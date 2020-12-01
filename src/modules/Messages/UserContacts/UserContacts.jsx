import React from 'react';
import { NavLink } from 'react-router-dom';
import c from "./UserContacts.module.css";

const UserContacts = () => {
  return (
    <div className={c.UserContacts}>
        <ul>
          <span>Диалоги</span>
          <li><NavLink to="/DialogWindow" activeClassName={c.active}>Владимир Владимирович</NavLink></li>
          <li><NavLink to="/DialogWindowShimova" activeClassName={c.active}>Шимова Татьяна</NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Гофман Георгий </NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Брэд Питт</NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Анджелина Джоли</NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Высоких Никита </NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Жумын Сайба </NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Александ Курицын</NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Шамиль Мангал</NavLink></li>
          <li><NavLink to="/profile" activeClassName={c.active}>Злой Карлик</NavLink></li>
        </ul>
      </div>
  );
}

export default UserContacts;
