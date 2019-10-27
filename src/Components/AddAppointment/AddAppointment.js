import React, { Component } from "react";
import { connect } from "react-redux";
import { addProgramare } from "../../actions/index";
import { handleFormChange } from "../../actions/index";
import { hourDropdownList } from "../DataTables/hoursArray";
import "./AddAppointment.css";
import {
  Form,
  FormInput,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/ro";
import { Dropdown } from "primereact/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import moment from "moment";

const mapDispatchToProps = dispatch => {
  return {
    addProgramare: programare => dispatch(addProgramare(programare)),
    handleFormChange: formChange => dispatch(handleFormChange(formChange))
  };
};

const mapStateToProps = state => {
  return {
    programari: state.programari,
    selectedProgramare: state.selectedProgramare
  };
};

class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  handleDateSelect = event => {
    this.setState({ selectedDate: event });
  };

  handleChange = event => {
    let target = event.target.id;
    let value = event.target.value;
    let payload = { [target]: value };
    this.props.handleFormChange({ ...payload });
  };

  submitClick = () => {
    let programare = this.props.selectedProgramare;
    let index = `${programare.cabinet}${moment(programare.ora, "Hmm").format(
      "HHmm"
    )}`;
    let selectedDate = this.state.selectedDate;
    programare = Object.assign({}, programare, {
      index: index,
      selectedDate: selectedDate
    });
    this.props.handleFormChange({ index: index });
    this.props.modalToggle();
    this.props.addProgramare({ ...programare });
  };

  render() {
    const doctorList = [
      { label: "Dr. A", value: "red" },
      { label: "Dr. B", value: "green" },
      { label: "Dr. C", value: "blue" }
    ];
    const cabinetList = [
      { label: "Cabinet 1", value: "1" },
      { label: "Cabinet 2", value: "2" },
      { label: "Cabinet 3", value: "3" }
    ];
    const durataList = [
      { label: "30 min", value: "1" },
      { label: "1 ora", value: "2" },
      { label: "1 ora si 30 min", value: "3" },
      { label: "2 ore", value: "4" }
    ];

    const { modalToggle, modalToggled, selectedProgramare } = this.props;

    return (
      <div>
        <Modal open={modalToggled} toggle={modalToggle} size="lg">
          <ModalHeader>Programare</ModalHeader>
          <ModalBody>
            <div className="addAppointmentForm">
              <Form>
                <FormInput
                  id="pacient"
                  placeholder="Nume"
                  value={selectedProgramare.pacient}
                  onChange={this.handleChange}
                  style={{ width: "300px" }}
                />
                <Dropdown
                  id="medic"
                  value={selectedProgramare.medic}
                  options={doctorList}
                  onChange={this.handleChange}
                  placeholder="Alege medicul"
                />
                <Dropdown
                  id="ora"
                  value={selectedProgramare.ora}
                  options={hourDropdownList}
                  onChange={this.handleChange}
                  placeholder="Alege ora"
                />
                <Dropdown
                  id="cabinet"
                  value={selectedProgramare.cabinet}
                  options={cabinetList}
                  onChange={this.handleChange}
                  placeholder="Alege cabinetul"
                />
                <Dropdown
                  id="durata"
                  value={selectedProgramare.durata}
                  options={durataList}
                  onChange={this.handleChange}
                  placeholder="Alege durata"
                />
              </Form>
              <DayPicker
                localeUtils={MomentLocaleUtils}
                locale="ro"
                selectedDays={this.state.selectedDate}
                onDayClick={event => this.handleDateSelect(event)}
                disabledDays={{ daysOfWeek: [0, 6] }}
              />
            </div>
            <Button onClick={this.submitClick}>Save</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAppointment);
