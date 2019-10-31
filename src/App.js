import React from "react";
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
import {
  toggleAddModal
} from "./actions/index";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const mapDispatchToProps = dispatch => {
  return {    toggleAddModal: toggleModal => dispatch(toggleAddModal(toggleModal))};
};

const mapStateToProps = state => {
  return {
    modalState: state.modalState,
    selectedDate: state.selectedDate,
    selectedProgramare: state.selectedProgramare,
    programari: state.programari,
  };
};


const App = props => {

  const emptyState = { pacient: "" };

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
  

  return (
    <React.Fragment>
      <LoadingOverlay active={false} spinner>
        <CssBaseline />
        <Fab
          aria-label="add"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20vw",
            backgroundColor: "#74adff",
            color: "white",
            width:'4vw',
            height: '4vw',
            
          }}
          onClick={() => modalToggle(emptyState)}
        >
          <AddIcon />
        </Fab>
        <div style={{ position: 'absolute', backgroundColor: '#357edd', top: '0', left: '0', bottom: '0', width:'22vw', zIndex: '-10'}} className='shadow-5'></div>
        <div className="appWrapper flex flex-wrap">
          <div style={{ backgroundColor: '#fafafa', borderRadius: '10%'}} className='ml4 pa3 shadow-3'>
          <DatePicker />
          </div>
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
