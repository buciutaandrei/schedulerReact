import React, { Component } from "react";
import "./AppointmentTable.css";
import { connect } from "react-redux";
import { selectProgramare } from "../../actions/index";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppointmentCards from "../../Components/AppointmentCards/AppointmentCards";
import TableBackground from "../../Components/TableBackground/TableBackground";
import HourRows from "../../Components/HourRows/HourRows";
import AddAppointment from "../../Components/AddAppointment/AddAppointment";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const mapDispatchToProps = dispatch => {
  return {
    selectProgramare: programare => dispatch(selectProgramare(programare))
  };
};

const mapStateToProps = state => {
  return {
    selectedProgramare: state.selectedProgramare,
    programari: state.programari
  };
};

class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToggled: false,
      idProgramare: "",
      pacient: ""
    };
  }

  handleChange = event => {
    let target = event.target.id;
    let value = event.target.value;
    this.setState({ [target]: value });
  };

  modalToggle = event => {
    this.setState({ modalToggled: !this.state.modalToggled });
    if (
      event !== undefined &&
      this.state.modalToggled === false &&
      this.props.programari.length > 0
    ) {
      let indexProgramare = this.props.programari
        .map(props => props.index)
        .indexOf(event.target.id);
      let programare = this.props.programari[indexProgramare];
      this.props.selectProgramare({ ...programare });
    }
  };

  render() {
    return (
      <React.Fragment>
        <AddAppointment
          modalToggle={this.modalToggle}
          modalToggled={this.state.modalToggled}
          idProgramare={this.state.idProgramare}
          pacient={this.state.pacient}
          handleChange={this.handleChange}
        />
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
          <div
            className="tc"
            style={{ gridColumnStart: "2", gridRowStart: "1" }}
          >
            Cabinetul 1
          </div>
          <div
            className="tc"
            style={{ gridColumnStart: "3", gridRowStart: "1" }}
          >
            Cabinetul 2
          </div>
          <div
            className="tc"
            style={{ gridColumnStart: "4", gridRowStart: "1" }}
          >
            Cabinetul 3
          </div>
          <AppointmentCards modalToggle={this.modalToggle} />
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
          onClick={this.modalToggle}
        >
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentTable);
