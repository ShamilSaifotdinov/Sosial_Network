import React, { useEffect } from 'react';
import c from "./ProfileHat.module.css";
import ProfileHatImage from "./../../../img/ProfileHatImage.jpg"
import { Link } from 'react-router-dom';
import { SubBtn } from './SubBtn';


const ProfileHat = ({id}) => {  
  return (
    <div className={c.ProfileHat}>
        {id ? <SubBtn id={id} /> : <Link to="/edit">Изменить</Link>}
        <img src={ProfileHatImage} />
    </div>
  );
}

export default ProfileHat;
