import React, { Component } from "react";
import "./DatePicker.css";
import { Calendar } from "primereact/calendar";
import { ro } from "./ro_RO.js";

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: ""
    };
  }

  render() {
    return (
      <div>
        <Calendar
          className="pa4"
          locale={ro}
          showButtonBar={true}
          disabledDays={[0, 6]}
          readOnlyInput={true}
          dateFormat="dd/mm/yy"
          inline={true}
          value={this.state.selectedDate}
          onChange={e => this.setState({ selectedDate: e.value })}
        />
      </div>
    );
  }
}

export default DatePicker;
