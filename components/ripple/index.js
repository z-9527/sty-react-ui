import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

class Ripple extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    center: PropTypes.bool, // 是否中心点触发波纹
    color: PropTypes.string // 波纹颜色
  };

  static defaultProps = {
    prefixCls: 'sty-ripple',
    center: false,
    color: ''
  };

  componentDidMount() {
    if ('ontouchstart' in document) {
      this.rippleBox.addEventListener('touchstart', this.onTouchStart);
      this.rippleBox.addEventListener('touchend', this.onTouchEnd);
    } else {
      this.rippleBox.addEventListener('mousedown', this.onTouchStart);
      this.rippleBox.addEventListener('mouseup', this.onTouchEnd);
    }
  }

  componentWillUnmount() {
    if ('ontouchstart' in document) {
      this.rippleBox.removeEventListener('touchstart', this.onTouchStart);
      this.rippleBox.removeEventListener('touchend', this.onTouchEnd);
    } else {
      this.rippleBox.removeEventListener('mousedown', this.onTouchStart);
      this.rippleBox.removeEventListener('mouseup', this.onTouchEnd);
    }
  }

  getPointRel = point => {
    const rippleBoxRect = this.rippleBox.getBoundingClientRect();
    if (this.props.center) {
      return {
        top: rippleBoxRect.height / 2,
        left: rippleBoxRect.width / 2,
        width: rippleBoxRect.width,
        height: rippleBoxRect.height
      };
    }
    return {
      top: point.clientY - rippleBoxRect.top,
      left: point.clientX - rippleBoxRect.left,
      width: rippleBoxRect.width,
      height: rippleBoxRect.height
    };
  };

  onTouchStart = event => {
    const pointRel = this.getPointRel(event.touches ? event.touches[0] : event);
    this.shadowDiv &&
      this.shadowDiv.parentNode &&
      this.shadowDiv.parentNode.removeChild(this.shadowDiv);
    clearTimeout(this.timer);

    const shadowDiv = document.createElement('div');
    shadowDiv.classList.add(`${this.props.prefixCls}-shadow`);
    // cssText会重新覆盖其它内连样式
    shadowDiv.style.cssText = `top:${pointRel.top}px;left:${pointRel.left}px;`;
    this.rippleBox.appendChild(shadowDiv);

    shadowDiv.style.transition = shadowDiv.style.webkitTransition =
      'transform 0.25s ease-in-out 0s';
    shadowDiv.style.transform = shadowDiv.style.webkitTransform = 'scale(1.4)';
    if (this.props.color) {
      shadowDiv.style.backgroundColor = this.props.color;
    }

    this.pointRel = pointRel;
    this.shadowDiv = shadowDiv;
  };

  onTouchEnd = () => {
    const { width, height } = this.pointRel;
    const max = Math.max(height, width);
    const duration = Math.min(2, Math.max(0.6, max / 400)); // [0.6,2]

    this.shadowDiv.style.transition = `transform ${duration}s ease-in-out 0s, opacity ${
      duration - 0.3
    }s linear 0s`;
    this.shadowDiv.style.transform = `scale(${max / 5})`;
    this.shadowDiv.style.opacity = '0';

    this.timer = setTimeout(() => {
      this.shadowDiv &&
        this.shadowDiv.parentNode &&
        this.shadowDiv.parentNode.removeChild(this.shadowDiv);
    }, duration * 1000);
  };

  state = {};
  render() {
    const {
      prefixCls,
      className,
      center,
      children,
      color,
      ...other
    } = this.props;
    return (
      <div
        ref={el => (this.rippleBox = el)}
        className={classnames(`${prefixCls}`, className)}
        {...other}
      >
        {children}
      </div>
    );
  }
}

export default Ripple;
