import React from "react";
import { connect } from "react-redux";
import { hoursArray } from "../../Components/DataTables/hoursArray";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./AppointmentCards.css";
import {
  deleteProgramare,
  fetchProgramari,
  toggleAddModal
} from "../../actions/index";

const mapStateToProps = state => {
  return {
    programari: state.programari,
    selectedDate: state.selectedDate,
    adding: state.adding,
    deleting: state.deleting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProgramare: programare => dispatch(deleteProgramare(programare)),
    fetchProgramari: programari => dispatch(fetchProgramari(programari)),
    toggleAddModal: toggleModal => dispatch(toggleAddModal(toggleModal))
  };
};

const AppointmentCards = props => {
  const { programari, selectedDate, deleteProgramare } = props;

  const handleEdit = event => {
    props.toggleAddModal(
      Object.assign({}, event, { edit: true, editDate: event.selectedDate })
    );
  };

  const handleDelete = event => {
    const payload = Object.assign(
      {},
      { selectedDate: selectedDate },
      { id: event }
    );
    deleteProgramare(payload);
    setTimeout(() => props.fetchProgramari(selectedDate), 100);
  };

  const doctorName = data => {
    switch (data) {
      case 'red': {
        return 'dr. A'
      }
      case 'green': {
        return 'dr. B'
      }
      case 'blue': {
        return 'dr. C'
      }
      default:
        return 'no medic'
    }

  }

  const array = programari.map(programare => {
    let hourIndex = hoursArray.indexOf(Number(programare.ora)) + 1;
    let cabinetIndex = Number(programare.cabinet) + 1;
    let durata = programare.durata;
    let bgColor = `bg-${programare.medic}`;
    const medic = doctorName(programare.medic)
    return (
      <div
        id={`${programare.index}`}
        key={`${programare.index}`}
        className={`programare pa2 tc dib black-90 shadow-4 ${bgColor}`}
        style={{
          gridColumn: cabinetIndex,
          gridRow: `${hourIndex} / span ${durata}`,
          zIndex: "20"
        }}
      >
        {programare.pacient}
        {durata > 1 ? <br /> : " "}
        {medic}
        <div className="editIcon">
          <EditIcon onClick={() => handleEdit(programare)} />
        </div>
        <div className="deleteIcon">
          <DeleteIcon onClick={() => handleDelete(`${programare.index}`)} />
        </div>
      </div>
    );
  });

  return <React.Fragment>{array}</React.Fragment>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentCards);
