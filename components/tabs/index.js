import React, { Component } from 'react';
import { classnames } from '../_utils';
import PropTypes from 'prop-types';
import './index.less';

class Tabs extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    initIndex: PropTypes.number, // 初始化的page
    activeTab: PropTypes.number, // 控制当前活动的标签
    onChange: PropTypes.func, // 面板切换事件
    onNavItemClick: PropTypes.func, // 导航title点击事件
    lineColor: PropTypes.string, // 下滑线颜色
    tabBarActiveTextColor: PropTypes.string, // 激活文字颜色
    tabBarInactiveTextColor: PropTypes.string, // 非激活文字颜色
    tabBarPosition: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
    animated: PropTypes.bool // 是否开启切换动画
  }

  static defaultProps = {
    prefixCls: 'sty-tabs',
    initIndex: 0,
    onChange: () => { },
    onNavItemClick: () => { },
    tabBarPosition: 'top',
    animated: true
  }

  state = {
    activeIndex: 0,
    isVertical: false,
    tabBarHeight: 50 // tabBar高度，vertical布局需要知道
  }

  componentDidMount() {
    this.initPostion();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeTab !== undefined && this.props.activeTab !== prevProps.activeTab) {
      this.goToTab(this.props.activeTab);
    }
  }

  initPostion = () => {
    const isVertical = ['right', 'left'].includes(this.props.tabBarPosition);
    this.setState({
      isVertical,
      tabBarHeight: this.tabBar.offsetHeight
    }, () => {
      this.goToTab(this.props.activeTab || this.props.initIndex);
    });
  }

  renderContent = () => {
    const { prefixCls, tabBarPosition, children } = this.props;
    const { activeIndex } = this.state;
    return React.Children.map(children, (item, index) => {
      if (item.type === TabPane) {
        return React.cloneElement(item, { ...item.props, prefixCls, activeIndex, index, tabBarPosition });
      }
      return null;
    });
  }

  renderTabBar = () => {
    const { children, prefixCls, tabBarActiveTextColor, tabBarInactiveTextColor } = this.props;
    const { activeIndex } = this.state;
    return React.Children.map(children, (item, index) => {
      const cls = {
        [`${prefixCls}-bar-tab`]: true,
        [`${prefixCls}-bar-tab-active`]: activeIndex === index
      };
      const style = {
        color: activeIndex === index ? tabBarActiveTextColor : tabBarInactiveTextColor
      };
      if (item.type === TabPane) {
        return (
          <div onClick={() => this.onNavItemClick(index)} className={classnames(cls)} style={style}>
            <div className={`${prefixCls}-bar-tab-title`}>
              {item.props.title}
            </div>
          </div>
        );
      }
      return null;
    });
  }

  onNavItemClick = (index) => {
    this.props.onNavItemClick(index);
    if (this.props.activeTab !== undefined) {
      return;
    }
    this.goToTab(index);
  }

  _getValidIndex = index => {
    // 防止索引超过列表长度和小于0
    const count = React.Children.count(this.props.children);
    return Math.min(count - 1, Math.max(0, index));
  }

  goToTab = (index) => {
    index = this._getValidIndex(index);
    const activeDOM = this.tabBar.querySelectorAll(`.${this.props.prefixCls}-bar-tab`)[index];

    this.tabBarAnimate(index, activeDOM);
    this.lineAnimate(index, activeDOM);
    this.contentAnimate(index);
    this.setState({
      activeIndex: index
    });

    if (index !== this.state.activeIndex) {
      this.props.onChange(index);
    }
  }

  contentAnimate = (index) => {
    const { isVertical, tabBarHeight } = this.state;
    if (isVertical) {
      this.tabsContent.style.transform = `translate3d(0, -${index * tabBarHeight}px, 1px)`;
    } else {
      this.tabsContent.style.transform = `translate3d(-${index * 100}%, 0px, 1px)`;
    }
  }

  tabBarAnimate = (index, target) => {
    const count = React.Children.count(this.props.children);
    // 让滚动菜单居中
    if (count > 4) {
      const { offsetWidth, offsetHeight } = target;
      const { isVertical, tabBarHeight } = this.state;
      const { animated } = this.props;

      this.tabBar.scrollTo({
        left: isVertical ? 0 : index * offsetWidth - window.innerWidth / 2 + offsetWidth / 2,
        top: isVertical ? index * offsetHeight - tabBarHeight / 2 + offsetHeight / 2 : 0,
        behavior: animated ? 'smooth' : 'instant'
      });
    }
  }

  // 下划线流体动画效果，先变化长度然后再变化位置或先变化位置再变化长度
  lineAnimate = (index, target) => {
    const { animated } = this.props;
    const { activeIndex: oldIndex, isVertical } = this.state;
    const { offsetWidth, offsetLeft, offsetHeight, offsetTop } = target;

    const move = isVertical ? offsetTop : offsetLeft; // 移动距离
    const direction = isVertical ? 'top' : 'left'; // 移动方向
    const property = isVertical ? 'height' : 'width'; // 变化属性
    const size = isVertical ? offsetHeight : offsetWidth; // 变化大小

    if (animated) {
      if (index > oldIndex) {
        this.line.style[property] = `${(index - oldIndex) * size + size}px`;
        this.line.style.transition = `${property} .3s`;
        setTimeout(() => {
          this.line.style[property] = `${size}px`;
          this.line.style[direction] = `${move}px`;
          this.line.style.transition = 'all .15s';
        }, 300);
      } else {
        this.line.style[property] = `${(oldIndex - index) * size + size}px`;
        this.line.style[direction] = `${move}px`;
        this.line.style.transition = 'all .3s';
        setTimeout(() => {
          this.line.style[property] = `${size}px`;
          this.line.style.transition = `${property} .3s`;
        }, 300);
      }
    } else {
      this.line.style[property] = `${size}px`;
      this.line.style[direction] = `${move}px`;
    }
  }

  render() {
    const {
      className, prefixCls, children, lineColor, tabBarActiveTextColor, onNavItemClick,
      animated, tabBarPosition, tabBarInactiveTextColor, activeTab, initIndex, onChange, ...other
    } = this.props;

    return (
      <div className={classnames(`${prefixCls} ${prefixCls}-${tabBarPosition}`, className)} {...other}>
        <div className={`${prefixCls}-tab-bar-wrapper`}>
          <div ref={el => (this.tabBar = el)} className={`${prefixCls}-tab-bar`}>
            {this.renderTabBar()}
            <div ref={el => (this.line = el)} className={`${prefixCls}-line`} style={{ backgroundColor: lineColor }} />
          </div>
        </div>
        <div className={classnames({ [`${prefixCls}-content`]: true, [`${prefixCls}-content-animated`]: animated })} ref={el => this.tabsContent = el}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const TabPane = (props) => {
  // eslint-disable-next-line react/prop-types
  const { className, prefixCls, children, activeIndex, tabBarPosition, style = {}, index, ...other } = props;
  const sty = style;
  if (activeIndex === index) {
    sty.overflow = 'auto';
  } else {
    sty.overflow = 'hidden';
    sty.height = ['right', 'left'].includes(tabBarPosition) ? '100%' : 0;
  }
  return (
    <div
      className={classnames(`${prefixCls}-tabPane`, className)}
      style={sty}
      {...other}>
      {children}
    </div>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
