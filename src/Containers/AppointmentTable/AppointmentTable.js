import React, { Component } from "react";
import "./AppointmentTable.css";
import AppointmentCards from "../../Components/AppointmentCards/AppointmentCards";
import { Row } from "antd";

class AppointmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //this.props.mountApp();
  }

  render() {
    const programari = [
      { ora: "1200", cabinet: "1", dr: "red", pacient: "Alex" },
      { ora: "1300", cabinet: "2", dr: "green", pacient: "Andrei" }
    ];

    const hoursArray = [
      800,
      830,
      900,
      930,
      1000,
      1030,
      1100,
      1130,
      1200,
      1230,
      1300,
      1330,
      1400,
      1430,
      1500,
      1530,
      1600,
      1630,
      1700,
      1730,
      1800,
      1830,
      1900,
      1930
    ];

    const hourRows = hoursArray.map(hour => {
      let hourText = "";

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

      let idCab1 = `1${hour}`;
      let idCab2 = `2${hour}`;
      let idCab3 = `3${hour}`;

      let prog1 = null;
      let prog2 = null;
      let prog3 = null;
      let med1 = null;
      let med2 = null;
      let med3 = null;

      programari.map(programare => {
        if (programare.ora == hour) {
          switch (programare.cabinet) {
            case "1":
              prog1 = programare.pacient;
              med1 = programare.dr;
              break;
            case "2":
              prog2 = programare.pacient;
              med2 = programare.dr;
              break;
            case "3":
              prog3 = programare.pacient;
              med3 = programare.dr;
              break;
            default:
              prog1 = null;
              prog2 = null;
              prog3 = null;
              med1 = null;
              med2 = null;
              med3 = null;
          }
        }
      });

      return <div className="hourWrapper">{hourText}</div>;
    });

    return (
      <div style={{ backgroundColor: "black" }}>
        <div className="tableWrapper">{hourRows}</div>
      </div>
    );
  }
}

export default AppointmentTable;
