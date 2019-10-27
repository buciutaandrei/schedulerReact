import React from "react";
import { connect } from "react-redux";
import { hoursArray } from "../../Components/DataTables/hoursArray";

const mapStateToProps = state => {
  return { programari: state.programari, selectedDate: state.selectedDate };
};

const AppointmentCards = props => {
  const array = props.programari.map(programare => {
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
        className={`programare pa2 tc dib grow black-90 shadow-4 ${bgColor}`}
        style={{
          gridColumn: cabinetIndex,
          gridRow: `${hourIndex} / span ${durata}`,
          zIndex: "20"
        }}
        onClick={props.modalToggle}
      >
        {programare.pacient}
        {durata > 1 ? <br /> : " "}
        {programare.medic}
      </div>
    );
  });

  return <React.Fragment>{array}</React.Fragment>;
};

export default connect(mapStateToProps)(AppointmentCards);
