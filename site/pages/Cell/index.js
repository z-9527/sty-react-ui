import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import { Cell } from '@components';

@renderHeader('Cell')
class CellPage extends Component {
  state = {}
  render() {
    return (
      <div className='cell-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Cell title='标题'>右侧内容</Cell>
        <Cell title='标题' label='描述系信息'>右侧内容</Cell>

        <div className='section-title-pl mtop32'>展示箭头</div>
        <Cell title='标题' arrow="right" clickable></Cell>
        <Cell title='标题' arrow="down" clickable>右侧内容</Cell>
        <Cell title='标题' label='描述系信息' arrow="right" clickable>右侧内容</Cell>

        <div className='section-title-pl mtop32'>水波纹反馈</div>
        <Cell title='标题' arrow="right" ripple></Cell>
        <Cell title='标题' label='描述系信息' arrow="right" center ripple>居中内容</Cell>
      </div>
    );
  }
}

export default CellPage;
