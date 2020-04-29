import React, { Component } from 'react';
import Swipe from '@components/swipe';
import './index.less';

const data = [0, 1, 2, 3];

class SwipePage extends Component {
  state = {}
  render() {
    return (
      <div className='swipe-demo demo-box'>
        <Swipe className='swipe'>
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
