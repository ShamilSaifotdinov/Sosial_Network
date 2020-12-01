import  c from "./Header.module.css";
import LogoHeader from "./LogoHeader/LogoHeader";
import React from 'react';

const Header = () => {
  return (
    <div className={c.Header}>
        <LogoHeader />
    </div>
  );
}

export default Header;
