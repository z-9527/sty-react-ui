import React, { Component } from 'react';
import { Image } from '@components';
import renderHeader from '../renderHeader';
import img from './img/cat.jpeg';
import './index.less';

const filList = ['contain', 'cover', 'fill', 'none', 'scale-down'];

const arr = new Array(10).fill(true);

@renderHeader('Image')
class ImagePage extends Component {
  state = {};
  render() {
    return (
      <div className='image-demo demo-box'>
        <div className='section-title'>基本用法</div>
        <Image src={img} />
        <div className='section-title mtop32'>图片懒加载</div>
        <div className='lazy-list'>
          {arr.map((item, index) => (
            <Image key={index} lazy src={`${img}?index=${index}`} />
          ))}
        </div>
        <div className='section-title mtop32'>填充模式</div>
        <div className='list'>
          {filList.map(item => (
            <div key={item} className='item'>
              <Image fit={item} src={img} className='have-border' />
              <div className='text'>{item}</div>
            </div>
          ))}
        </div>
        <div className='section-title mtop32'>加载提示</div>
        <div className='list'>
          <div className='item'>
            <Image />
            <div className='text'>加载中...</div>
          </div>
          <div className='item'>
            <Image src={'x'} />
            <div className='text'>加载失败</div>
          </div>
        </div>
        <div className='section-title mtop32'>圆形图片</div>
        <div className='list'>
          <div className='item'>
            <Image round src={img} />
            <div className='text'>round</div>
          </div>
          <div className='item'>
            <Image radius={10} src={img} />
            <div className='text'>自定义radius</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImagePage;
