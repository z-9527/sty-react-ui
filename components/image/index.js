import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';
import Icon from '../icon';
import { classnames } from '@components/_utils';
import './index.less';

function Image(props) {
  const { width, height, round, radius, fit, src, alt, lazy, prefixCls, className, style } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const boxSty = {
    width,
    height,
    borderRadius: radius || (round ? '50%' : 0),
    style
  };
  const imgSty = {
    objectFit: fit
  };

  function onLoad(event) {
    event.persist && event.persist();
    setLoading(false);
    props.onLoad(event);
  }
  function onError(event) {
    event.persist && event.persist();
    setLoading(false);
    setError(true);
    props.onError(event);
  }
  function genPlaceholder() {
    if (loading) {
      return (
        <div className={`${prefixCls}-placeholder`}>
          <Loading type='spinner' size={20} />
        </div>
      );
    }
    if (error) {
      return (
        <div className={`${prefixCls}-placeholder`}>
          <Icon type='warning-o' size={20} />
        </div>
      );
    }
  }
  const img = useRef();
  function genImage() {
    if (lazy && 'IntersectionObserver' in window) {
      return <img ref={img} data-src={src} style={imgSty} alt={alt} />;
    }
    return (
      <img
        onError={onError}
        onLoad={onLoad}
        style={imgSty}
        src={src}
        alt={alt}
      />
    );
  }
  useEffect(() => {
    const target = img.current;
    let observer = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          let image = document.createElement('img');
          image.src = target.dataset.src;
          image.onload = onLoad;
          image.onerror = onError;
          target.src = target.dataset.src;
          observer.unobserve(target);
          image = null;
        }
      });
    });
    if (lazy) {
      observer.observe(target);
    }
    return () => {
      observer = null;
    };
  }, []);
  return (
    <div className={classnames(prefixCls, className)} style={boxSty}>
      {genImage()}
      {genPlaceholder()}
    </div>
  );
}

Image.propTypes = {
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 图片宽度
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 图片高度
  round: PropTypes.bool, // 是否为圆角
  radius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 圆角大小
  fit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']), // 填充模式
  lazy: PropTypes.bool, // 图片是否懒加载
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onClick: PropTypes.func
};

Image.defaultProps = {
  prefixCls: 'sty-img',
  width: 100,
  height: 100,
  round: false,
  fit: 'fill',
  lazy: false,
  onLoad: () => { },
  onError: () => { },
  onClick: () => { }
};

export default Image;
