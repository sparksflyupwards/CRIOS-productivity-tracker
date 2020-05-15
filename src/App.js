import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import SessionsList from "./components/session/sessions-list.component";
import NewSession from "./components/session/new-session.component";
import Statistics from './components/statistics/statistics.component';

function App() {
  return (
    <Router>
      <div className="container">
          <Navbar/>
          <br/>
          <Route path="/" exact component={SessionsList} />
          <Route path="/edit/:id" exact component={NewSession} />
          <Route path="/create" exact component={NewSession} />
          <Route path="/user" exact component={NewSession} />   
          <Route path="/statistics" exact component={Statistics} />   
      </div>
    </Router>
    
  );
}

export default App;
