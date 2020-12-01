import React from 'react';
import c from "./ProfileUserPosts.module.css";
import Avatar1 from "./../../../img/Avatar1.jpg"


const ProfileUserPosts = () => {
  return (
    <div className={c.ProfileUserPosts}>
        <div className={c.CreateNewPost}>
            <input type="text" placeholder="Напишите ваш пост..." className={c.InputField} />
            <input type="submit" className={c.SubmitButton}/>
        </div>
        <div className={c.AllPosts}>
            <div className={c.Post}>
                <img src={Avatar1} className={c.UserPostAvatar} />
                <span className={c.UserPostMessage}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus commodi fuga sunt unde laborum saepe, rem provident consequatur quidem in quae, enim pariatur asperiores eveniet tenetur aspernatur quos id ex!</span>
            </div>
            <div className={c.Post}>
                <img src={Avatar1} className={c.UserPostAvatar} />
                <span className={c.UserPostMessage}>Hello World!!!</span>
            </div>
            <div className={c.Post}>
                <img src={Avatar1} className={c.UserPostAvatar} />
                <span className={c.UserPostMessage}>It's my first post!!!</span>
            </div>
        </div>
    </div>
  );
}

export default ProfileUserPosts;
