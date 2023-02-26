import React from 'react';
import c from "./UserInformation.module.css";

const UserInformation = ({displayName}) => {
  return (
    <div className={c.UserInformation}>
        <div className={c.UserName}>
            <h2>{displayName}</h2>
            <span className={c.status}>Статус пользователя</span>
        </div>
        <div className={c.UserSubInfo}>
            <span>День рождения:  <span className={c.BirthDate, c.Inf}>24 Августа 2007 г.</span></span>
            <span>Город: <span className={c.Town, c.Inf}>Сыктывкар</span></span>
            <span>Место учёбы/работы: <span className={c.Education_work, c.Inf}>Безработный</span></span>
        </div>
    </div>
  );
}

export default UserInformation;