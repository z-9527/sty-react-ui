import React, { Component } from 'react';
import { classnames, throttle } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

/**
 * 实现的功能：
 * 滚动回弹、自动轮播、无限轮播、做完了最后总结
 */

class Swipe extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    autoplay: PropTypes.bool, // 是否自动切换
    autoplayInterval: PropTypes.number, // 切换时间间隔单位毫秒
    infinite: PropTypes.bool, // 是否循环播放，开启自动播放后默认循环播放
    dots: PropTypes.bool, // 是否显示指示点
    dotStyle: PropTypes.object, // 指示点样式
    onChange: PropTypes.func // 切换面板的回调
  }

  static defaultProps = {
    prefixCls: 'sty-swipe',
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

    if (this.props.autoplay) {
      this.auto();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  auto = () => {
    this.timer = setInterval(() => {
      this.onSlideChange(true);
    }, this.props.autoplayInterval);
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

  renderDots = () => {
    const { children, prefixCls, dotStyle } = this.props;
    const { activeIndex } = this.state;
    return React.Children.map(children, (child, index) => {
      return <span style={dotStyle} className={classnames({ [`${prefixCls}-dot`]: true, active: index === activeIndex })}></span>;
    });
  }

  onTouchStart = (event) => {
    if (this.props.autoplay) {
      clearInterval(this.timer);
    }
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
    this.touch.isNext = offsetX < 0; // 判断当前移动方向
    this.setState({
      translateX: this.touch.translateX + offsetX
    });
    const { autoplay, infinite } = this.props;
    const { activeIndex, childrenLength, width } = this.state;
    if (autoplay || infinite) {
      if (activeIndex === 0 && !this.touch.isNext) {
        this.setItemStyle(childrenLength - 1, `translateX(${-width * childrenLength}px)`);
      }
      if (activeIndex === childrenLength - 1 && this.touch.isNext) {
        this.setItemStyle(0, `translateX(${width * childrenLength}px)`);
      }
    }
  }, 10)

  onTouchEnd = () => {
    const { percent, isNext } = this.touch;
    // 移动距离百分比小于0.25时回到原位
    if (percent <= 0.25) {
      this.resetItem();
    } else {
      this.onSlideChange(isNext);
    }
    if (this.props.autoplay) {
      this.auto();
    }
    this.touch = null;
  }

  setItemStyle = (index, transform) => {
    const { prefixCls } = this.props;
    const activeDOM = this.swipe.querySelectorAll(`.${prefixCls}-item`)[index];
    activeDOM.style.transform = transform;
  }

  onSlideChange = (isNext) => {
    clearTimeout(this.slideTime);
    const { activeIndex, width, childrenLength } = this.state;
    const { autoplay, infinite } = this.props;
    let newIndex = isNext ? activeIndex + 1 : activeIndex - 1;
    console.log('newIndex: ', newIndex);
    const translateX = -newIndex * width;
    // 当第最后一个元素还在向后切换时,将第一个元素位置放置到最最后面,在动画结束后再将位置还原，完成一个循环
    if (newIndex === childrenLength || newIndex === -1) {
      if (!autoplay && !infinite) {
        return this.resetItem(); // 回弹
      } else {
        newIndex = isNext ? 0 : childrenLength - 1;
        this.setItemStyle(newIndex, `translateX(${isNext ? '' : '-'}${width * childrenLength}px)`);
        this.slideTime = setTimeout(() => {
          this.setState({
            translateX: -width * newIndex,
            transitionDuration: 0
          });
          this.setItemStyle(newIndex, 'none');
        }, 500);
      }
    }
    this.props.onChange(newIndex);
    this.setState({
      translateX,
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

  render() {
    const {
      prefixCls, className, autoplay, autoplayInterval, infinite, onChange,
      children, dots, dotStyle, style, ...other
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
        {dots && (
          <div className={`${prefixCls}-dots-box`}>
            {this.renderDots()}
          </div>
        )}
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
