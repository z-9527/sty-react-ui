import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import Icon from '@components/icon';
import './index.less';

class TimeLine extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    showTime: PropTypes.bool // 是否显示时间
  }

  static defaultProps = {
    prefixCls: 'sty-timeline',
    showTime: true
  }

  renderItem = () => {
    const { children, showTime, prefixCls } = this.props;
    const length = React.Children.count(children);
    return React.Children.map(children, (child, index) => {
      if (child.type === Item) {
        return React.cloneElement(child, { ...child.props, showTime, prefixCls, index, length });
      }
    });
  }

  state = {}
  render() {
    const { prefixCls, className, showTime, length, index, ...other } = this.props;
    return (
      <div className={classnames(className, `${prefixCls}`)} {...other}>
        {this.renderItem()}
      </div>
    );
  }
}

const Item = props => {
  // eslint-disable-next-line react/prop-types
  let { prefixCls, showTime, time, active, className, children, index, icon, length, ...other } = props;
  const isLast = index === length - 1;
  const lineSty = {
    top: index === 0 ? 24 : 0,
    height: isLast ? 20 : '100%'
  };
  if (typeof icon === 'string') {
    icon = <Icon size="24" type={icon} />;
  }
  const times = time.split('-');
  return (
    <div className={classnames(`${prefixCls}-item`, className)} {...other}>
      {showTime && <div className={`${prefixCls}-item-time`}><div>{times[0]}</div><div>{times[1]}-{times[2]}</div></div>}
      <div className={`${prefixCls}-item-line-box`}>
        <div className={`${prefixCls}-item-line`} style={lineSty} />
        {icon ? <div className={`${prefixCls}-item-icon`}>{icon}</div>
          : <div className={classnames({ [`${prefixCls}-item-dot`]: true, active })} style={{ top: index === 0 ? 16 : 20 }}></div>}
      </div>
      <div className={`${prefixCls}-item-content sty-hairline`}>{children}</div>
    </div>
  );
};

TimeLine.Item = Item;

export default TimeLine;
