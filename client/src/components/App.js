import React, { Component } from 'react';
import { BackTop, Row, Col, Divider } from 'antd';
import '../css/App.css';
import NavikHeader from './NavikHeader';
import ControlPanel from './ControlPanel';
import PivotTable from './PivotTable';

const rows = ['portfolio', 'strategy'];

const vals = ['mtd_usd'];

const aggregatorName = 'Sum';

const initialState = {
  rows: rows,
  vals: vals,
  aggregatorName: aggregatorName
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      navikdata: [],
      mlpdata: []
    };
  }

  setLoading = (loading) => {
    this.setState({ loading: loading });
  }

  setNavikdata = (data) => {
    this.setState({ navikdata: data });
  }

  setMlpdata = (data) => {
    this.setState({ mlpdata: data });
  }

  render() {
    const controlPanelState = {
      loading: this.state.loading,
      setLoading: this.setLoading,
      setNavikdata: this.setNavikdata,
      setMlpdata: this.setMlpdata,
    }
    return (
      <div className="App">
        <BackTop />
        <NavikHeader />
        <Row>
          <ControlPanel
            controlPanelState={controlPanelState}
          />
        </Row>
        <Row style={{minHeight: '800px', marginLeft:'20px'}}>
          <Col span={12} style={{overflowX: 'auto'}}>
            <Divider >MLP</Divider>
            <PivotTable
              loading={this.state.loading}
              data={this.state.navikdata}
              initialState={initialState}
            />
          </Col>
          <Col span={12} style={{overflowX: 'auto'}}>
            <Divider >NAVIK</Divider>
            <PivotTable
              loading={this.state.loading}
              data={this.state.mlpdata}
              initialState={initialState}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
