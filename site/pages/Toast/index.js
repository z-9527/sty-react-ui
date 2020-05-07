import React, { Component } from 'react';
import Button from '@components/button';
import Toast from '@components/toast';
import renderHeader from '../renderHeader';
import './index.less';

@renderHeader('Toast')
class ToastPage extends Component {
  state = {
    configs: [
      { content: '文字提示' },
      { content: '这是一条长文字提示，超过一定字数就会换行' },
      { content: '加载中...', type: 'loading' },
      { content: '成功文案', type: 'success' },
      { content: '失败文案', type: 'fail' },
      { content: '自定义图标', icon: 'like-o' },
      { content: '自定义图标', icon: 'cart-o' }
    ]
  }

  showToast = (obj) => {
    const type = obj.type || 'info';
    Toast[type](obj);
  }

  render() {
    const { configs } = this.state;
    return (
      <div className='toast-demo demo-box'>
        <div className='section-title'>基本用法</div>
        <Button inline onClick={() => this.showToast(configs[0])}>文字提示</Button>
        <Button inline onClick={() => this.showToast(configs[1])}>长文字提示</Button>

        <div className='section-title'>加载提示</div>
        <Button inline onClick={() => this.showToast(configs[2])}>加载提示</Button>

        <div className='section-title'>成功失败</div>
        <Button inline type='primary' onClick={() => this.showToast(configs[3])}>成功提示</Button>
        <Button inline type='warning' onClick={() => this.showToast(configs[4])}>失败提示</Button>

        <div className='section-title'>自定义图标</div>
        <Button inline onClick={() => this.showToast(configs[5])}>自定义图标</Button>
        <Button inline onClick={() => this.showToast(configs[6])}>自定义图标</Button>
      </div>
    );
  }
}

export default ToastPage;
