import React, { Component } from 'react';
import Tabs from '@components/tabs';
import renderHeader from '../renderHeader';
import './index.less';

const TabPane = Tabs.TabPane;

@renderHeader('Tabs')
class TabsPage extends Component {
  state = {
    activeTab: 0
  }

  onChange = (index) => {
    this.setState({
      activeTab: index
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className='tabs-demo demo-box'>
        <div className='section-title'>基本用法</div>
        <Tabs activeTab={activeTab} onNavItemClick={this.onChange}>
          <TabPane title='标签1'>内容1</TabPane>
          <TabPane title='标签2'>内容2</TabPane>
          <TabPane title='标签3'>内容3</TabPane>
          <TabPane title='标签4'>内容4</TabPane>
          <TabPane title='标签5'>内容5</TabPane>
          <TabPane title='标签6'>内容6</TabPane>
        </Tabs>
        <div className='section-title'>无动画</div>
        <Tabs activeTab={activeTab} animated={false} onNavItemClick={this.onChange}>
          <TabPane title='标签1'>内容1</TabPane>
          <TabPane title='标签2'>内容2</TabPane>
          <TabPane title='标签3'>内容3</TabPane>
        </Tabs>
        <div className='section-title'>垂直样式</div>
        <Tabs activeTab={activeTab} tabBarPosition="left" style={{ height: 200 }} onNavItemClick={this.onChange}>
          <TabPane title='标签1'>内容1</TabPane>
          <TabPane title='标签2'>内容2</TabPane>
          <TabPane title='标签3'>内容3</TabPane>
          <TabPane title='标签4'>内容4</TabPane>
          <TabPane title='标签5'>内容5</TabPane>
          <TabPane title='标签6'>内容6</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default TabsPage;
