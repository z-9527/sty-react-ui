import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_DURATION = 300;

function PickerColumn(props) {
  const { prefixCls, list, visibleCount, defaultValue, columnValue } = props;

  const [translateY, setTranslateY] = useState(0);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const touch = useRef(null);
  const baseOffset = (44 * (visibleCount - 1)) / 2;
  const sty = {
    transform: `translate3d(0,${translateY + baseOffset}px,0)`, // 通过3d变换开启浏览器的硬件加速
    transitionDuration: `${duration}ms`
  };
  const arr = Array.isArray(list) ? list : [];

  useEffect(() => {
    const index = getIndex(defaultValue);
    setIndex(index);
  }, []);

  useEffect(() => {
    if (columnValue) {
      const index = getIndex(columnValue);
      setIndex(index);
    }
  }, [columnValue]);

  function onTouchStart(event) {
    event.persist();
    const { touches } = event;
    touch.current = {
      startX: touches[0].clientX,
      startY: touches[0].clientY,
      translateY
    };
    setDuration(0);
  }

  function onTouchMove(event) {
    event.persist();
    const toucheCur = touch.current;
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
    offset = Math.min(44, Math.max(offset, -44 * arr.length)); // 限制偏移区间 [-44*arr.length, 44]
    if (Math.abs(offset) > 10) {
      touch.current.moving = true;
    }
    setTranslateY(offset);
  }

  function onTouchEnd() {
    setDuration(DEFAULT_DURATION);
    // 防止点击事件触发onTouchEnd
    if (!touch.current.moving) {
      return;
    }
    const index = getIndexByOffset(translateY);
    setIndex(index, true);
  }

  function getIndex(value) {
    let index = 0;
    const findIndex = arr.findIndex(i => i.value === value);
    if (findIndex !== -1) {
      index = findIndex;
    }
    return index;
  }

  function setIndex(i, emitChange) {
    const index = adjustIndex(i);
    const offset = -44 * index;
    setTranslateY(offset);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      props.onColumnChange(arr[index].value, emitChange);
    }
  }

  function getIndexByOffset(offset) {
    return Math.min(arr.length - 1, Math.max(0, Math.round(-offset / 44))); // 索引区间 [0,length-1]
  }

  // 主要是解决disabled选项
  function adjustIndex(index) {
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
  }

  function onItemClick(index) {
    // 防止touch事件触发click
    if (touch.current && touch.current.moving) {
      return;
    }
    setIndex(index, true);
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`${prefixCls}-column`}
    >
      <ul style={sty}>
        {arr.map((item, index) => (
          <li
            onClick={() => onItemClick(index)}
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
export default PickerColumn;
