import React from 'react';
import c from "./Messages.module.css";
import UserContacts from "./UserContacts/UserContacts";
import DialogWindow from "./DialogWindow/DialogWindow";
// import DialogWindowShimova from "./DialogWindowShimova/DialogWindowShimova";
import { BrowserRouter, Route } from 'react-router-dom';


const Messages = ({ match }) => {
  return (
    <div className={c.Messages}>
      <UserContacts match={match} />
      <Route path={`${match.path}/:id`} component={DialogWindow} />
      {/* <Route path="/dialogwindowshimova" component={DialogWindowShimova} /> */}
    </div>
    // <BrowserRouter basename="/messages">
    // </BrowserRouter>

  );
}

export default Messages;
