import React, { Component } from 'react';
import { Popup, Cell, Radio, Switch } from '@components';
import renderHeader from '../renderHeader';

const RadioGroup = Radio.RadioGroup;

@renderHeader('Popup')
class PopupPage extends Component {
  state = {
    visible: false,
    position: 'bottom',
    closable: false,
    round: false
  }

  onSetValue = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { visible, position, closable, round } = this.state;
    const isVertical = ['top', 'bottom'].includes(position);
    const style = {};
    if (isVertical) {
      style.height = '30vh';
    } else {
      style.width = '30vw';
    }

    return (
      <div className='popup-demo demo-box'>
        <div className='section-title-pl'>基本用法</div>
        <Cell title='展示弹出层' arrow='right' onClick={() => this.onSetValue('visible', true)} />
        <Popup
          style={style}
          position={position}
          closable={closable}
          round={round}
          visible={visible}
          onClose={() => this.onSetValue('visible', false)}
        >
        </Popup>
        <div className='section-title-pl'>弹出层位置</div>
        <RadioGroup cell value={position} onChange={(position) => this.onSetValue('position', position)}>
          <Radio value='top'>顶部弹出</Radio>
          <Radio value='bottom'>底部弹出</Radio>
          <Radio value='left'>左侧弹出</Radio>
          <Radio value='right'>右侧弹出</Radio>
          <Radio value='center'>中间弹出</Radio>
        </RadioGroup>

        <div className='section-title-pl'>其它设置</div>
        <Cell title='显示关闭图标'>
          <Switch checked={closable} onChange={(checked) => this.onSetValue('closable', checked)} />
        </Cell>
        <Cell title='是否圆角'>
          <Switch checked={round} onChange={(checked) => this.onSetValue('round', checked)} />
        </Cell>
      </div>
    );
  }
}

export default PopupPage;
