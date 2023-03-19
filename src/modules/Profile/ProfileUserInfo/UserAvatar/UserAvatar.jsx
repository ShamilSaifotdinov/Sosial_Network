import React from 'react';
import c from "./UserAvatar.module.css";

const UserAvatar = ({url}) => {
  return (
    <div className={c.UserAvatar}>
        <img src={url} alt="UserAvatar" />
    </div>
  );
}

export default UserAvatar;