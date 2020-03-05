import React, { Component } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Row,
  message,
  Radio,
  notification,
  Popover
} from "antd";
import moment from "moment";
import { API_DATE_FORMAT } from "../constants";
import "../css/ControlPanel.css";
import { fetchNavikPnl, fetchMlpPnl, fetchAllPnlDate } from "../utils/ApiUtils";

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: [],
      selectedDate: null
    };
  }

  componentDidMount() {
    const me = this;
    this.props.controlPanelState.setLoading(true);
    fetchAllPnlDate()
      .then(response => {
        if (response) {
          me.setState({ availableDates: response });
        }
        me.props.controlPanelState.setLoading(false);
      })
      .catch(function(error) {
        me.props.controlPanelState.setLoading(false);
      });
  }

  onChange = (date, dateString) => {
    this.setState({ selectedDate: date });
  };

  onReloadClick = () => {
    const me = this;
    //1: historical; 2: latest
    const date = this.state.selectedDate;
    if (!date) {
      message.error("Please pick a snap date to reload from!");
      return;
    }
    this.props.controlPanelState.setLoading(true);
    fetchNavikPnl(date)
      .then(response => {
        if (response) {
          me.props.controlPanelState.setNavikdata(response);
        }
        fetchMlpPnl(date)
          .then(response => {
            if (response) {
              me.props.controlPanelState.setMlpdata(response);
            }
            me.props.controlPanelState.setLoading(false);
          })
          .catch(function(error) {
            me.props.controlPanelState.setLoading(false);
          });
      })
      .catch(function(error) {
        me.props.controlPanelState.setLoading(false);
      });
  };

  disabledDate = currentDate => {
    for (let availableDate of this.state.availableDates) {
      if (moment(availableDate, API_DATE_FORMAT).isSame(currentDate, "day")) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div className="ControlPanel">
        <Row>
          <DatePicker
            className="ReportDatePicker"
            placeholder={"Report Date"}
            onChange={this.onChange}
            disabledDate={this.disabledDate}
            disabled={this.props.controlPanelState.loading}
          />
          <Popover
            placement="bottom"
            content={<p>Reload PnL data from database.</p>}
          >
            <Button
              className="ReloadButton"
              type="primary"
              onClick={this.onReloadClick}
              loading={this.props.controlPanelState.loading}
            >
              Load
            </Button>
          </Popover>
        </Row>
        <Row>
          <Divider>
            {this.props.controlPanelState.loading ? "Loading..." : ""}
          </Divider>
        </Row>
      </div>
    );
  }
}

export default ControlPanel;
