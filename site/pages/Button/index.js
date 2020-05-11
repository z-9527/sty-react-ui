import React, { Component } from 'react';
import { Button } from '@components';
import renderHeader from '../renderHeader';
import './index.less';

@renderHeader('Button')
class ButtonPage extends Component {
  state = {}
  render() {
    return (
      <div className='button-demo demo-box'>
        <div className='section-title'>按钮类型</div>
        <Button>default</Button>
        <Button type="primary">primary</Button>
        <Button type="warning">warning</Button>
        <Button type="ghost">ghost</Button>

        <div className='section-title'>行内按钮</div>
        <Button inline>default</Button>
        <Button inline type="primary">primary</Button>
        <Button inline type="warning">warning</Button>
        <Button inline type="ghost">ghost</Button>
        <Button round inline type="ghost">round</Button>

        <div className='section-title'>禁用</div>
        <Button disabled inline>default</Button>
        <Button disabled inline type="primary">primary</Button>

        <div className='section-title'>加载和图标</div>
        <Button loading inline type="primary">primary</Button>
        <Button loading inline type="warning">warning</Button>
        <Button inline icon='like-o' type="ghost">ghost</Button>
      </div>
    );
  }
}

export default ButtonPage;
