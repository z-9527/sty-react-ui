import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PickerColumn from './PickerColumn';
import Loading from '../loading';
import './index.less';

function Picker(props) {
  const {
    prefixCls,
    title,
    confirmText,
    cancelText,
    data,
    visibleCount,
    loading,
    defaultValue,
    onCancel,
    onConfirm
  } = props;

  const [value, setValue] = useState([]);

  useEffect(() => {
    Array.isArray(props.value) && setValue(props.value);
  }, [props.value]);

  function onColumnChange(index, columnValue, emitChange) {
    setValue(preList => {
      const list = preList.slice();
      list[index] = columnValue;
      emitChange && props.onChange(list);
      if (Array.isArray(props.value)) {
        return preList; // 由外部的stat控制
      }
      return list;
    });
  }

  function genColumns() {
    return (
      Array.isArray(data) &&
      data.map((item, index) => (
        <PickerColumn
          key={index}
          prefixCls={prefixCls}
          defaultValue={defaultValue[index]}
          list={item}
          visibleCount={visibleCount}
          columnValue={value[index]}
          onColumnChange={(v, emitChange) =>
            onColumnChange(index, v, emitChange)
          }
        />
      ))
    );
  }
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-toolbar`}>
        <button className={`${prefixCls}-toolbar-cancel`} onClick={onCancel}>
          {cancelText}
        </button>
        <div className={`${prefixCls}-toolbar-title ellipsis`}>{title}</div>
        <button
          className={`${prefixCls}-toolbar-confirm`}
          onClick={() => onConfirm(value)}
        >
          {confirmText}
        </button>
      </div>
      {loading && (
        <div className={`${prefixCls}-loading`}>
          <Loading />
        </div>
      )}
      <div
        className={`${prefixCls}-columns`}
        style={{ height: visibleCount * 44 }}
      >
        {genColumns()}
        <div className={`${prefixCls}-mask`}></div>
        <div
          className={`${prefixCls}-frame sty-hairline sty-hairline--top-bottom`}
        />
      </div>
    </div>
  );
}

Picker.propTypes = {
  prefixCls: PropTypes.string,
  title: PropTypes.any,
  confirmText: PropTypes.any,
  cancelText: PropTypes.any,
  data: PropTypes.arrayOf(PropTypes.array),
  visibleCount: PropTypes.number, // 可见选项个数，主要是计算高度
  loading: PropTypes.bool,
  value: PropTypes.array, // 受控值
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

Picker.defaultProps = {
  prefixCls: 'sty-picker',
  confirmText: '确认',
  cancelText: '取消',
  data: [],
  visibleCount: 5,
  loading: false,
  defaultValue: [],
  onChange: () => {},
  onCancel: () => {},
  onConfirm: () => {}
};

export default Picker;
