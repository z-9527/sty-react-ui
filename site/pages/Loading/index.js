import React, { Component } from 'react';
import { Loading } from '@components';
import renderHeader from '../renderHeader';
import './index.less';

@renderHeader('Loading')
class LoadingPage extends Component {
  state = {}
  render() {
    return (
      <div className="loading-demo demo-box">
        <div className='section-title'>加载类型</div>
        <Loading />
        <Loading type="spinner" />

        <div className='section-title'>自定义颜色</div>
        <Loading color='#80D0C7'/>
        <Loading color='#80D0C7' type="spinner" />

        <div className='section-title'>自定义大小</div>
        <Loading size={24}/>
        <Loading size={24} type="spinner" />

        <div className='section-title'>加载文案</div>
        <Loading>加载中...</Loading>

        <div className='section-title'>垂直排列</div>
        <Loading vertical>加载中...</Loading>
      </div>
    );
  }
}

export default LoadingPage;
