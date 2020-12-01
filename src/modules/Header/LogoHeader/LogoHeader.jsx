import  c from "./LogoHeader.module.css";
import React from 'react';
import Logo from "./../../../img/logo.png"

const LogoHeader = () => {
  return (
    <div className={c.LogoHeader}>
        <img src={Logo} />
    </div>
  );
}

export default LogoHeader;
