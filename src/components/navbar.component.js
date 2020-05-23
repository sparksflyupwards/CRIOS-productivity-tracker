import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CRIOS 0.0</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Sessions</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create New Session</Link>
          </li>
          <li className="navbar-item">
          <Link to="/statistics" className="nav-link">Statistics</Link>
          </li>
          <li className="navbar-item">
          <Link to="/creatures" className="nav-link">Creatures</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}