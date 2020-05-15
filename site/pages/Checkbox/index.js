import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import { Checkbox } from '@components';
import './index.less';

const data = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '芒果', value: 'mango' }
];

const CheckboxGroup = Checkbox.CheckboxGroup;

@renderHeader('Checkbox')
class CheckboxPage extends Component {
  state = {
    value: []
  };

  onChange = value => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <div className='checkbox-demo demo-box'>
        <div className='section-title-pl'>基本用法</div>
        <Checkbox className='demo-group' defaultChecked>
          同意
        </Checkbox>

        <div className='section-title-pl'>禁用状态</div>
        <CheckboxGroup className='demo-group' defaultValue={['apple']}>
          {data.map(item => (
            <Checkbox
              disabled={item.value === 'mango'}
              value={item.value}
              key={item.value}
            >
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <div className='section-title-pl'>自定义颜色</div>
        <CheckboxGroup
          color='rgb(7, 193, 96)'
          className='demo-group'
          defaultValue={['apple']}
        >
          {data.map(item => (
            <Checkbox value={item.value} key={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <div className='section-title-pl'>自定义形状</div>
        <CheckboxGroup
          shape='round'
          className='demo-group'
          defaultValue={['apple']}
        >
          {data.map(item => (
            <Checkbox value={item.value} key={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <div className='section-title-pl'>垂直布局</div>
        <CheckboxGroup
          value={this.state.value}
          onChange={this.onChange}
          direction='vertical'
          className='demo-group'
          defaultValue={['apple']}
        >
          {data.map(item => (
            <Checkbox value={item.value} key={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <div className='section-title-pl mtop32'>cell和受控</div>
        <CheckboxGroup
          value={this.state.value}
          onChange={this.onChange}
          cell
          defaultValue={['apple']}
        >
          {data.map(item => (
            <Checkbox
              disabled={item.value === 'banana'}
              value={item.value}
              key={item.value}
            >
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    );
  }
}

export default CheckboxPage;
