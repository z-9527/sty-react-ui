import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Icon from '@components/icon';
import './index.less';

class TreeSelect extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    height: PropTypes.number, // 组件高度
    items: PropTypes.array, // 数据
    multiple: PropTypes.bool, // 是否多选
    onNavClick: PropTypes.func, // 左侧导航点击事件
    onItemClick: PropTypes.func, // 子选项点击事件
    onChange: PropTypes.func, // 子选项切换事件
    active: PropTypes.oneOfType([PropTypes.array, PropTypes.string]) // 当前选中项
  }

  static defaultProps = {
    prefixCls: 'sty-tree-select',
    height: 300,
    items: [],
    multiple: false,
    onNavClick: () => { },
    onItemClick: () => { },
    onChange: () => { }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active } = nextProps;
    if (active === undefined) {
      return null;
    }
    return {
      activeItems: typeof active === 'string' ? [active] : active
    };
  }

  state = {
    activeNav: 0, // 当前点中的nav
    activeItems: [] // 当前选中的item
  }

  onNavClick = (nav, index) => {
    if (nav.disabled) {
      return;
    }
    this.props.onNavClick(index);
    this.setState({
      activeNav: index
    });
  }

  onItemClick = (item) => {
    this.props.onItemClick(item);
    this.props.onChange(item);
    if (item.disabled || this.props.active !== undefined) {
      return;
    }
    const { activeItems } = this.state;
    let selects = [...activeItems];
    if (this.props.multiple) {
      const exist = selects.includes(item.id);
      if (exist) {
        selects = selects.filter(i => i !== item.id);
      } else {
        selects.push(item.id);
      }
    } else {
      selects = [item.id];
    }
    this.setState({
      activeItems: selects
    });
  }

  render() {
    const {
      prefixCls, className, items, multiple, onNavClick, height, style,
      onItemClick, ...other
    } = this.props;
    const { activeNav, activeItems } = this.state;

    return (
      <div className={classnames(prefixCls, className)} style={{ ...style, height }} {...other}>
        <div className={`${prefixCls}-sidebar`}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => this.onNavClick(item, index)}
              className={classnames({
                active: activeNav === index,
                disabled: item.disabled,
                [`${prefixCls}-sidebar-item`]: true,
                ellipsis: true
              })}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className={`${prefixCls}-content`}>
          {items[activeNav] && items[activeNav].children && items[activeNav].children.map(i => (
            <div
              key={i.id}
              className={classnames({
                [`${prefixCls}-content-item`]: true,
                ellipsis: true,
                disabled: i.disabled,
                active: activeItems.includes(i.id)
              })}
              onClick={() => this.onItemClick(i)}
            >
              {i.text}
              {activeItems.includes(i.id) && <Icon className='select-icon' type='checked'/>}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TreeSelect;
