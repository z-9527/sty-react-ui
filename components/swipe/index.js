import React, { Component } from 'react';
import { classnames, throttle } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

/**
 * 实现的功能：
 * 自动轮播、无限轮播、做完了最后总结
 */

class Swipe extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    vertical: PropTypes.bool, // 是否垂直显示
    autoplay: PropTypes.bool, // 是否自动切换
    autoplayInterval: PropTypes.number, // 切换时间间隔单位毫秒
    infinite: PropTypes.bool, // 是否循环播放，开启自动播放后默认循环播放
    dots: PropTypes.bool, // 是否显示指示点
    dotStyle: PropTypes.object, // 指示点样式
    activeIndex: PropTypes.number, // 当前活动的面板
    defaultActive: PropTypes.number, // 初始化显示的面板
    onChange: PropTypes.func // 切换面板的回调
  }

  static defaultProps = {
    prefixCls: 'sty-swipe',
    vertical: false,
    autoplay: false,
    autoplayInterval: 3000,
    infinite: false,
    dots: true,
    dotStyle: {},
    onChange: () => { }
  }

  state = {
    activeIndex: 0,
    translateX: 0,
    transitionDuration: 500,
    width: window.innerWidth,
    childrenLength: 0
  }

  componentDidMount() {
    this.setState({
      width: this.swipe.offsetWidth,
      childrenLength: React.Children.count(this.props.children)
    });

    // if (this.props.autoplay) {
    //   this.timer = setInterval(() => {
    //     this.nextItem();
    //   }, this.props.autoplayInterval);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeItem = (direction) => {
    const { activeIndex, width, childrenLength } = this.state;
    let newIndex = activeIndex;
    if (direction === 'next') {
      newIndex = (activeIndex + 1) % childrenLength;
    } else {
      newIndex = (activeIndex + childrenLength - 1) % childrenLength;
    }
    this.setState({
      translateX: -newIndex * width,
      activeIndex: newIndex,
      transitionDuration: 500
    });
  }

  // 回到当前活动item
  resetItem = () => {
    const { activeIndex, width } = this.state;
    this.setState({
      transitionDuration: 500,
      translateX: -activeIndex * width
    });
  }

  renderItem = () => {
    const { children, prefixCls } = this.props;
    return React.Children.map(children, (child, index) => {
      if (child.type === Item) {
        return React.cloneElement(child, {
          ...child.props,
          prefixCls: `${prefixCls}-item`,
          index
        });
      }
      return child;
    });
  }

  onTouchStart = (event) => {
    event.persist && event.persist();
    const touch = event.touches[0];
    this.touch = {
      startX: touch.pageX,
      startY: touch.pageY,
      translateX: this.state.translateX
    };
    this.setState({
      transitionDuration: 0
    });
  }

  onTouchMove = throttle((event) => {
    // 有时候会遇见移动后item没有复原的情况，所以这里判断一下,onTouchMove可能会重复触发
    if (!this.touch) {
      return;
    }
    const touch = event.touches[0];
    const offsetX = touch.pageX - this.touch.startX; // 计算移动距离
    const percent = Math.abs(offsetX / this.state.width); // 计算移动距离百分比
    this.touch.percent = percent;
    this.touch.direction = offsetX < 0 ? 'next' : 'pre'; // 判断当前移动方向
    this.setState({
      translateX: this.touch.translateX + offsetX
    });
  }, 10)

  onTouchEnd = () => {
    const { percent, direction } = this.touch;
    const { activeIndex, childrenLength } = this.state;
    const { autoplay, infinite } = this.props;
    // 移动距离百分比小于0.25时回到原位
    if (percent <= 0.25) {
      this.resetItem();
    } else {
      if (direction === 'next') {
        // 当不是无限滚动或自动播放时，最后一个有回弹效果
        if (activeIndex === childrenLength - 1 && !autoplay && !infinite) {
          this.resetItem();
        } else {
          this.changeItem(direction);
        }
      } else {
        if (activeIndex === 0 && !autoplay && !infinite) {
          this.resetItem();
        } else {
          this.changeItem(direction);
        }
      }
    }
    this.touch = null;
  }

  render() {
    const {
      prefixCls, className, vertical, autoplay, autoplayInterval, infinite, onChange,
      activeIndex, defaultActive, children, dots, dotStyle, style, ...other
    } = this.props;
    const { translateX, transitionDuration } = this.state;
    const sty = {
      ...style,
      transform: `translateX(${translateX}px)`,
      transitionDuration: `${transitionDuration}ms`
    };
    return (
      <div
        className={`${prefixCls}-wrapper`}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <div
          ref={el => this.swipe = el}
          className={classnames(className, prefixCls)}
          style={sty}
          {...other}
        >
          {this.renderItem()}
        </div>
      </div>
    );
  }
}

const Item = props => {
  const { prefixCls, index, className, ...other } = props;
  return (
    <div className={classnames(className, prefixCls)} {...other}>
      {props.children}
    </div>
  );
};

Swipe.Item = Item;

export default Swipe;
