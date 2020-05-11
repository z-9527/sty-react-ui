import React, { Component } from 'react';
import { Cell, ActionSheet } from '@components';
import renderHeader from '../renderHeader';
import './index.less';

const base = {
  actions: [{ name: '选项' }, { name: '选项' }, { name: '选项', subname: '副文本' }]
};
const status = {
  actions: [{ name: '选项', color: 'rgb(7, 193, 96)' }, { name: '选项', loading: true }, { name: '禁用选项', disabled: true }]
};

@renderHeader('ActionSheet')
class ActionSheetPage extends Component {
  state = {
    visible: false,
    config: {}
  }

  onShow = (config) => {
    this.setState({
      visible: true,
      config
    });
  }

  onClose = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div className='action-sheet-demo demo-box'>
        <div className='section-title-pl'>基础用法</div>
        <Cell title='基础用法' arrow='right' onClick={() => this.onShow({ ...base })} />
        <Cell title='展示取消按钮' arrow='right' onClick={() => this.onShow({ ...base, cancelText: '取消' })} />
        <Cell title='展示描述信息' arrow='right' onClick={() => this.onShow({ ...base, description: '这是一段描述信息' })} />

        <div className='section-title-pl'>选项状态</div>
        <Cell title='选项状态' arrow='right' onClick={() => this.onShow({ ...status })} />

        <div className='section-title-pl'>自定义面板</div>
        <Cell title='自定义面板' arrow='right' onClick={() => this.onShow({ title: '标题', children: <div className='content'>内容</div> })} />

        <ActionSheet
          visible={this.state.visible}
          onClose={this.onClose}
          onSelect={(index) => console.log(index)}
          {...this.state.config}
        />
      </div>
    );
  }
}

export default ActionSheetPage;
