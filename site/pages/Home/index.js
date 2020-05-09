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
          <li><Link to='/tree-select'>tree-select</Link></li>
          <li><Link to='/popup'>PopupPage</Link></li>
          <li><Link to='/cell'>CellPage</Link></li>
          <li><Link to='/switch'>SwitchPage</Link></li>
          <li><Link to='/radio'>radio</Link></li>
          <li><Link to='/checkbox'>checkbox</Link></li>
          <li><Link to='/swipe'>SwipePage</Link></li>
          <li><Link to='/toast'>ToastPage</Link></li>
          <li><Link to='/action-sheet'>action-sheet</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;
