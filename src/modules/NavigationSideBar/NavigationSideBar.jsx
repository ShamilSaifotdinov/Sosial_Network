import React from 'react';
import c from "./NavigationSideBar.module.css";
import {NavLink} from "react-router-dom";

const NavigationSideBar = () => {
  return (
    <nav className={c.NavigationSideBar}>
        <NavLink to="/profile" activeClassName={c.active}>Моя страница</NavLink>
        <NavLink to="/messages" activeClassName={c.active}>Сообщения</NavLink>
        <NavLink to="/news" activeClassName={c.active}>Новости</NavLink>
        <NavLink to="/music" activeClassName={c.active}>Музыка</NavLink>
        <NavLink to="/settings" activeClassName={c.active}>Настройки</NavLink>
    </nav>
  );
}

export default NavigationSideBar;
