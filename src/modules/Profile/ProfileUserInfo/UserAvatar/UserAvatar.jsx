import React from 'react';
import c from "./UserAvatar.module.css";
import Avatar1 from "./../../../../img/Avatar1.jpg"

const UserAvatar = () => {
  return (
    <div className={c.UserAvatar}>
        <img src={Avatar1} />
    </div>
  );
}

export default UserAvatar;