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
    cascade,
    onCancel,
    onConfirm
  } = props;

  const [value, setValue] = useState([]);
  const [columns, setColumns] = useState(() => data);

  useEffect(() => {
    Array.isArray(props.value) && setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    Array.isArray(data) && setColumns(data);
    formatCascade(0, defaultValue[0]);
  }, [data]);

  function formatCascade(startColumnIndex, startColumnValue) {
    if (!cascade) {
      return;
    }
    const list = columns.slice(0, startColumnIndex + 1);
    const itemIndex = getIndexOfValue(startColumnValue, list[startColumnIndex]);
    let cursor = { children: list[startColumnIndex][itemIndex].children };
    for (let i = startColumnIndex + 1; cursor && cursor.children; i++) {
      list.push(cursor.children);
      const index = getIndexOfValue(value[i], cursor.children);
      cursor = { children: cursor.children[index].children };
    }
    setColumns(list);
  }

  function getIndexOfValue(value, list) {
    let index = 0;
    const findIndex = list ? list.findIndex(i => i.value === value) : 0;
    if (findIndex !== -1) {
      index = findIndex;
    }
    return index;
  }

  function onColumnChange(columnIndex, columnValue, emitChange) {
    setValue(preList => {
      const list = preList.slice();
      list[columnIndex] = columnValue;
      // emitChange && props.onChange(list); //受控时，初始值有问题，第一次值没设置上
      props.onChange(list);
      onCascadeChange(columnIndex, columnValue);
      return list;
    });
  }

  function onCascadeChange(index, columnValue) {
    formatCascade(index, columnValue);
  }

  function genColumns() {
    return (
      Array.isArray(columns) &&
      columns.map((item, index) => (
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
  cascade: PropTypes.bool,
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
  cascade: false,
  onChange: () => {},
  onCancel: () => {},
  onConfirm: () => {}
};

export default Picker;
