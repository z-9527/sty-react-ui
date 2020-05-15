import React, { Component } from 'react';
import { Image } from '@components';
import renderHeader from '../renderHeader';
import img from './img/cat.jpeg';
import './index.less';

const filList = ['contain', 'cover', 'fill', 'none', 'scale-down'];

@renderHeader('Image')
class ImagePage extends Component {
  state = {}
  render() {
    return (
      <div className='image-demo demo-box'>
        <div className='section-title'>基本用法</div>
        <Image src={img} />

        <div className='section-title'>填充模式</div>
        {filList.map(item => (
          <div key={item} className='item'>
            <Image fit={item} src={img} />
            <div>{item}</div>
          </div>
        ))}

        <div className='section-title'>加载提示</div>
        <Image src={'x'} /> <Image />
      </div>
    );
  }
}

export default ImagePage;
