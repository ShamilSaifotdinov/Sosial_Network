import React from 'react';
import c from "./Messages.module.css";
import UserContacts from "./UserContacts/UserContacts";
import DialogWindow from "./DialogWindow/DialogWindow";
import DialogWindowShimova from "./DialogWindowShimova/DialogWindowShimova";
import { BrowserRouter, Route, useRouteMatch } from 'react-router-dom';


const Messages = () => {
  let { path, url } = useRouteMatch();
  
  return (
    <BrowserRouter>
        <div className={c.Messages}>
          <UserContacts url={url} />
          <Route path={`${path}/:id`} component={DialogWindow} />
          {/* <Route path="/dialogwindowshimova" component={DialogWindowShimova} /> */}
        </div>
    </BrowserRouter>
  );
}

export default Messages;
