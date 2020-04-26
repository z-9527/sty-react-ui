import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import Switch from '@components/switch';
import Cell from '@components/cell';
// import './index.less';

@renderHeader('Switch')
class SwitchPage extends Component {
  state = {
    checked: true
  }

  onChange = (checked) => {
    this.setState({
      checked
    });
  }

  render() {
    return (
      <div className='switch-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Cell title='默认选中'>
          <Switch defaultChecked />
        </Cell>
        <Cell title='禁用状态'>
          <Switch defaultChecked disabled />
        </Cell>
        <Cell title='加载状态'>
          <Switch loading />
        </Cell>
        <Cell title='自定义选中颜色'>
          <Switch defaultChecked color='skyblue' />
        </Cell>
        <Cell title='受控状态'>
          <Switch checked={this.state.checked} onChange={this.onChange} />
        </Cell>
        <Cell >
          <Switch checked={this.state.checked} onChange={this.onChange} />
        </Cell>
      </div>
    );
  }
}

export default SwitchPage;
