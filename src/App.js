import React from "react";
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
import { connect } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return { adding: state.adding, loading: state.loading, deleting: state.deleting};
};

const App = props => {

      const { loading, adding, deleting } = props;
      let loadingState = loading || adding || deleting;

  
    return (
      <React.Fragment>
        <LoadingOverlay active={loadingState} spinner>
        <CssBaseline />
        <div className="appWrapper flex flex-wrap">
          <DatePicker />
          <AppointmentTable />
        </div>
        </LoadingOverlay>
      </React.Fragment>
    )
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
