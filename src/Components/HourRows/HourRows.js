import React from "react";
import { hoursArray } from "../DataTables/hoursArray";
import "./HourRows.css";

const hourRows = () => {
  const array = hoursArray.map(hour => {
    let hourText = "";
    if (hour === 0) {
      hourText = null;
    } else {
      if (hour > 999) {
        if (hour % 100 === 0) {
          hourText = `${Math.floor(hour / 100)}:00`;
        } else {
          hourText = `${Math.floor(hour / 100)}:30`;
        }
      } else {
        if (hour % 100 === 0) {
          hourText = `0${Math.floor(hour / 100)}:00`;
        } else {
          hourText = `0${Math.floor(hour / 100)}:30`;
        }
      }
    }

    return (
      <React.Fragment>
        <div
          key={hourText}
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          className="hourWrapper overflow-hidden tc"
        >
          <p
            style={{
              padding: "0px",
              margin: "0px",
              display: "table-cell",
              verticalAlign: "middle"
            }}
          >
            {hourText}
          </p>
        </div>
      </React.Fragment>
    );
  });

  return <React.Fragment>{array}</React.Fragment>;
};

export default hourRows;
