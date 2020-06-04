import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_DURATION = 300;
class PickerColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: 0,
      duration: DEFAULT_DURATION
    };
    this.currentIndex = -1;
    this.touch = null;
  }

  componentDidMount() {
    const index = this.getIndex(
      this.props.columnValue || this.props.defaultValue
    );
    this.setIndex(index);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list !== prevProps.list) {
      this.currentIndex = -1;
      const index = this.getIndex(this.props.defaultValue);
      this.setIndex(index);
    }
    if (
      this.props.columnValue &&
      this.props.columnValue !== prevProps.columnValue
    ) {
      const index = this.getIndex(this.props.columnValue);
      this.setIndex(index);
    }
  }

  onTouchStart = event => {
    event.persist();
    const { touches } = event;
    this.touch = {
      startX: touches[0].clientX,
      startY: touches[0].clientY,
      translateY: this.state.translateY
    };
    this.setState({
      duration: 0
    });
  };

  onTouchMove = event => {
    event.persist();
    const toucheCur = this.touch;
    if (!toucheCur) {
      return;
    }
    event.preventDefault();
    const { touches } = event;
    const offsetX = touches[0].clientX - toucheCur.startX;
    const offsetY = touches[0].clientY - toucheCur.startY;
    if (Math.abs(offsetY) < Math.abs(offsetX)) {
      return;
    }
    let offset = toucheCur.translateY + offsetY;
    offset = Math.min(44, Math.max(offset, -44 * this.props.list.length)); // 限制偏移区间 [-44*arr.length, 44]
    if (Math.abs(offset) > 10) {
      this.touch.moving = true;
    }
    this.setState({
      translateY: offset
    });
  };

  onTouchEnd = () => {
    this.setState({
      duration: DEFAULT_DURATION
    });
    // 防止点击事件触发onTouchEnd
    if (!this.touch.moving) {
      return;
    }
    const index = this.getIndexByOffset(this.state.translateY);
    this.setIndex(index, true);
  };

  getIndex = value => {
    let index = 0;
    const findIndex = this.props.list.findIndex(i => i.value === value);
    if (findIndex !== -1) {
      index = findIndex;
    }
    return index;
  };

  setIndex = (i, emitChange) => {
    const index = this.adjustIndex(i);
    const offset = -44 * index;
    this.setState({
      translateY: offset
    });
    if (index !== this.currentIndex) {
      this.currentIndex = index;
      this.props.onColumnChange(this.props.list[index].value, emitChange);
    }
  };

  getIndexByOffset = offset => {
    return Math.min(
      this.props.list.length - 1,
      Math.max(0, Math.round(-offset / 44))
    ); // 索引区间 [0,length-1]
  };

  // 主要是解决disabled选项
  adjustIndex = index => {
    const arr = this.props.list;
    index = Math.min(arr.length - 1, Math.max(0, index));
    for (let i = index; i < arr.length; i++) {
      if (!arr[i].disabled) {
        return i;
      }
    }
    for (let i = index - 1; i >= 0; i--) {
      if (!arr[i].disabled) {
        return i;
      }
    }
    return index;
  };

  onItemClick = index => {
    // 防止touch事件触发click
    if (this.touch && this.touch.moving) {
      return;
    }
    this.setIndex(index, true);
  };

  render() {
    const { visibleCount, prefixCls, list } = this.props;
    const { translateY, duration } = this.state;
    const baseOffset = (44 * (visibleCount - 1)) / 2;
    const sty = {
      transform: `translate3d(0,${translateY + baseOffset}px,0)`, // 通过3d变换开启浏览器的硬件加速
      transitionDuration: `${duration}ms`
    };

    return (
      <div
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        className={`${prefixCls}-column`}
      >
        <ul style={sty}>
          {list.map((item, index) => (
            <li
              onClick={() => this.onItemClick(index)}
              style={{ opacity: item.disabled ? 0.3 : 1 }}
              key={item.value}
            >
              {item.label}
              {item.disabled && <span style={{ fontSize: 14 }}>(禁用)</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default PickerColumn;
