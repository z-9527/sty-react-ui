import React, { Component } from 'react';
import Swipe from '@components/swipe';
import renderHeader from '../renderHeader';
import './index.less';

const data = [0, 1, 2, 3];

@renderHeader('Swipe')
class SwipePage extends Component {
  state = {}
  render() {
    return (
      <div className='swipe-demo demo-box'>
        <div className='section-title-pl'>基本用法</div>
        <Swipe className='swipe'>
          {data.map((item, index) => {
            return (
              <Swipe.Item key={index} style={{ backgroundColor: index % 2 ? '#39a9ed' : '#66c6f2' }}>
                {index}
              </Swipe.Item>
            );
          })}
        </Swipe>
        <div className='section-title-pl mtop32'>自动播放</div>
        <Swipe autoplay className='swipe' onChange={(index) => { console.log(index); }}>
          {data.map((item, index) => {
            return (
              <Swipe.Item key={index} style={{ backgroundColor: index % 2 ? '#39a9ed' : '#66c6f2' }}>
                {index}
              </Swipe.Item>
            );
          })}
        </Swipe>
      </div>
    );
  }
}

export default SwipePage;
