import React, { Component } from 'react';
import { Picker, Popup, Cell } from '@components';
import renderHeader from '../renderHeader';

const data1 = [
  [
    { label: '杭州', value: '杭州' },
    { label: '宁波', value: '宁波' },
    { label: '温州', value: '温州' },
    { label: '嘉兴', value: '嘉兴' },
    { label: '湖州', value: '湖州' }
  ]
];
const data2 = [
  [
    { label: '杭州', value: '杭州' },
    { label: '宁波', value: '宁波' },
    { label: '温州', value: '温州' },
    { label: '嘉兴', value: '嘉兴' },
    { label: '湖州', value: '湖州' }
  ],
  [
    { label: '杭州', value: '杭州' },
    { label: '宁波', value: '宁波' },
    { label: '温州', value: '温州' },
    { label: '嘉兴', value: '嘉兴' },
    { label: '湖州', value: '湖州' }
  ]
];
const data3 = [
  [
    {
      label: '浙江',
      value: '浙江',
      children: [
        {
          label: '杭州',
          value: '杭州',
          children: [
            { label: '西湖区', value: '西湖区' },
            { label: '余杭区', value: '余杭区' }
          ]
        },
        {
          label: '温州',
          value: '温州',
          children: [
            { label: '鹿城区', value: '鹿城区' },
            { label: '瓯海区', value: '瓯海区' }
          ]
        }
      ]
    },
    {
      label: '福建',
      value: '福建',
      children: [
        {
          label: '福州',
          value: '福州',
          children: [
            { label: '鼓楼区', value: '鼓楼区' },
            { label: '台江区', value: '台江区' }
          ]
        },
        {
          label: '厦门',
          value: '厦门',
          children: [
            { label: '思明区', value: '思明区' },
            { label: '海沧区', value: '海沧区' }
          ]
        }
      ]
    }
  ]
];

@renderHeader('Picker')
class PickerPage extends Component {
  state = {
    visible: false,
    value: []
  };

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  onChange = v => {
    this.setState({
      value: v
    });
  };

  render() {
    return (
      <div className='picker-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Picker title='标题' data={data1} onConfirm={v => console.log(v)} />
        <div className='section-title-pl mtop32'>多列选择</div>
        <Picker
          defaultValue={['温州', '嘉兴']}
          title='标题'
          data={data2}
          onConfirm={v => console.log(v)}
        />
        <div className='section-title-pl mtop32'>加载状态</div>
        <Picker
          loading
          defaultValue={['温州', '嘉兴']}
          title='标题'
          data={data2}
        />
        <div className='section-title-pl mtop32'>级联选择</div>
        <Picker
          value={this.state.value}
          onCancel={() => console.log('取消')}
          defaultValue={['福建', '厦门']}
          // onChange={v => console.log(v)}
          onChange={this.onChange}
          onConfirm={v => console.log(v)}
          title='标题'
          cascade
          data={data3}
        />
        <div className='section-title-pl mtop32'>搭配弹层使用</div>
        <Cell
          title='标题'
          arrow='right'
          clickable
          onClick={this.toggleVisible}
        ></Cell>
        <Popup
          position='bottom'
          visible={this.state.visible}
          onClose={this.toggleVisible}
        >
          <Picker
            onConfirm={v => {
              this.toggleVisible();
              console.log('选中项', v);
            }}
            onCancel={() => {
              this.toggleVisible();
              console.log('取消');
            }}
            title='标题'
            data={data2}
          />
        </Popup>
      </div>
    );
  }
}

export default PickerPage;
