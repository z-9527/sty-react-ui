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

@renderHeader('Picker')
class PickerPage extends Component {
  state = {
    visible: false
  };

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    return (
      <div className='picker-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Picker
          onConfirm={v => {
            console.log('选中项', v);
          }}
          onCancel={() => console.log('取消')}
          title='标题'
          data={data1}
        />
        <div className='section-title-pl mtop32'>多列选择</div>
        <Picker
          onConfirm={v => {
            console.log('选中项', v);
          }}
          onCancel={() => console.log('取消')}
          defaultValue={['温州', '嘉兴']}
          title='标题'
          data={data2}
        />
        <div className='section-title-pl mtop32'>加载状态</div>
        <Picker
          onConfirm={v => {
            console.log('选中项', v);
          }}
          loading
          onCancel={() => console.log('取消')}
          defaultValue={['温州', '嘉兴']}
          title='标题'
          data={data2}
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
