import axios from "axios";
import {
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  SELECT_EDIT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED,
  ADD_PROGRAMARE_STARTED,
  ADD_PROGRAMARE_SUCCESS,
  DELETE_PROGRAMARE_STARTED,
  DELETE_PROGRAMARE_SUCCESS,
  TOGGLE_ADD_MODAL
} from "../constants/action-types";
import moment from "moment";

export function toggleAddModal(payload) {
  return { type: TOGGLE_ADD_MODAL, payload };
}

export function selectEditDate(payload) {
  return { type: SELECT_EDIT_DATE, payload };
}

export function deleteProgramare(payload) {
  const collection = moment(payload.selectedDate).format("DDMMY");
  return dispatch => {
    dispatch({type: DELETE_PROGRAMARE_STARTED});
    const url = `http://localhost:3001/${collection}`;
    axios({
      method: "delete",
      url: url,
      data: {id: payload.id}
    }).then(dispatch({ type: DELETE_PROGRAMARE_SUCCESS}));
  };
}

export function addProgramare(payload) {
  const collection = moment(payload.selectedDate).format("DDMMY");
  return dispatch => {
    dispatch(addProgramareStarted);
    const url = `http://localhost:3001/${collection}`;
    axios({
      method: "post",
      url: url,
      data: payload
    }).then(res => {
      dispatch({ type: ADD_PROGRAMARE_SUCCESS, payload: res.data });
    });
  };
}

const addProgramareStarted = () => ({
  type: ADD_PROGRAMARE_STARTED
})

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
    dispatch({ type: FETCH_PROGRAMARI_STARTED });
    const collection = moment(payload).format("DDMMY");
    const url = `http://localhost:3001/${collection}`;
    axios.get(url).then(res => {
      dispatch({ type: FETCH_PROGRAMARI_SUCCESS, payload: res.data });
    });
  };
}
