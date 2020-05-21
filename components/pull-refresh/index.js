import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';
import { classnames } from '@components/_utils';
import './index.less';

const TEXT_STATUS = ['pulling', 'loosing', 'success'];

function PullRefresh(props) {
  const [duration, setDuration] = useState(300);
  const [distance, setDistance] = useState(0);
  const [status, setStatus] = useState('normal');
  const box = useRef();
  const {
    prefixCls,
    headHeight,
    onRefresh,
    isLoading,
    successText,
    loadingText,
    successDuration,
    style,
    className
  } = props;
  const touch = useRef(null); // 普通变量会在每次函数调用时初始化，所以这里使用了useRef
  const touchable = status !== 'loading' && status !== 'success';

  useEffect(() => {
    if (isLoading) {
      changeStatus(headHeight);
    } else if (successText) {
      showSuccessTip();
    } else {
      changeStatus(0);
    }
  }, [isLoading]);

  function onTouchStart(event) {
    if (!touchable) {
      return;
    }
    event.persist && event.persist();
    const touches = event.touches[0];
    touch.current = {
      startX: touches.clientX,
      startY: touches.clientY,
      ceiling: box.current.scrollTop === 0
    };
    setDuration(0);
  }
  function onTouchMove(event) {
    event.persist && event.persist();
    const touchCur = touch.current;
    if (!touchCur || !touchable) {
      return;
    }
    const touches = event.touches[0];
    const offsetX = touches.clientX - touchCur.startX;
    const offsetY = touches.clientY - touchCur.startY;
    const isVertical = Math.abs(offsetY) > Math.abs(offsetX);
    if (touchCur.ceiling && isVertical && offsetY >= 0) {
      touch.current.offsetY = offsetY;
      changeStatus(ease(offsetY));
    }
  }
  function onTouchEnd(event) {
    event.persist && event.persist();
    const touchCur = touch.current;
    if (
      touchable &&
      touchCur.offsetY &&
      touchCur.ceiling &&
      status === 'loosing'
    ) {
      onRefresh();
    } else {
      setDistance(0);
    }
    touch.current = null;
    setDuration(300);
  }
  function ease(d) {
    if (d > headHeight) {
      if (d < headHeight * 2) {
        d = headHeight + (d - headHeight) / 2;
      } else {
        d = headHeight * 1.5 + (d - headHeight * 2) / 4;
      }
    }
    return Math.round(d);
  }
  function changeStatus(d) {
    let newStatus;
    if (isLoading) {
      newStatus = 'loading';
    } else if (d === 0) {
      newStatus = 'normal';
    } else {
      newStatus = d < headHeight ? 'pulling' : 'loosing';
    }
    setDistance(d);
    setStatus(newStatus);
  }

  function genStatus() {
    if (status === 'loading') {
      if (typeof loadingText === 'string') {
        return <Loading size={16}>{loadingText}</Loading>;
      }
      return loadingText;
    }
    if (TEXT_STATUS.indexOf(status) !== -1) {
      return <div>{props[`${status}Text`]}</div>;
    }
  }
  function showSuccessTip() {
    setStatus('success');

    setTimeout(() => {
      changeStatus(0);
    }, successDuration);
  }

  return (
    <div className={classnames(prefixCls, className)} ref={box} style={style}>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transitionDuration: `${duration}ms`,
          transform: `translate3d(0,${distance}px, 0)`,
          height: '100%'
        }}
      >
        <div className={`${prefixCls}-header`}>{genStatus()}</div>
        {props.children}
      </div>
    </div>
  );
}

PullRefresh.propTypes = {
  prefixCls: PropTypes.string,
  headHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pullingText: PropTypes.any,
  loosingText: PropTypes.any,
  loadingText: PropTypes.any,
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  successDuration: PropTypes.number
};

PullRefresh.defaultProps = {
  prefixCls: 'sty-refresh',
  headHeight: 50,
  pullingText: '下拉即可刷新...',
  loosingText: '释放即可刷新...',
  loadingText: '加载中...',
  isLoading: false,
  onRefresh: () => {},
  successDuration: 500
};
export default PullRefresh;
