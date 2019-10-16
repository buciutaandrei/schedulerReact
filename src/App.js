import React, { Component } from "react";
import "./App.css";
import DatePicker from "./Components/DatePicker/DatePicker.js";
import "tachyons";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppointmentTable from "./Containers/AppointmentTable/AppointmentTable";
import AppointmentCards from "./Components/AppointmentCards/AppointmentCards";

class App extends Component {
  constructor() {
    super();
    this.state = {
      appIsMounted: false,
      programari: []
    };
  }

  mountApp = () => {
    this.setState({ appIsMounted: true });
  };

  loadProgramari = list => {
    this.setState({ programari: list });
  };

  render() {
    return (
      <div className="appWrapper flex flex-wrap">
        <DatePicker />
        <AppointmentTable
          mountApp={this.mountApp}
          appIsMounted={this.state.appIsMounted}
        />
      </div>
    );
  }
}

export default App;
