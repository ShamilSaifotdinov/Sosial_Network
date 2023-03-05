import React from 'react';
import c from "./UserAvatar.module.css";
import Avatar1 from "./../../../../img/Avatar1.jpg"

const UserAvatar = ({url}) => {
  return (
    <div className={c.UserAvatar}>
        <img src={url} />
    </div>
  );
}

export default UserAvatar;