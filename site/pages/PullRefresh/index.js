import React, { Component } from 'react';
import { PullRefresh, Tabs, Toast } from '@components';
import renderHeader from '../renderHeader';
import './index.less';

const { TabPane } = Tabs;

@renderHeader('PullRefresh')
class PullRefreshPage extends Component {
  state = {
    isLoading: false,
    count: 0
  };

  onRefresh = showToast => {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        count: this.state.count + 1
      });
      showToast && Toast.info({ content: '刷新成功', duration: 2 });
    }, 2000);
  };

  render() {
    return (
      <div className='refresh-demo demo-box'>
        <Tabs>
          <TabPane title='基本用法'>
            <PullRefresh
              isLoading={this.state.isLoading}
              onRefresh={() => this.onRefresh(true)}
              style={{ height: 200 }}
            >
              <div style={{ padding: '16px 30px' }}>
                下拉刷新次数{this.state.count}
              </div>
            </PullRefresh>
          </TabPane>
          <TabPane title='成功提示'>
            <PullRefresh
              isLoading={this.state.isLoading}
              onRefresh={() => this.onRefresh(false)}
              successText='刷新成功'
              style={{ height: 200 }}
            >
              <div style={{ padding: '16px 30px' }}>
                下拉刷新次数{this.state.count}
              </div>
            </PullRefresh>
          </TabPane>
          <TabPane title='自定义提示'>
            <PullRefresh
              isLoading={this.state.isLoading}
              onRefresh={() => this.onRefresh(false)}
              successText='刷新成功'
              headerHeight={80}
              style={{ height: 200 }}
              pullingText={
                <img className='dog' src='https://b.yzcdn.cn/vant/doge.png' />
              }
              loosingText={
                <img
                  className='dog'
                  src='https://b.yzcdn.cn/vant/doge-fire.jpg'
                />
              }
            >
              <div style={{ padding: '16px 30px' }}>
                下拉刷新次数{this.state.count}
              </div>
            </PullRefresh>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PullRefreshPage;
