import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import { TreeSelect, Checkbox } from '@components';
import data from './data';
import './index.less';

const CheckboxGroup = Checkbox.CheckboxGroup;

@renderHeader('TreeSelect')
class TreeSelectPage extends Component {
  state = {
    active: []
  };

  onChange = selects => {
    this.setState({
      active: selects
    });
  };

  render() {
    return (
      <div className='tree-select-demo demo-box'>
        <div className='section-title-pl sty-hairline sty-hairline--bottom'>
          单选模式
        </div>
        <TreeSelect items={data} height={300} />
        <div className='section-title-pl sty-hairline sty-hairline--bottom'>
          多选模式
        </div>
        <TreeSelect items={data} multiple height={300} />
        <div className='section-title-pl sty-hairline sty-hairline--bottom'>
          受控模式
        </div>
        <TreeSelect
          items={data}
          multiple
          active={this.state.active}
          onChange={this.onChange}
          height={300}
        />
        <CheckboxGroup
          className='checkbox-demo'
          value={this.state.active}
          onChange={this.onChange}
        >
          <Checkbox value='1'>杭州</Checkbox>
          <Checkbox value='2'>温州</Checkbox>
          <Checkbox value='3'>宁波</Checkbox>
          <Checkbox value='4'>义务</Checkbox>
        </CheckboxGroup>
      </div>
    );
  }
}

export default TreeSelectPage;
