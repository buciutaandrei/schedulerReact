import React, { Component } from "react";
import "./AppointmentTable.css";
import { withTheme } from "@material-ui/styles";
import AppointmentCards from "../../Components/AppointmentCards/AppointmentCards";
import TableBackground from "../../Components/TableBackground/TableBackground";
import HourRows from "../../Components/HourRows/HourRows";

class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //this.props.mountApp();
  }

  render() {
    return (
      <div className="tableWrapper">
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: "-10"
          }}
        >
          <TableBackground />
        </div>
        <HourRows />
        <div className="tc" style={{ gridColumnStart: "2", gridRowStart: "1" }}>
          Cabinetul 1
        </div>
        <div className="tc" style={{ gridColumnStart: "3", gridRowStart: "1" }}>
          Cabinetul 2
        </div>
        <div className="tc" style={{ gridColumnStart: "4", gridRowStart: "1" }}>
          Cabinetul 3
        </div>
        <AppointmentCards />
      </div>
    );
  }
}

export default withTheme(AppointmentTable);
