import React, { useEffect } from "react";
import "./AppointmentTable.css";
import { connect } from "react-redux";
import {
  selectProgramare,
  fetchProgramari,
  fetchEditProgramari,
  setProgramari,
  setProgramariEdit,
  selectDate
} from "../../actions/index";
import AppointmentCards from "../../Components/AppointmentCards/AppointmentCards";
import TableBackground from "../../Components/TableBackground/TableBackground";
import HourRows from "../../Components/HourRows/HourRows";
import AddAppointment from "../../Components/AddAppointment/AddAppointment";
import "shards-ui/dist/css/shards.min.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Fab } from "@material-ui/core";
import io from "socket.io-client";
import moment from "moment";

const mapDispatchToProps = dispatch => {
  return {
    selectProgramare: programare => dispatch(selectProgramare(programare)),
    fetchProgramari: programare => dispatch(fetchProgramari(programare)),
    fetchEditProgramari: programare =>
      dispatch(fetchEditProgramari(programare)),
    setProgramari: programari => dispatch(setProgramari(programari)),
    setProgramariEdit: programari => dispatch(setProgramariEdit(programari)),
    selectDate: selectedDate => dispatch(selectDate(selectedDate))
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
    const socket = io.connect("http://localhost:3001");
    socket.on("dataFetch", input => {
      props.setProgramari(input);
    });
    socket.on("refresh", input => {
      const data = moment(input, "DDMMY").format();
      const newDate = new Date(data);
      props.fetchProgramari(data);
      props.selectDate(newDate);
    });
    socket.on("dataFetchEdit", input => {
      props.setProgramariEdit(input);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <AddAppointment />
      <Fab
        className=""
        style={{
          backgroundColor: "#74adff",
          color: "white",
          position: "absolute",
          top: "1rem",
          right: "2rem",
          height: "auto",
          width: "auto"
        }}
        onClick={() => props.fetchProgramari(props.selectedDate)}
      >
        <RefreshIcon className="ma2" style={{ fontSize: "2.5rem" }} />
      </Fab>
      <div className="tableWrapper">
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: "1",
            marginTop: "1.95rem"
          }}
        >
          <TableBackground />
        </div>
        <HourRows />
        <div
          className="f4 tc"
          style={{ padding: "1.1rem", gridColumnStart: "2", gridRowStart: "1" }}
        >
          Cabinetul 1
        </div>
        <div
          className="f4 tc"
          style={{ padding: "1.1rem", gridColumnStart: "3", gridRowStart: "1" }}
        >
          Cabinetul 2
        </div>
        <div
          className="f4 tc"
          style={{ padding: "1.1rem", gridColumnStart: "4", gridRowStart: "1" }}
        >
          Cabinetul 3
        </div>
        <AppointmentCards />
      </div>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentTable);
