import React from "react";
import "./App.css";
import DatePicker from "./Components/DatePicker/DatePicker.js";
import "tachyons";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppointmentTable from "./Containers/AppointmentTable/AppointmentTable";
import { CssBaseline, Button } from "@material-ui/core";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { toggleAddModal, setUser, loggingOut } from "./actions/index";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import LoginPage from "./Components/LoginPage/LoginPage";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Components/LoginPage/setAuthToken";

const mapDispatchToProps = dispatch => {
  return {
    toggleAddModal: toggleModal => dispatch(toggleAddModal(toggleModal)),
    setUser: token => dispatch(setUser(token)),
    loggingOut: logOut => dispatch(loggingOut(logOut))
  };
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    modalState: state.modalState,
    selectedDate: state.selectedDate,
    selectedProgramare: state.selectedProgramare,
    programari: state.programari
  };
};

const App = props => {
  const emptyState = { pacient: "" };

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

  const modalToggle = event => {
    props.toggleAddModal(event);
    if (
      event !== undefined &&
      props.modalToggled === false &&
      props.programari.length > 0
    ) {
      let indexProgramare = props.programari
        .map(props => props.index)
        .indexOf(event.target.id);
      let programare = props.programari[indexProgramare];
      props.selectProgramare({ ...programare });
      props.fetchEditProgramari(props.selectedDate);
    }
  };

  if (props.loggedIn) {
    return (
      <React.Fragment>
        <LoadingOverlay active={false} spinner>
          <CssBaseline />
          <Button
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "22vw",
              height: "2rem",
              color: "#fafafa",
              letterSpacing: "2px"
            }}
            onClick={props.loggingOut}
          >
            Log out
          </Button>
          <Fab
            aria-label="add"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20vw",
              backgroundColor: "#74adff",
              color: "white",
              width: "4vw",
              height: "4vw"
            }}
            onClick={() => modalToggle(emptyState)}
          >
            <AddIcon />
          </Fab>
          <div
            style={{
              position: "absolute",
              backgroundColor: "#357edd",
              top: "0",
              left: "0",
              bottom: "0",
              width: "22vw",
              zIndex: "-10"
            }}
            className="shadow-5"
          ></div>
          <div className="appWrapper flex flex-wrap">
            <div
              style={{ backgroundColor: "#fafafa", borderRadius: "10%" }}
              className="ml4 pa3 shadow-3"
            >
              <DatePicker />
            </div>
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
