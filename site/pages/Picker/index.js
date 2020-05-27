import React, { Component } from 'react';
import { Picker } from '@components';
import renderHeader from '../renderHeader';

const data = [
  [
    { label: '杭州', value: '杭州' },
    { label: '宁波', value: '宁波' },
    { label: '温州', value: '温州', disabled: true },
    { label: '嘉兴', value: '嘉兴' },
    { label: '湖州', value: '湖州', disabled: true }
  ],
  [
    { label: '杭州', value: '杭州' },
    { label: '宁波', value: '宁波' },
    { label: '温州', value: '温州' },
    { label: '嘉兴', value: '嘉兴' },
    { label: '湖州', value: '湖州' }
  ]
];

@renderHeader('Picker')
class PickerPage extends Component {
  state = {};
  render() {
    return (
      <div className='picker-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Picker
          onConfirm={v => {
            console.log(v);
          }}
          defaultValue={['', '温州']}
          title='标题'
          data={data}
        />
      </div>
    );
  }
}

export default PickerPage;
