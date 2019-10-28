import React, {Component} from "react";
import { connect } from "react-redux";
import { hoursArray } from "../../Components/DataTables/hoursArray";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./AppointmentCards.css";
import { deleteProgramare, fetchProgramari } from "../../actions/index";

const mapStateToProps = state => {
  return {
    programari: state.programari,
    selectedDate: state.selectedDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProgramare: programare => dispatch(deleteProgramare(programare)),
    fetchProgramari: programare => dispatch(fetchProgramari(programare))
  };
  };

class AppointmentCards extends Component {


  UNSAFE_componentWillMount() {
    this.props.fetchProgramari(this.props.selectedDate);
  }

  componentWillUnmount() {
    console.log("unmounting")
  }

  handleDelete = event => {
    const payload = Object.assign(
      {},
      { selectedDate: this.props.selectedDate },
      { id: event }
    );
    this.props.deleteProgramare({ ...payload });
  };

  render(){

  const { programari, modalToggle } = this.props
  
  const array = programari.map(programare => {
    let oraProgramare = "";
    programare.ora > 999
      ? (oraProgramare = programare.ora)
      : (oraProgramare = `0${programare.ora}`);
    let hourIndex = hoursArray.indexOf(Number(programare.ora)) + 1;
    let cabinetIndex = Number(programare.cabinet) + 1;
    let durata = programare.durata;
    let bgColor = `bg-${programare.medic}`;
    return (
      <div
        id={`${programare.cabinet}${oraProgramare}`}
        key={`${programare.cabinet}${oraProgramare}`}
        className={`programare pa2 tc dib black-90 shadow-4 ${bgColor}`}
        style={{
          gridColumn: cabinetIndex,
          gridRow: `${hourIndex} / span ${durata}`,
          zIndex: "20"
        }}
      >
        {programare.pacient}
        {durata > 1 ? <br /> : " "}
        {programare.medic}
        <div className="editIcon">
          <EditIcon onClick={modalToggle} />
        </div>
        <div className="deleteIcon">
          <DeleteIcon
            onClick={() =>
              this.handleDelete(`${programare.cabinet}${oraProgramare}`)
            }
          />
        </div>
      </div>
    );
  });

  return <React.Fragment>{array}</React.Fragment>;
};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentCards);
