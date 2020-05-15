import React, { Component } from 'react';
import { classnames } from '../_utils';
import './index.less';

class Section extends Component {
  state = {};
  renderChildren = () => {
    const { children, prefixCls } = this.props;
    return React.Children.map(children, item => {
      if (item.type === Cell) {
        return React.cloneElement(item, { ...item.props, prefixCls });
      }
      return item;
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { index, prefixCls, activeIndex, sticky, firstTitle } = this.props;
    const isSticky = activeIndex === index && sticky;
    return (
      <li className={`${prefixCls}-section`} data-index={index}>
        <p
          className={classnames({
            [`${prefixCls}-section-title`]: true,
            [`${prefixCls}-section-title-sticky`]: isSticky
          })}
        >
          {index}
        </p>
        <ul style={{ marginTop: isSticky ? firstTitle.offsetHeight : 0 }}>
          {this.renderChildren()}
        </ul>
      </li>
    );
  }
}

const Cell = props => {
  const { prefixCls, ...other } = props;
  return (
    <li className={`${prefixCls}-cell`} {...other}>
      {props.children}
    </li>
  );
};

Section.Cell = Cell;

export default Section;
