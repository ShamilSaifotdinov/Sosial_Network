import React from 'react';
import { LocaleDate } from '../../../../hook/timeTo';
import c from "./UserInformation.module.css";

const UserInformation = ({ Name, birthday, city, employment, status }) => {
  return (
    <div className={c.UserInformation}>
        <div className={c.UserName}>
            <h2>{Name}</h2>
            <span className={c.status}>{status}</span>
        </div>
        <div className={c.UserSubInfo}>
            {birthday && <span>День рождения:  <span className={c.BirthDate, c.Inf}>{LocaleDate(birthday)}</span></span>}
            {city && <span>Город: <span className={c.Town, c.Inf}>{city}</span></span>}
            {employment && <span>Место учёбы/работы: <span className={c.Education_work, c.Inf}>{employment}</span></span>}
        </div>
    </div>
  );
}

export default UserInformation;