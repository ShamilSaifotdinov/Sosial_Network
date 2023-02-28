import React from 'react';
import c from "./UserInformation.module.css";

const UserInformation = ({ Name, birthday, city, employment, status }) => {
  return (
    <div className={c.UserInformation}>
        <div className={c.UserName}>
            <h2>{Name}</h2>
            <span className={c.status}>{status}</span>
        </div>
        <div className={c.UserSubInfo}>
            <span>День рождения:  <span className={c.BirthDate, c.Inf}>{birthday}</span></span>
            <span>Город: <span className={c.Town, c.Inf}>{city}</span></span>
            <span>Место учёбы/работы: <span className={c.Education_work, c.Inf}>{employment}</span></span>
        </div>
    </div>
  );
}

export default UserInformation;