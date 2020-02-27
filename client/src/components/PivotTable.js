import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import moment from 'moment';
import { Spin } from 'antd';
import { API_DATE_FORMAT } from '../constants';

class PivotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState;
  }
  render() {
    const loading = this.props.loading;
    const state = {...this.state};
    state['data'] = this.props.data;
    return (
      <Spin spinning={ this.props.loading }>
        <PivotTableUI
            onChange={s => {
              console.log("State passed on PivotTable onChange:");
              console.log(s);
              this.setState(s);
            }}
            {...state}
        />
      </Spin>
    );
  }
}

export default PivotTable;
