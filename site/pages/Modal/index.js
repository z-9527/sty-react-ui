import React, { Component } from 'react';
import { Modal, Button } from '@components';
import renderHeader from '../renderHeader';
import './index.less';

function asynClose() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const actions = [
  { text: '取消', onPress: () => console.log('点击了取消'), style: { color: '#000' } },
  { text: '确定', onPress: () => console.log('确定') }
];

const asynActions = [
  { text: '取消', onPress: () => console.log('点击了取消'), style: { color: '#000' } },
  { text: '确定', onPress: asynClose }
];

@renderHeader('Modal')
class ModalPage extends Component {
  state = {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false
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

  onShow = (key) => {
    this.setState({
      [key]: true
    });
  }

  onClose = (key) => {
    this.setState({
      [key]: false
    });
  }

  render() {
    const { visible1, visible2, visible3, visible4 } = this.state;
    return (
      <div className='modal-demo demo-box'>
        <div className='section-title'>基本用法</div>
        <Button onClick={() => this.onShow('visible1')}>提示弹窗</Button>
        <Modal
          visible={visible1}
          onClose={() => this.onClose('visible1')}
          title='标题'
          footer={[{ text: '确认' }]}
        >
          代码是写出来给人看的，附带能在机器上运行
        </Modal>

        <div className='section-title'>确认弹窗</div>
        <Button onClick={() => this.onShow('visible2')}>确认弹窗</Button>
        <Modal
          visible={visible2}
          onClose={() => this.onClose('visible2')}
          title='标题'
          footer={actions}
        >
          代码是写出来给人看的，附带能在机器上运行
        </Modal>

        <div className='section-title'>更多按钮</div>
        <Button onClick={() => this.onShow('visible3')}>更多按钮</Button>
        <Modal
          visible={visible3}
          onClose={() => this.onClose('visible3')}
          title='标题'
          footer={[{ text: '选项1' }, { text: '选项2' }, { text: '选项3' }]}
        >
          代码是写出来给人看的，附带能在机器上运行
        </Modal>

        <div className='section-title'>异步关闭</div>
        <Button onClick={() => this.onShow('visible4')}>异步关闭</Button>
        <Modal
          visible={visible4}
          onClose={() => this.onClose('visible4')}
          title='标题'
          footer={asynActions}
        >
          代码是写出来给人看的，附带能在机器上运行
        </Modal>

      </div>
    );
  }
}

export default ModalPage;
