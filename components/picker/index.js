import React from 'react';
import PropTypes from 'prop-types';
import PickerColumn from './PickerColumn';
import Loading from '../loading';
import './index.less';
// 刚开始用hooks做的，有点问题，改为了class
class Picker extends React.Component {
  state = {
    value: [],
    columns: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if (value && value !== prevState.value) {
      return {
        value: value.slice()
      };
    }
    return null;
  }

  componentDidMount() {
    if (Array.isArray(this.props.data)) {
      this.setState(
        {
          columns: this.props.data
        },
        () => {
          this.formatCascade(0, this.props.defaultValue[0]);
        }
      );
    }
  }

  formatCascade = (startColumnIndex, startColumnValue) => {
    if (!this.props.cascade) {
      return;
    }
    const list = this.state.columns.slice(0, startColumnIndex + 1);
    const itemIndex = this.getIndexOfValue(
      startColumnValue,
      list[startColumnIndex]
    );
    let cursor = { children: list[startColumnIndex][itemIndex].children };
    for (let i = startColumnIndex + 1; cursor && cursor.children; i++) {
      list.push(cursor.children);
      const index = this.getIndexOfValue(this.state.value[i], cursor.children);
      cursor = { children: cursor.children[index].children };
    }
    this.setState({
      columns: list
    });
  };

  getIndexOfValue = (value, list) => {
    let index = 0;
    const findIndex = list ? list.findIndex(i => i.value === value) : 0;
    if (findIndex !== -1) {
      index = findIndex;
    }
    return index;
  };

  onColumnChange = (columnIndex, columnValue, emitChange) => {
    const list = this.state.value;
    list[columnIndex] = columnValue;
    // emitChange && props.onChange(list); //受控时，初始值有问题，第一次值没设置上
    this.props.onChange(list);
    this.onCascadeChange(columnIndex, columnValue);
    this.setState({
      value: list
    });
  };

  onCascadeChange = (index, columnValue) => {
    this.formatCascade(index, columnValue);
  };

  genColumns = () => {
    const { prefixCls, defaultValue, visibleCount } = this.props;
    const { columns, value } = this.state;
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
            this.onColumnChange(index, v, emitChange)
          }
        />
      ))
    );
  };

  render() {
    const {
      prefixCls,
      onCancel,
      cancelText,
      title,
      onConfirm,
      confirmText,
      loading,
      visibleCount
    } = this.props;
    const { value } = this.state;
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
          {this.genColumns()}
          <div className={`${prefixCls}-mask`}></div>
          <div
            className={`${prefixCls}-frame sty-hairline sty-hairline--top-bottom`}
          />
        </div>
      </div>
    );
  }
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
