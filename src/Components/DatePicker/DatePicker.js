import React from "react";
import "./DatePicker.css";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/ro";
import { connect } from "react-redux";
import { selectDate } from "../../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    selectDate: selectedDate => dispatch(selectDate(selectedDate))
  };
};

const mapStateToProps = state => {
  return {
    selectedDate: state.selectedDate
  };
};

const DatePicker = props => {
  const handleDateSelect = event => {
    const selectedDate = event;
    props.selectDate({ selectedDate });
  };


  return (
    <div className="datePickerWrapper">
      <DayPicker
        localeUtils={MomentLocaleUtils}
        locale="ro"
        selectedDays={props.selectedDate}
        onDayClick={event => handleDateSelect(event)}
        disabledDays={{ daysOfWeek: [0, 6] }}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);
