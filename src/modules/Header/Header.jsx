import LogoHeader from "./LogoHeader/LogoHeader";
import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import  c from "./Header.module.css";

const Header = ({setAuth}) => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }
  return (
    <div className={c.Header}>
      <div className={c.Header_wrapper}>
        <LogoHeader />
        <button className={c.Header_logout} onClick={logout}>Выйти</button>
      </div>
    </div>
  );
}

export default Header;
