import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import Radio from '@components/radio';
import './index.less';

const RadioGroup = Radio.RadioGroup;

const data = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '芒果', value: 'mango' }
];

@renderHeader('Radio')
class RadioPage extends Component {
  state = {
    value: 'apple'
  }

  onChange = (value) => {
    this.setState({
      value
    });
  }

  render() {
    return (
      <div className='radio-demo demo-box'>
        <div className='section-title-pl'>基本用法</div>
        <RadioGroup className='demo-group' defaultValue='apple'>
          {data.map(item => (<Radio value={item.value} key={item.value}>{item.label}</Radio>))}
        </RadioGroup>

        <div className='section-title-pl'>水平排列</div>
        <RadioGroup className='demo-group' defaultValue='apple' direction='horizontal'>
          {data.map(item => (<Radio value={item.value} key={item.value}>{item.label}</Radio>))}
        </RadioGroup>

        <div className='section-title-pl'>禁用状态</div>
        <RadioGroup className='demo-group' defaultValue='apple' direction='horizontal'>
          {data.map(item => (<Radio disabled value={item.value} key={item.value}>{item.label}</Radio>))}
        </RadioGroup>

        <div className='section-title-pl'>自定义颜色</div>
        <RadioGroup color='rgb(7, 193, 96)' className='demo-group' defaultValue='apple' direction='horizontal'>
          {data.map(item => (<Radio value={item.value} key={item.value}>{item.label}</Radio>))}
        </RadioGroup>

        <div className='section-title-pl'>自定义形状</div>
        <RadioGroup value={this.state.value} onChange={this.onChange} className='demo-group' defaultValue='apple' direction='horizontal' shape='square'>
          {data.map(item => (<Radio value={item.value} key={item.value}>{item.label}</Radio>))}
        </RadioGroup>

        <div className='section-title-pl m-t32'>配合cell使用</div>
        <RadioGroup value={this.state.value} onChange={this.onChange} cell className='demo-group' defaultValue='apple'>
          {data.map(item => (<Radio value={item.value} key={item.value}>{item.label}</Radio>))}
        </RadioGroup>

      </div>
    );
  }
}

export default RadioPage;
