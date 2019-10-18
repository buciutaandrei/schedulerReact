import React from "react";
import { programari } from "../../Components/DataTables/programari";
import { hoursArray } from "../../Components/DataTables/hoursArray";
import { Card } from "@material-ui/core/Card/Card";

const AppointmentCards = () => {
  const array = programari.map(programare => {
    let hourIndex = hoursArray.indexOf(Number(programare.ora)) + 1;
    let cabinetIndex = Number(programare.cabinet) + 1;
    let durata = programare.durata;
    return (
      <div
        id={`${programare.cabinet}${programare.ora}`}
        key={`${programare.cabinet}${programare.ora}`}
        cabinet={`${programare.cabinet}`}
        ora={`${programare.ora}`}
        className="programare"
        style={{
          gridColumn: cabinetIndex,
          gridRow: `${hourIndex} / span ${durata}`,
          zIndex: "20"
        }}
      >
        {programare.pacient}
        <br />
        {programare.dr}
      </div>
    );
  });

  return <React.Fragment>{array}</React.Fragment>;
};

export default AppointmentCards;
