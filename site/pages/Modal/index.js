import React, { Component } from 'react';
import { Modal, Button } from '@components';
import renderHeader from '../renderHeader';

const actions = [
  { text: '取消', onPress: () => console.log('点击了取消'), style: { color: '#000' } },
  { text: '确定', onPress: () => console.log('确定') }
  // { text: '取消', onPress: () => console.log('点击了取消') }
];

@renderHeader('Modal')
class ModalPage extends Component {
  state = {
    visible: false
  }

  test = () => {
    Modal.alert({
      message: '信息',
      title: '标题',
      actions: [{
        text: '确认',
        onPress: () => { },
        style: {}
      }]
    });
  }

  onShow = () => {
    this.setState({
      visible: true
    });
  }

  onClose = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div className='modal-demo demo-box'>
        <Button onClick={this.test}>警告</Button>
        <Button onClick={this.onShow}>组件调用</Button>
        <Modal visible={this.state.visible} onClose={this.onClose} title='title' footer={actions}>
          fldsakjflkajf
        </Modal>
      </div>
    );
  }
}

export default ModalPage;
