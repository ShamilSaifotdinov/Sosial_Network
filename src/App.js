import './App.css';
import React from 'react';
import Header from "./modules/Header/Header";
import NavigationSideBar from "./modules/NavigationSideBar/NavigationSideBar";
import Profile from "./modules/Profile/Profile";
import Messages from "./modules/Messages/Messages";
import News from "./modules/News/News";
import Music from "./modules/Music/Music";
import Settings from "./modules/Settings/Settings";
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavigationSideBar />
        <Route path="/profile" component={Profile} />
        <Route path="/messages" component={Messages} />
        <Route path="/news" component={News} />
        <Route path="/music" component={Music} />
        <Route path="/settings" component={Settings} />
      </div>
    </BrowserRouter>
  );
}

export default App;
