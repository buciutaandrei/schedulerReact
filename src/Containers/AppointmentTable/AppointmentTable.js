import React, { useEffect } from "react";
import "./AppointmentTable.css";
import { connect } from "react-redux";
import { selectProgramare, toggleAddModal } from "../../actions/index";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppointmentCards from "../../Components/AppointmentCards/AppointmentCards";
import TableBackground from "../../Components/TableBackground/TableBackground";
import HourRows from "../../Components/HourRows/HourRows";
import AddAppointment from "../../Components/AddAppointment/AddAppointment";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { fetchProgramari } from "../../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    selectProgramare: programare => dispatch(selectProgramare(programare)),
    fetchProgramari: programare => dispatch(fetchProgramari(programare)),
    toggleAddModal: toggleModal => dispatch(toggleAddModal(toggleModal))
  };
};

const mapStateToProps = state => {
  return {
    selectedDate: state.selectedDate,
    selectedProgramare: state.selectedProgramare,
    programari: state.programari,
    modalState: state.modalState
  };
};

const AppointmentTable = props => {
  useEffect(() => {
    props.fetchProgramari(props.selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    }
  };

  const emptyState = { pacient: "" };

  return (
    <React.Fragment>
      <AddAppointment />
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
      <Fab
        aria-label="add"
        style={{
          position: "absolute",
          marginTop: "91vh",
          marginLeft: "96vw",
          backgroundColor: "#357edd",
          color: "white"
        }}
        onClick={() => modalToggle(emptyState)}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentTable);
