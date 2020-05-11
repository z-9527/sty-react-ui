import React, { Component } from 'react';
import { TimeLine } from '@components';
import renderHeader from '../renderHeader';
import './index.less';

@renderHeader('TimeLine')
class TimeLinePage extends Component {
  state = {}
  render() {
    return (
      <div className='timeline-demo demo-box'>
        <div className='section-title-pl'>基本用法</div>
        <TimeLine>
          <TimeLine.Item time='2020-09-01'>
            君不见黄河之水天上来，奔流到海不复回。
            君不见高堂明镜悲白发，朝如青丝暮成雪。
          </TimeLine.Item>
          <TimeLine.Item active time='2020-10-21'>
            人生得意须尽欢，莫使金樽空对月。
            天生我材必有用，千金散尽还复来。
          </TimeLine.Item>
          <TimeLine.Item icon='like-o' time='2020-11-14'>
            烹羊宰牛且为乐，会须一饮三百杯。
            岑夫子，丹丘生，将进酒，杯莫停。
          </TimeLine.Item>
          <TimeLine.Item time='2020-12-04'>
            与君歌一曲，请君为我倾耳听。
            钟鼓馔玉不足贵，但愿长醉不愿醒。
          </TimeLine.Item>
        </TimeLine>
        <div className='section-title-pl'>隐藏时间</div>
        <TimeLine showTime={false}>
          <TimeLine.Item time='2020-09-01'>
            君不见黄河之水天上来，奔流到海不复回。
            君不见高堂明镜悲白发，朝如青丝暮成雪。
          </TimeLine.Item>
          <TimeLine.Item active time='2020-10-21'>
            人生得意须尽欢，莫使金樽空对月。
            天生我材必有用，千金散尽还复来。
          </TimeLine.Item>
          <TimeLine.Item time='2020-11-14'>
            烹羊宰牛且为乐，会须一饮三百杯。
            岑夫子，丹丘生，将进酒，杯莫停。
          </TimeLine.Item>
          <TimeLine.Item time='2020-12-04'>
            与君歌一曲，请君为我倾耳听。
            钟鼓馔玉不足贵，但愿长醉不愿醒。
          </TimeLine.Item>
        </TimeLine>
      </div>
    );
  }
}

export default TimeLinePage;
