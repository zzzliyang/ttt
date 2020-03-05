import React, { Component } from "react";
import { BackTop, Row, Col, Divider } from "antd";
import "../css/App.css";
import NavikHeader from "./NavikHeader";
import FormSteps from "./FormSteps";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  setLoading = loading => {
    this.setState({ loading: loading });
  };

  render() {
    const controlPanelState = {
      loading: this.state.loading,
      setLoading: this.setLoading,
      setNavikdata: this.setNavikdata,
      setMlpdata: this.setMlpdata
    };
    return (
      <div className="App">
        <BackTop />
        <NavikHeader />
        <Row>
          <FormSteps />
        </Row>
      </div>
    );
  }
}

export default App;
