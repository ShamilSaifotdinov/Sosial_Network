import './App.css';
import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./hook/firebase";

import Login from './modules/Login/Login';
import Header from "./modules/Header/Header";
import ProfileEdit from './modules/Profile/ProfileEdit/ProfileEdit';
import NavigationSideBar from "./modules/NavigationSideBar/NavigationSideBar";
import Profile from "./modules/Profile/Profile";
import Messages from "./modules/Messages/Messages";
import News from "./modules/News/News";
import Music from "./modules/Music/Music";
import Settings from "./modules/Settings/Settings";
import Register from './modules/Login/Register';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <div className="App">
        {
          user
            ? <div className='main'>
              <Header />
              <div className='wrapper'>
                <NavigationSideBar />
                <Route path="/edit" component={ProfileEdit} />
                <Route path="/profile" component={Profile} />
                <Route path="/messages" component={Messages} />
                <Route path="/news" component={News} />
                <Route path="/music" component={Music} />
                <Route path="/settings" component={Settings} />
              </div>
            </div>
            : <>
              <Route path="/" component={Login} />
              <Route path="/register" component={Register} />
            </>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
