import React, { Component } from "react";
import "../css/NavikHeader.css";

class NavikHeader extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          <span className="AppTitle">PnL Viewer</span>
          <div className="NavikTitle">
            <span className="NavikTitleNavik">NAVIK</span>
            <span className="NavikTitleCapital">CAPITAL</span>
          </div>
        </header>
      </div>
    );
  }
}

export default NavikHeader;
