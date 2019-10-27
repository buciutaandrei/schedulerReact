import React, { Component } from "react";
import "./App.css";
import DatePicker from "./Components/DatePicker/DatePicker.js";
import "tachyons";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppointmentTable from "./Containers/AppointmentTable/AppointmentTable";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { fetchProgramari } from "./actions/index";
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    fetchProgramari: programare => dispatch(fetchProgramari(programare))
  };
};

const mapStateToProps = state => {
  return { programari: state.programari}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsMounted: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.fetchProgramari();  
  }

  mountApp = () => {
    this.setState({ appIsMounted: true });
  };

  loadProgramari = list => {
    this.setState({ programari: list });
  };

  render() {
    const theme = createMuiTheme({
      status: {
        danger: red[100]
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="appWrapper flex flex-wrap">
          <DatePicker />
          <AppointmentTable
            mountApp={this.mountApp}
            appIsMounted={this.state.appIsMounted}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
