import React, { Component } from 'react';
import renderHeader from '../renderHeader';
import TreeSelect from '@components/tree-select';
import Button from '@components/button';
import data from './data';
import './index.less';

@renderHeader('TreeSelect')
class TreeSelectPage extends Component {
  state = {
    active: []
  }

  onChange = (item) => {
    const { active } = this.state;
    let selects = [...active];
    const exist = selects.includes(item.id);
    if (exist) {
      selects = selects.filter(i => i !== item.id);
    } else {
      selects.push(item.id);
    }
    this.setState({
      active: selects
    });
  }

  render() {
    return (
      <div className='tree-select-demo demo-box'>
        <div className='section-title-pl sty-hairline sty-hairline--bottom'>单选模式</div>
        <TreeSelect items={data} height={300}/>
        <div className='section-title-pl sty-hairline sty-hairline--bottom'>多选模式</div>
        <TreeSelect items={data} multiple height={300}/>
        <div className='section-title-pl sty-hairline sty-hairline--bottom'>受控模式</div>
        <TreeSelect items={data} active={this.state.active} onChange={this.onChange} height={300}/>
        <Button inline onClick={() => this.setState({ active: [] })}>清空选中</Button>
        等checkbox写了之后代替button
      </div>
    );
  }
}

export default TreeSelectPage;
