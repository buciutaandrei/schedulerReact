import React, { useState } from "react";
import { connect } from "react-redux";
import "./AddAppointment.css";
import {
  addProgramare,
  handleFormChange,
  toggleAddModal,
  deleteProgramare
} from "../../actions/index";
import { hourDropdownList } from "../DataTables/hoursArray";
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
import { Dropdown } from "primereact/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import moment from "moment";
import "moment/locale/ro";

const mapDispatchToProps = dispatch => {
  return {
    addProgramare: programare => dispatch(addProgramare(programare)),
    handleFormChange: formChange => dispatch(handleFormChange(formChange)),
    toggleAddModal: toggleModal => dispatch(toggleAddModal(toggleModal)),
    deleteProgramare: programare => dispatch(deleteProgramare(programare))
  };
};

const mapStateToProps = state => {
  return {
    programari: state.programari,
    selectedProgramare: state.selectedProgramare,
    modalState: state.modalState
  };
};

const AddAppointment = props => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = event => {
    setSelectedDate(event);
  };

  const handleChange = event => {
    let target = event.target.id;
    let value = event.target.value;
    let payload = { [target]: value };
    props.handleFormChange({ ...payload });
  };

  const addProgramare = () => {
    let programare = props.selectedProgramare;
    let index = `${programare.cabinet}${moment(programare.ora, "Hmm").format(
      "HHmm"
    )}`;
    programare = Object.assign({}, programare, {
      index: index,
      selectedDate: selectedDate
    });
    props.handleFormChange({ index: index });
    props.addProgramare(programare);
    props.toggleAddModal(programare);
  };

  const programareDelete = () => {
    const { editDate, index } = props.selectedProgramare;
    const payload = {
      selectedDate: editDate,
      id: index
    };
    deleteProgramare(payload);
    addProgramare();
  };

  const submitClick = () => {
    if (props.selectedProgramare.edit) {
      programareDelete();
    } else {
      addProgramare();
    }
  };

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

  const { modalState, toggleAddModal, selectedProgramare } = props;

  return (
    <div>
      <Modal
        open={modalState}
        toggle={() => toggleAddModal(selectedProgramare)}
        size="lg"
      >
        <ModalHeader>Programare</ModalHeader>
        <ModalBody>
          <div className="addAppointmentForm">
            <Form>
              <FormInput
                id="pacient"
                placeholder="Nume"
                value={selectedProgramare.pacient}
                onChange={handleChange}
                style={{ width: "300px" }}
              />
              <Dropdown
                id="medic"
                value={selectedProgramare.medic}
                options={doctorList}
                onChange={handleChange}
                placeholder="Alege medicul"
              />
              <Dropdown
                id="ora"
                value={selectedProgramare.ora}
                options={hourDropdownList}
                onChange={handleChange}
                placeholder="Alege ora"
              />
              <Dropdown
                id="cabinet"
                value={selectedProgramare.cabinet}
                options={cabinetList}
                onChange={handleChange}
                placeholder="Alege cabinetul"
              />
              <Dropdown
                id="durata"
                value={selectedProgramare.durata}
                options={durataList}
                onChange={handleChange}
                placeholder="Alege durata"
              />
            </Form>
            <DayPicker
              localeUtils={MomentLocaleUtils}
              locale="ro"
              selectedDays={selectedDate}
              onDayClick={event => handleDateSelect(event)}
              disabledDays={{ daysOfWeek: [0, 6] }}
            />
          </div>
          <Button onClick={submitClick}>Save</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAppointment);
