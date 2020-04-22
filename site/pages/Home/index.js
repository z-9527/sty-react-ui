import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = { }
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/button'>button</Link></li>
          <li><Link to='/loading'>loading</Link></li>
          <li><Link to='/tabs'>tabs</Link></li>
          <li><Link to='/icon'>icon</Link></li>
          <li><Link to='/index-list'>index-list</Link></li>
          <li><Link to='/nav-bar'>nav-bar</Link></li>
          <li><Link to='/timeline'>timeline</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;
