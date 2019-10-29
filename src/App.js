import React, { useEffect } from "react";
import "./App.css";
import DatePicker from "./Components/DatePicker/DatePicker.js";
import "tachyons";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppointmentTable from "./Containers/AppointmentTable/AppointmentTable";
import { CssBaseline } from "@material-ui/core";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

const App = props => {
  useEffect(() => {
    console.log("asdasd");
  }, []);

  return (
    <React.Fragment>
      <LoadingOverlay active={props.loading} spinner>
        <CssBaseline />
        <div className="appWrapper flex flex-wrap">
          <DatePicker />
          <AppointmentTable />
        </div>
      </LoadingOverlay>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
