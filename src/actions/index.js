import axios from "axios";
import {
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED,
  ADD_PROGRAMARE_STARTED,
  ADD_PROGRAMARE_SUCCESS
} from "../constants/action-types";
import moment from "moment";

export function addProgramare(payload) {
  const collection = moment(payload.selectedDate).format("DDMMY");
  console.log("asdf");
  console.log(payload);
  return dispatch => {
    dispatch(addProgramareStarted);

    const url = `http://localhost:3001/${collection}`;
    const {
      pacient,
      medic,
      ora,
      durata,
      cabinet,
      index,
      selectedDate
    } = payload;
    axios({
      method: "post",
      url: url,
      data: {
        pacient: pacient,
        medic: medic,
        ora: ora,
        durata: durata,
        cabinet: cabinet,
        index: index,
        date: selectedDate
      }
    }).then(res => {
      dispatch(addProgramareSuccess(res.data));
    });
  };
}

const addProgramareStarted = () => ({
  type: ADD_PROGRAMARE_STARTED,
  payload: {
    added: false
  }
});

const addProgramareSuccess = () => ({
  type: ADD_PROGRAMARE_SUCCESS,
  payload: {
    added: true
  }
});

export function selectProgramare(payload) {
  return { type: SELECT_PROGRAMARE, payload };
}

export function handleFormChange(payload) {
  return { type: HANDLE_FORM_CHANGE, payload };
}

export function selectDate(payload) {
  return { type: SELECT_DATE, payload };
}

export function fetchProgramari(payload) {
  return dispatch => {
    dispatch(fetchProgramariStarted);
    const collection = moment(payload.selectedDate).format("DDMMY");
    const url = `http://localhost:3001/${collection}`;
    axios.get(url).then(res => {
      dispatch(fetchProgramariSuccess(res.data));
    });
  };
}

const fetchProgramariSuccess = data => ({
  type: FETCH_PROGRAMARI_SUCCESS,
  payload: {
    programari: [...data]
  }
});

const fetchProgramariStarted = () => ({
  type: FETCH_PROGRAMARI_STARTED
});
