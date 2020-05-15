import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import { Switch, Cell } from '@components';

@renderHeader('Switch')
class SwitchPage extends Component {
  state = {
    checked: true
  };

  onChange = checked => {
    this.setState({
      checked
    });
  };

  render() {
    return (
      <div className='switch-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Cell center title='默认选中'>
          <Switch defaultChecked />
        </Cell>
        <Cell center title='禁用状态'>
          <Switch defaultChecked disabled />
        </Cell>
        <Cell center title='加载状态'>
          <Switch loading />
        </Cell>
        <Cell center title='自定义选中颜色'>
          <Switch defaultChecked color='skyblue' />
        </Cell>
        <Cell center title='受控状态'>
          <Switch checked={this.state.checked} onChange={this.onChange} />
        </Cell>
        <Cell center>
          <Switch checked={this.state.checked} onChange={this.onChange} />
        </Cell>
      </div>
    );
  }
}

export default SwitchPage;
