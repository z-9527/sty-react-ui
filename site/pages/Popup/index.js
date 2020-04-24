import React, { Component } from 'react';
import Popup from '@components/popup';
import renderHeader from '../renderHeader';

@renderHeader('Popup')
class PopupPage extends Component {
  state = {
    visible1: false
  }

  onClose = key => () => {
    this.setState({
      [key]: false
    });
  }

  onShow = key => () => {
    this.setState({
      [key]: !this.state.visible1
    });
  }

  render() {
    const { visible1 } = this.state;
    return (
      <div className='popup-demo demo-box'>
        <div>基本用法</div>
        <button onClick={this.onShow('visible1')}>fdafdaf</button>
        <Popup position='top' closable visible={visible1} onClose={this.onClose('visible1')}>
          fasdfaf
        </Popup>
        等radio做完了用这个，switch做完了用这个优化
      </div>
    );
  }
}

export default PopupPage;
