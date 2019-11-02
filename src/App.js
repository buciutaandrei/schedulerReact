import React, { useEffect } from "react";
import "./App.css";
import "tachyons";
import AppointmentTable from "./Containers/AppointmentTable/AppointmentTable";
import { CssBaseline } from "@material-ui/core";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import {
  toggleAddModal,
  setUser,
  loggingOut,
  fetchProgramari
} from "./actions/index";
import LoginPage from "./Containers/LoginPage/LoginPage";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Containers/LoginPage/setAuthToken";
import LeftPanel from "./Containers/LeftPanel/LeftPanel";

const mapDispatchToProps = dispatch => {
  return {
    toggleAddModal: toggleModal => dispatch(toggleAddModal(toggleModal)),
    setUser: token => dispatch(setUser(token)),
    loggingOut: logOut => dispatch(loggingOut(logOut)),
    fetchProgramari: programari => dispatch(fetchProgramari(programari))
  };
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    selectedDate: state.selectedDate,
    loading: state.loading
  };
};

const App = props => {
  useEffect(() => {
    props.fetchProgramari(props.selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    props.setUser(decoded);
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      props.loggingOut(); // Redirect to login
    }
  }

  if (props.loggedIn) {
    return (
      <React.Fragment>
        <CssBaseline />
        <LoadingOverlay active={props.loading} spinner>
          <div className="appWrapper flex flex-wrap">
            <LeftPanel />
            <AppointmentTable />
          </div>
        </LoadingOverlay>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <LoadingOverlay active={false} spinner>
          <CssBaseline />
          <LoginPage />
        </LoadingOverlay>
      </React.Fragment>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
